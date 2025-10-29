import Image from "next/image";
import icon from "@/assets/icon.png";

export const Icon = () => {
  return (
    <div>
      <Image src={icon} alt="icon" className="w-40" />
    </div>
  );
};

export default Icon;
