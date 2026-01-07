import { Link } from "react-router-dom";
import { ArrowRight, Users, TreePine, Lightbulb, Handshake, Heart, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";
import FeatureCard from "@/components/shared/FeatureCard";
import EventCard from "@/components/shared/EventCard";
import AnimatedStatCard from "@/components/shared/AnimatedStatCard";
import heroCommunity from "@/assets/hero-community.jpg";

const Index = () => {
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

  const upcomingEvents = [
    {
      title: "ECCA Youth Career Forum 2024",
      date: "March 15, 2024",
      location: "Embu Town Hall",
      description: "A comprehensive career guidance event featuring industry experts and mentors.",
    },
    {
      title: "Environmental Conservation Day",
      date: "March 22, 2024",
      location: "Mt. Kenya Forest Reserve",
      description: "Join us for tree planting and environmental awareness activities.",
    },
    {
      title: "Comrades Night Networking",
      date: "April 5, 2024",
      location: "Embu Sports Club",
      description: "An evening of networking, entertainment, and community building.",
    },
  ];

  const stats = [
    { number: "500+", label: "Active Members" },
    { number: "50+", label: "Events Hosted" },
    { number: "10K+", label: "Trees Planted" },
    { number: "20+", label: "Community Projects" },
  ];

  const whyEcca = [
    { icon: Heart, title: "Belonging", text: "Be part of a family that truly cares about your growth and success." },
    { icon: Users, title: "Network", text: "Connect with like-minded youth across Embu County and beyond." },
    { icon: Lightbulb, title: "Growth", text: "Access opportunities for personal and professional development." },
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
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        </div>
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative z-10 px-4 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Welcome to the movement
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up stagger-1">
              Embu County{" "}
              <span className="text-gradient-primary">Comrades</span>{" "}
              Association
            </h1>

            {/* Tagline */}
            <p className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-secondary mb-6 animate-fade-up stagger-2">
              ECCA Ni Home
            </p>

            {/* Motto */}
            <p className="text-lg font-display font-medium text-primary mb-4 animate-fade-up stagger-2">
              "Growth, Unity, Loyalty Above All Else"
            </p>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up stagger-3">
              United by purpose, driven by passion. We are the youth of Embu County — 
              building communities, empowering each other, and creating lasting change.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-4">
              <Link to="/join">
                <Button variant="glow" size="xl" className="group">
                  Join ECCA
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/activities">
                <Button variant="hero-outline" size="xl">
                  Our Activities
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border animate-fade-up stagger-5">
              {stats.map((stat) => (
                <AnimatedStatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-card">
        <div className="container px-4">
          <SectionHeading
            badge="What We Do"
            title="Empowering Youth, Building Communities"
            description="ECCA focuses on four key pillars that drive our mission to create positive change in Embu County."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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
      <section className="py-20 lg:py-32">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <SectionHeading
                badge="Why ECCA?"
                title="More Than Just an Association"
                description="ECCA is a family. A movement. A home for every young person in Embu County who believes in the power of unity and community."
                align="left"
              />

              <div className="space-y-6 mt-8">
                {whyEcca.map((item, index) => (
                  <div
                    key={item.title}
                    className={`flex gap-4 animate-fade-up stagger-${index + 3}`}
                    style={{ opacity: 0, animationFillMode: "forwards" }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="inline-block mt-8">
                <Button variant="outline" className="group">
                  Learn more about us
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border overflow-hidden relative">
                <div className="absolute inset-0 opacity-30">
                  <img 
                    src="/images/community-impact.svg" 
                    alt="Community Impact"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center relative z-10">
                    <div className="w-32 h-32 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-float backdrop-blur-sm">
                      <Users className="w-16 h-16 text-primary" />
                    </div>
                    <p className="font-display text-2xl font-bold text-foreground">ECCA Ni Home</p>
                    <p className="text-muted-foreground mt-2">Unity • Purpose • Impact</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl bg-secondary/10 border border-secondary/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 lg:py-32 bg-card">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <SectionHeading
              badge="Upcoming Events"
              title="Join Us in Action"
              description="Don't miss out on our upcoming events and activities."
              align="left"
              className="mb-0"
            />
            <Link to="/events">
              <Button variant="outline" className="group">
                View all events
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.title}
                className={`animate-fade-up stagger-${index + 1}`}
                style={{ opacity: 0, animationFillMode: "forwards" }}
              >
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Make a <span className="text-gradient-primary">Difference</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of young people across Embu County who are already part of the ECCA family. 
              Together, we can achieve more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/join">
                <Button variant="glow" size="xl" className="group">
                  Become a Member
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-outline" size="xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
