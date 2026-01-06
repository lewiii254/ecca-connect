import { cn } from "@/lib/utils";

interface LeaderCardProps {
  name: string;
  role: string;
  image?: string;
  className?: string;
}

const LeaderCard = ({ name, role, image, className }: LeaderCardProps) => {
  return (
    <div
      className={cn(
        "group text-center p-6 rounded-2xl bg-card border border-border hover-lift hover-glow-green transition-all duration-300",
        className
      )}
    >
      {/* Avatar */}
      <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary transition-colors duration-300">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="font-display font-bold text-3xl text-primary">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="font-display font-semibold text-lg text-foreground mb-1">
        {name}
      </h3>
      <p className="text-primary text-sm font-medium">{role}</p>
    </div>
  );
};

export default LeaderCard;
