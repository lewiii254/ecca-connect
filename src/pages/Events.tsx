import { useState } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import EventCard from "@/components/shared/EventCard";
import { cn } from "@/lib/utils";

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const upcomingEvents = [
    {
      title: "ECCA Youth Career Forum 2024",
      date: "March 15, 2024",
      location: "Embu Town Hall",
      description: "A comprehensive career guidance event featuring industry experts, mentors, and networking opportunities for young professionals and students.",
      image: "/images/event-career-forum.svg",
    },
    {
      title: "Environmental Conservation Day",
      date: "March 22, 2024",
      location: "Mt. Kenya Forest Reserve",
      description: "Join us for a day of tree planting, environmental education, and community bonding. We aim to plant 1,000 trees in a single day!",
      image: "/images/event-tree-planting.svg",
    },
    {
      title: "Comrades Night Networking",
      date: "April 5, 2024",
      location: "Embu Sports Club",
      description: "An evening of networking, entertainment, and community building. Connect with fellow comrades in a relaxed, fun atmosphere.",
      image: "/images/event-networking.svg",
    },
    {
      title: "Mental Health Awareness Workshop",
      date: "April 20, 2024",
      location: "ECCA Community Center",
      description: "A workshop dedicated to mental health awareness, featuring professional counselors and interactive sessions.",
      image: "/images/youth-empowerment.svg",
    },
    {
      title: "Youth Entrepreneurship Summit",
      date: "May 10, 2024",
      location: "Embu University Auditorium",
      description: "Learn from successful entrepreneurs, pitch your business ideas, and connect with potential investors and mentors.",
      image: "/images/event-career-forum.svg",
    },
  ];

  const pastEvents = [
    {
      title: "ECCA Annual Gala 2023",
      date: "December 15, 2023",
      location: "Izaak Walton Hotel",
      description: "A spectacular celebration of ECCA's achievements, featuring awards, entertainment, and community recognition.",
      isPast: true,
      image: "/images/event-networking.svg",
    },
    {
      title: "Tree Planting Drive - Phase 3",
      date: "November 25, 2023",
      location: "Embu Green Belt",
      description: "Successfully planted over 2,000 trees in our ongoing reforestation initiative across Embu County.",
      isPast: true,
      image: "/images/event-tree-planting.svg",
    },
    {
      title: "Youth Leadership Conference",
      date: "October 14, 2023",
      location: "Embu Stadium",
      description: "A powerful gathering of young leaders from across the county, featuring inspiring speakers and workshops.",
      isPast: true,
      image: "/images/leadership-networking.svg",
    },
    {
      title: "Community Clean-Up Day",
      date: "September 16, 2023",
      location: "Embu Town Center",
      description: "Hundreds of comrades came together to clean and beautify our town center and public spaces.",
      isPast: true,
      image: "/images/community-development.svg",
    },
  ];

  const events = activeTab === "upcoming" ? upcomingEvents : pastEvents;

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
                Upcoming Events
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
                Past Events
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={event.title}
                className="animate-fade-up"
                style={{ opacity: 0, animationFillMode: "forwards", animationDelay: `${index * 0.1}s` }}
              >
                <EventCard {...event} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {events.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No events to display</p>
            </div>
          )}
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
