import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/constants/site";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
      </div>
      <span
        className={cn(
          "font-bold tracking-tight text-foreground",
          sizes[size]
        )}
      >
        {SITE_CONFIG.name}
      </span>
    </div>
  );
}
