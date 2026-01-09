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
        {/* Background layers for light mode enhancement */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute inset-0 bg-gradient-hero-radial" />
        
        {/* Background Image with better light mode overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroCommunity} 
            alt="ECCA Community"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 light-hero-overlay" />
        </div>
        
        {/* Animated gradient orbs - enhanced for light mode */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-[500px] md:h-[500px] bg-primary/15 dark:bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 md:w-[400px] md:h-[400px] bg-secondary/15 dark:bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 md:w-64 md:h-64 bg-primary/10 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-5"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative shapes */}
        <div className="absolute top-20 right-10 w-20 h-20 border-2 border-primary/20 rounded-full hidden lg:block animate-float" />
        <div className="absolute bottom-40 left-10 w-16 h-16 bg-secondary/10 rotate-45 hidden lg:block animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-40 left-20 w-3 h-3 bg-primary rounded-full hidden lg:block animate-pulse" />
        <div className="absolute bottom-60 right-20 w-2 h-2 bg-secondary rounded-full hidden lg:block animate-pulse" style={{ animationDelay: "0.5s" }} />

        <div className="container relative z-10 px-4 sm:px-6 pt-20 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge - enhanced */}
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-primary/10 dark:bg-primary/10 border border-primary/30 dark:border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 sm:mb-8 animate-fade-up shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-glow-green" />
              Welcome to the movement
            </div>

            {/* Main Heading - enhanced typography */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-4 sm:mb-6 leading-[1.1] animate-fade-up stagger-1">
              Embu County{" "}
              <span className="text-gradient-primary relative">
                Comrades
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full" />
              </span>{" "}
              Association
            </h1>

            {/* Tagline - enhanced with glow effect */}
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-secondary mb-4 sm:mb-6 animate-fade-up stagger-2">
              ECCA Ni Home
            </p>

            {/* Motto - styled quote */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 animate-fade-up stagger-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <p className="text-base sm:text-lg md:text-xl font-display font-medium text-primary italic">
                "Growing into greatness as a team"
              </p>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/50" />
            </div>

            {/* Description - enhanced */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-4 leading-relaxed animate-fade-up stagger-3">
              United by purpose, driven by passion. We are the youth of Embu County — 
              building communities, empowering each other, and creating lasting change.
            </p>

            {/* CTA Buttons - enhanced with better shadows */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 animate-fade-up stagger-4">
              <Link to="/join" className="w-full sm:w-auto">
                <Button variant="glow" size="xl" className="group w-full sm:w-auto min-h-[52px] shadow-hero-button hover:shadow-[0_12px_40px_hsl(142_71%_35%_/_0.45)]">
                  Join ECCA
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/activities" className="w-full sm:w-auto">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto min-h-[52px] border-foreground/20 dark:border-foreground/30 hover:bg-primary/5">
                  Our Activities
                </Button>
              </Link>
            </div>

            {/* Stats - enhanced card style */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-border/50 animate-fade-up stagger-5 px-4">
              {stats.map((stat) => (
                <AnimatedStatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator - enhanced */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-float hidden sm:flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 dark:border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-2.5 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section - enhanced */}
      <section className="py-16 sm:py-20 lg:py-28 xl:py-36 bg-card relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container px-4 sm:px-6 relative z-10">
          <SectionHeading
            badge="What We Do"
            title="Empowering Youth, Building Communities"
            description="ECCA focuses on four key pillars that drive our mission to create positive change in Embu County."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-14">
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

      {/* Why ECCA Section - enhanced */}
      <section className="py-16 sm:py-20 lg:py-28 xl:py-36 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent" />
        
        <div className="container px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <SectionHeading
                badge="Why ECCA?"
                title="More Than Just an Association"
                description="ECCA is a family. A movement. A home for every young person in Embu County who believes in the power of unity and community."
                align="left"
              />

              <div className="space-y-5 sm:space-y-6 mt-8 sm:mt-10">
                {whyEcca.map((item, index) => (
                  <div
                    key={item.title}
                    className={`flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-card/50 dark:bg-card/30 border border-border/50 hover-lift animate-fade-up stagger-${index + 3}`}
                    style={{ opacity: 0, animationFillMode: "forwards" }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg sm:text-xl text-foreground mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="inline-block mt-8 sm:mt-10">
                <Button variant="outline" size="lg" className="group min-h-[48px] border-primary/30 hover:border-primary">
                  Learn more about us
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Visual - Real Photos Grid - enhanced */}
            <div className="relative mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {/* Large featured image */}
                <div className="col-span-2 aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-border/50 shadow-card">
                  <img 
                    src={communityMarch}
                    alt="ECCA Community March"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Two smaller images */}
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 shadow-card">
                  <img 
                    src={youthLeaders}
                    alt="Youth Leaders"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 shadow-card">
                  <img 
                    src={communityEvent}
                    alt="Community Event"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              {/* Enhanced decorative elements */}
              <div className="hidden sm:block absolute -top-6 -right-6 w-28 h-28 rounded-3xl bg-primary/10 dark:bg-primary/15 border border-primary/20 -z-10" />
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-36 h-36 rounded-3xl bg-secondary/10 dark:bg-secondary/15 border border-secondary/20 -z-10" />
              <div className="hidden lg:block absolute top-1/2 -right-12 w-4 h-4 bg-primary rounded-full animate-pulse" />
              <div className="hidden lg:block absolute bottom-1/4 -left-8 w-3 h-3 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section - enhanced */}
      <section className="py-16 sm:py-20 lg:py-28 xl:py-36 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container px-4 sm:px-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
            <SectionHeading
              badge="Upcoming Events"
              title="Join Us in Action"
              description="Don't miss out on our upcoming events and activities."
              align="left"
              className="mb-0"
            />
            <Link to="/events" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="group w-full sm:w-auto min-h-[48px] border-primary/30 hover:border-primary">
                View all events
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-background/50 border border-border/50">
              <Calendar className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No upcoming events scheduled. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
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

      {/* Testimonials Section - enhanced */}
      <section className="py-16 sm:py-20 lg:py-28 xl:py-36 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/3 bg-gradient-to-tl from-secondary/5 to-transparent" />
        
        <div className="container px-4 sm:px-6 relative z-10">
          <SectionHeading
            badge="Testimonials"
            title="What Our Members Say"
            description="Hear from the youth who have experienced the ECCA difference firsthand."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-14">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="relative overflow-hidden hover-lift border-border/50 bg-card/50 dark:bg-card shadow-card"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                <CardContent className="p-6 sm:p-8">
                  <Quote className="w-10 h-10 text-primary/15 mb-4" />
                  <p className="text-muted-foreground italic mb-6 text-base sm:text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-sm">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-base">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - enhanced */}
      <section className="py-20 sm:py-24 lg:py-32 xl:py-40 relative overflow-hidden bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary/20 rounded-full hidden lg:block" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-secondary/10 rotate-45 hidden lg:block" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              Join the Family
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-8 leading-tight">
              Ready to Make a <span className="text-gradient-primary">Difference</span>?
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl mb-8 sm:mb-10 px-4 leading-relaxed">
              Join thousands of young people across Embu County who are already part of the ECCA family. 
              Together, we can achieve more.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 px-4">
              <Link to="/join" className="w-full sm:w-auto">
                <Button variant="glow" size="xl" className="group w-full sm:w-auto min-h-[56px] text-lg shadow-hero-button">
                  Become a Member
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto min-h-[56px] text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - enhanced */}
      <section className="py-14 sm:py-18 lg:py-24 border-t border-border/50 relative">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              Trusted By Our Community Partners
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-20">
            {["Embu County Government", "Local NGOs", "Community Groups", "Youth Organizations"].map((partner) => (
              <div key={partner} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <Handshake className="w-5 h-5 text-primary hidden sm:block" />
                <span className="text-muted-foreground text-sm sm:text-base font-medium">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;