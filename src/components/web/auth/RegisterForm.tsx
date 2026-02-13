"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z
      .string()
      .min(1, "El correo es obligatorio")
      .email("Correo no válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    passwordConfirm: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setError(null);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: "student",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(
          json.message ?? json.errors?.[0]?.message ?? "Error en el registro",
        );
        return;
      }

      // Auto-login
      const loginRes = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (loginRes.ok) {
        router.push("/curso");
        router.refresh();
      } else {
        router.push("/login");
        router.refresh();
      }
    } catch {
      setError("Algo ha fallado");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-semibold leading-tight text-foreground">
          Crear cuenta
        </h1>
        <p className="text-muted-foreground text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="underline underline-offset-2 hover:text-brand"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>

      {error && (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            className="h-11 rounded-lg"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="h-11 rounded-lg"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            className="h-11 rounded-lg"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-destructive text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="passwordConfirm">Confirmar contraseña</Label>
          <Input
            id="passwordConfirm"
            type="password"
            autoComplete="new-password"
            className="h-11 rounded-lg"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <p className="text-destructive text-sm">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="brand"
        size="auth"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registrando…" : "Registrarse"}
      </Button>
    </form>
  );
}
