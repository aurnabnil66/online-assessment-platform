import { ReactNode } from "react";
import { cn } from "@/utils/helpers";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={cn("text-xl font-semibold", className)}>{children}</h3>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}
