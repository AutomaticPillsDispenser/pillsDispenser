import { cn } from "@/lib/utils";
import Image from "next/image";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Image alt="Meds Store Logo" src={'/Logo.png'} width={100} height={0}  />
    </nav>
  );
}
