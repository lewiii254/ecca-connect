import { useState, useEffect } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import EventCard from "@/components/shared/EventCard";
import PhotoGallery from "@/components/shared/PhotoGallery";
import { cn } from "@/lib/utils";
import { Camera, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  image_url: string | null;
  is_upcoming: boolean | null;
}

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false });

      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter(e => new Date(e.event_date) >= today);
  const pastEvents = events.filter(e => new Date(e.event_date) < today);

  const displayedEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6 animate-fade-up">
              Join Us
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up stagger-1">
              Events & <span className="text-gradient-secondary">Gatherings</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground animate-fade-up stagger-2">
              From career forums to community celebrations, ECCA hosts a variety of events 
              that bring youth together for growth, connection, and impact.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 rounded-xl bg-card border border-border">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                  activeTab === "upcoming"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Upcoming Events ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                  activeTab === "past"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Past Events ({pastEvents.length})
              </button>
            </div>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : displayedEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                {activeTab === "upcoming" ? "No upcoming events scheduled." : "No past events to display."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-fade-up"
                  style={{ opacity: 0, animationFillMode: "forwards", animationDelay: `${index * 0.1}s` }}
                >
                  <EventCard
                    title={event.title}
                    date={format(new Date(event.event_date), "MMMM d, yyyy")}
                    location={event.location || "TBA"}
                    description={event.description || ""}
                    image={event.image_url || undefined}
                    isPast={activeTab === "past"}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="container px-4">
          <SectionHeading
            badge="Memories"
            title="Photo Gallery"
            description="Relive the memorable moments from our past events and activities."
          />
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Camera className="w-5 h-5" />
            <span className="text-sm">Click any image to view in fullscreen</span>
          </div>
          <PhotoGallery />
        </div>
      </section>

      {/* Host Event CTA */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Want to Host an <span className="text-gradient-primary">Event</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Have an idea for a community event or activity? ECCA supports members 
              who want to organize events that align with our mission. Reach out to 
              our events team to get started!
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Contact: events@ecca.co.ke
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;