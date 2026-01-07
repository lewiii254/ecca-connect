import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedStatCardProps {
  number: string;
  label: string;
  className?: string;
}

const AnimatedStatCard = ({ number, label, className }: AnimatedStatCardProps) => {
  // Extract the numeric part and suffix (e.g., "500+" -> 500, "+")
  const numericMatch = number.match(/^(\d+)(.*)$/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? numericMatch[2] : "";

  const { count, elementRef } = useCountUp({
    end: numericValue,
    duration: 2000,
  });

  return (
    <div ref={elementRef} className={cn("text-center", className)}>
      <div className="font-display text-4xl sm:text-5xl font-bold text-gradient-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default AnimatedStatCard;
