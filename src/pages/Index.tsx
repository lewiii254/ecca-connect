import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Users, TreePine, Lightbulb, Handshake, Heart, ChevronRight, Play, Calendar, MapPin, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";
import FeatureCard from "@/components/shared/FeatureCard";
import EventCard from "@/components/shared/EventCard";
import AnimatedStatCard from "@/components/shared/AnimatedStatCard";
import heroCommunity from "@/assets/hero-community.jpg";
import communityMarch from "@/assets/gallery/image2.jpg";
import youthLeaders from "@/assets/gallery/event-4.jpg";
import communityEvent from "@/assets/gallery/event-1.jpg";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  image_url: string | null;
}

interface Leader {
  id: string;
  name: string;
  position: string;
  image_url: string | null;
}

const Index = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [membersCount, setMembersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch upcoming events
      const today = new Date().toISOString().split('T')[0];
      const { data: eventsData } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", today)
        .order("event_date", { ascending: true })
        .limit(3);

      if (eventsData) {
        setUpcomingEvents(eventsData);
      }

      // Fetch leadership team for testimonials
      const { data: leadersData } = await supabase
        .from("leadership_team")
        .select("id, name, position, image_url")
        .order("display_order", { ascending: true })
        .limit(3);

      if (leadersData) {
        setLeaders(leadersData);
      }

      // Get members count
      const { count } = await supabase
        .from("membership_applications")
        .select("id", { count: "exact", head: true });
      
      setMembersCount(count || 0);
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: Users,
      title: "Youth Empowerment",
      description: "Mentorship programs, career forums, and skill-building workshops for Embu County youth.",
      variant: "green" as const,
    },
    {
      icon: Handshake,
      title: "Community Development",
      description: "Grassroots initiatives that bring real change to our communities across Embu County.",
      variant: "orange" as const,
    },
    {
      icon: TreePine,
      title: "Environmental Action",
      description: "Tree planting drives, clean-up campaigns, and sustainability projects for a greener future.",
      variant: "green" as const,
    },
    {
      icon: Lightbulb,
      title: "Leadership & Networking",
      description: "Building tomorrow's leaders through networking events and leadership training.",
      variant: "orange" as const,
    },
  ];

  const stats = [
    { number: `${500 + membersCount}+`, label: "Active Members" },
    { number: "50+", label: "Events Hosted" },
    { number: "10K+", label: "Trees Planted" },
    { number: "20+", label: "Community Projects" },
  ];

  const whyEcca = [
    { icon: Heart, title: "Belonging", text: "Be part of a family that truly cares about your growth and success." },
    { icon: Users, title: "Network", text: "Connect with like-minded youth across Embu County and beyond." },
    { icon: Lightbulb, title: "Growth", text: "Access opportunities for personal and professional development." },
  ];

  const testimonials = [
    {
      quote: "ECCA changed my life. I found mentors, friends, and a purpose that drives me every day.",
      author: "Youth Member",
      role: "Community Leader"
    },
    {
      quote: "Being part of ECCA has given me opportunities I never thought possible. The network is incredible.",
      author: "Active Member",
      role: "Environmental Advocate"
    },
    {
      quote: "ECCA is more than an association – it's a family. Together, we're building a better Embu County.",
      author: "Youth Leader",
      role: "Mentorship Program Lead"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroCommunity} 
            alt="ECCA Community"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        </div>
        
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative z-10 px-4 sm:px-6 pt-20 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Welcome to the movement
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight animate-fade-up stagger-1">
              Embu County{" "}
              <span className="text-gradient-primary">Comrades</span>{" "}
              Association
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-secondary mb-4 sm:mb-6 animate-fade-up stagger-2">
              ECCA Ni Home
            </p>

            {/* Motto */}
            <p className="text-base sm:text-lg font-display font-medium text-primary mb-3 sm:mb-4 px-4 animate-fade-up stagger-2">
              "Growing into greatness as a team"
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-4 leading-relaxed animate-fade-up stagger-3">
              United by purpose, driven by passion. We are the youth of Embu County — 
              building communities, empowering each other, and creating lasting change.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 animate-fade-up stagger-4">
              <Link to="/join" className="w-full sm:w-auto">
                <Button variant="glow" size="xl" className="group w-full sm:w-auto min-h-[48px]">
                  Join ECCA
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/activities" className="w-full sm:w-auto">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto min-h-[48px]">
                  Our Activities
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-border animate-fade-up stagger-5 px-4">
              {stats.map((stat) => (
                <AnimatedStatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-float hidden sm:block">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-card">
        <div className="container px-4 sm:px-6">
          <SectionHeading
            badge="What We Do"
            title="Empowering Youth, Building Communities"
            description="ECCA focuses on four key pillars that drive our mission to create positive change in Embu County."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`animate-fade-up stagger-${index + 1}`}
                style={{ opacity: 0, animationFillMode: "forwards" }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ECCA Section */}
      <section className="py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="container px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <SectionHeading
                badge="Why ECCA?"
                title="More Than Just an Association"
                description="ECCA is a family. A movement. A home for every young person in Embu County who believes in the power of unity and community."
                align="left"
              />

              <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
                {whyEcca.map((item, index) => (
                  <div
                    key={item.title}
                    className={`flex gap-3 sm:gap-4 animate-fade-up stagger-${index + 3}`}
                    style={{ opacity: 0, animationFillMode: "forwards" }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-base sm:text-lg text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm sm:text-base">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="inline-block mt-6 sm:mt-8">
                <Button variant="outline" className="group min-h-[44px]">
                  Learn more about us
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Visual - Real Photos Grid */}
            <div className="relative mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Large featured image */}
                <div className="col-span-2 aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-border">
                  <img 
                    src={communityMarch}
                    alt="ECCA Community March"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Two smaller images */}
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-border">
                  <img 
                    src={youthLeaders}
                    alt="Youth Leaders"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-border">
                  <img 
                    src={communityEvent}
                    alt="Community Event"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              {/* Decorative elements - hidden on mobile */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 -z-10" />
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl bg-secondary/10 border border-secondary/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-card">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <SectionHeading
              badge="Upcoming Events"
              title="Join Us in Action"
              description="Don't miss out on our upcoming events and activities."
              align="left"
              className="mb-0"
            />
            <Link to="/events" className="w-full sm:w-auto">
              <Button variant="outline" className="group w-full sm:w-auto min-h-[44px]">
                View all events
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No upcoming events scheduled. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`animate-fade-up stagger-${index + 1}`}
                  style={{ opacity: 0, animationFillMode: "forwards" }}
                >
                  <EventCard 
                    title={event.title}
                    date={format(new Date(event.event_date), "MMMM d, yyyy")}
                    location={event.location || "TBA"}
                    description={event.description || ""}
                    image={event.image_url || undefined}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="container px-4 sm:px-6">
          <SectionHeading
            badge="Testimonials"
            title="What Our Members Say"
            description="Hear from the youth who have experienced the ECCA difference firsthand."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 sm:mt-12">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="relative overflow-hidden hover-lift border-border bg-card"
              >
                <CardContent className="p-6 sm:p-8">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  <p className="text-muted-foreground italic mb-6 text-sm sm:text-base leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden bg-card">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Ready to Make a <span className="text-gradient-primary">Difference</span>?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 px-4">
              Join thousands of young people across Embu County who are already part of the ECCA family. 
              Together, we can achieve more.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4">
              <Link to="/join" className="w-full sm:w-auto">
                <Button variant="glow" size="xl" className="group w-full sm:w-auto min-h-[48px]">
                  Become a Member
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto min-h-[48px]">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-border">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Trusted By Our Community Partners
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-60">
            {["Embu County Government", "Local NGOs", "Community Groups", "Youth Organizations"].map((partner) => (
              <span key={partner} className="text-muted-foreground text-sm sm:text-base font-medium">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;