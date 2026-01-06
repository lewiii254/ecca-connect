import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  isPast?: boolean;
  className?: string;
}

const EventCard = ({
  title,
  date,
  location,
  description,
  image,
  isPast = false,
  className,
}: EventCardProps) => {
  return (
    <div
      className={cn(
        "group rounded-2xl bg-card border border-border overflow-hidden hover-lift transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: image
              ? `url(${image})`
              : "linear-gradient(135deg, hsl(var(--ecca-green) / 0.2), hsl(var(--ecca-orange) / 0.2))",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        {isPast && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            Past Event
          </span>
        )}
        {!isPast && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            Upcoming
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-semibold text-xl text-foreground mb-3 line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-secondary" />
            <span>{location}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <Button variant="ghost" className="group/btn p-0 h-auto text-primary">
          Learn more
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
