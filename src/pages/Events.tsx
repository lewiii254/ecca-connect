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
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-secondary/10 text-secondary text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fade-up">
              Join Us
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight animate-fade-up stagger-1">
              Events & <span className="text-gradient-secondary">Gatherings</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4 animate-fade-up stagger-2">
              From career forums to community celebrations, ECCA hosts a variety of events 
              that bring youth together for growth, connection, and impact. Each event is 
              carefully designed to provide value, create memorable experiences, and strengthen 
              our community bonds. Whether you're looking to learn, network, or simply have fun, 
              ECCA events offer something for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container px-4 sm:px-6">
          {/* Tabs */}
          <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto">
            <div className="inline-flex p-1 rounded-xl bg-card border border-border min-w-max">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={cn(
                  "px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 min-h-[40px] sm:min-h-[44px]",
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
                  "px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 min-h-[40px] sm:min-h-[44px]",
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
            <div className="text-center py-16 px-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                {activeTab === "upcoming" ? "No upcoming events scheduled." : "No past events to display."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
      <section className="py-12 sm:py-16 lg:py-24 bg-card/50">
        <div className="container px-4 sm:px-6">
          <SectionHeading
            badge="Memories"
            title="Photo Gallery"
            description="Relive the memorable moments from our past events and activities. Each photo captures the spirit of ECCA—youth united in purpose, celebrating together, and creating lasting impact. From tree planting initiatives to gala nights, our gallery showcases the vibrant energy and diverse experiences that make ECCA a unique community."
          />
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6 sm:mb-8">
            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Click any image to view in fullscreen</span>
          </div>
          <PhotoGallery />
        </div>
      </section>

      {/* Host Event CTA */}
      <section className="py-12 sm:py-16 lg:py-24 bg-card">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Want to Host an <span className="text-gradient-primary">Event</span>?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 px-4">
              Have an idea for a community event or activity? ECCA supports members 
              who want to organize events that align with our mission of youth empowerment, 
              community development, and social impact. Whether it's a workshop, fundraiser, 
              sports tournament, or awareness campaign, we provide resources, guidance, and 
              promotional support to bring your vision to life. Reach out to our events team 
              to get started on planning your next impactful event!
            </p>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm sm:text-base">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Contact: events@ecca.co.ke
              </div>
              <div className="text-sm text-muted-foreground mt-4">
                <p>We welcome event proposals for:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-left max-w-2xl mx-auto">
                  <li>Educational workshops and seminars</li>
                  <li>Community service projects</li>
                  <li>Social networking events</li>
                  <li>Sports and recreational activities</li>
                  <li>Fundraising initiatives</li>
                  <li>Awareness campaigns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;