import type { ModuleProgressItem } from "@/utilities/getCourseProgress";

type ModuleStepperProps = {
  modules: ModuleProgressItem[];
};

export function ModuleStepper({ modules }: ModuleStepperProps) {
  if (modules.length === 0) return null;

  return (
    <div className="flex w-full items-start">
      {modules.map((module, index) => {
        const isCompleted = module.completed;
        const connectorToNextCompleted = isCompleted && index < modules.length - 1;

        return (
          <div
            key={module.id}
            className="flex flex-1 items-start first:flex-none last:flex-none"
          >
            {index > 0 && (
              <div
                className={`h-0.5 w-full min-w-[12px] self-center ${
                  modules[index - 1]?.completed ? "bg-brand" : "bg-border"
                }`}
                aria-hidden
              />
            )}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                  isCompleted
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
                aria-current={
                  !isCompleted && (index === 0 || modules[index - 1]?.completed)
                    ? "step"
                    : undefined
                }
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 max-w-[72px] truncate text-center text-xs font-medium sm:max-w-[96px] ${
                  isCompleted ? "text-brand" : "text-muted-foreground"
                }`}
                title={module.title}
              >
                {module.title}
              </span>
            </div>
            {index < modules.length - 1 && (
              <div
                className={`h-0.5 w-full min-w-[12px] self-center ${
                  connectorToNextCompleted ? "bg-brand" : "bg-border"
                }`}
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
