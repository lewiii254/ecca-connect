import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4 animate-fade-up">
          {badge}
        </span>
      )}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight animate-fade-up stagger-1">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed animate-fade-up stagger-2">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
