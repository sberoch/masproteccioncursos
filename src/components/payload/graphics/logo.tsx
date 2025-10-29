import Image from "next/image";
import icon from "@/assets/icon.png";

export const LoginLogo = () => {
  return (
    <div className="flex items-center justify-center w-1/2 mx-auto mb-12">
      <Image src={icon} alt="Logo" width={180} height={180} priority />
    </div>
  );
};

export default LoginLogo;
