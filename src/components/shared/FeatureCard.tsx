import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "green" | "orange";
  className?: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  variant = "green",
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group p-6 rounded-2xl bg-card border border-border hover-lift transition-all duration-300",
        variant === "green" ? "hover-glow-green" : "hover-glow-orange",
        className
      )}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
          variant === "green"
            ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
            : "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
        )}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-display font-semibold text-xl text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
