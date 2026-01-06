import { cn } from "@/lib/utils";

interface StatCardProps {
  number: string;
  label: string;
  className?: string;
}

const StatCard = ({ number, label, className }: StatCardProps) => {
  return (
    <div className={cn("text-center", className)}>
      <div className="font-display text-4xl sm:text-5xl font-bold text-gradient-primary mb-2">
        {number}
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default StatCard;
