import { Target, Eye, Heart, Users, Shield, Sparkles } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Unity",
      description: "We stand together as one family, united by our shared vision for Embu County.",
    },
    {
      icon: Heart,
      title: "Inclusivity",
      description: "Every voice matters. We welcome all young people regardless of background.",
    },
    {
      icon: Sparkles,
      title: "Youth Leadership",
      description: "We believe in empowering young people to lead and create change.",
    },
    {
      icon: Shield,
      title: "Community Impact",
      description: "Everything we do is aimed at creating lasting positive change in our communities.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fade-up">
              About ECCA
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight animate-fade-up stagger-1">
              Who We <span className="text-gradient-primary">Are</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4 animate-fade-up stagger-2">
              The Embu County Comrades Association (ECCA) is a vibrant youth-led organization 
              dedicated to empowering young people and transforming communities across Embu County.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-card">
        <div className="container px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
              <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-secondary/10 text-secondary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Our Story
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                Why ECCA Was <span className="text-gradient-secondary">Formed</span>
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                <p>
                  ECCA was born from a simple but powerful idea: that the youth of Embu County, 
                  when united, can achieve extraordinary things. We recognized that young people 
                  needed a platform — not just to voice their concerns, but to take action and 
                  create real change.
                </p>
                <p>
                  Founded by a group of passionate young leaders, ECCA has grown from a small 
                  gathering of friends into a movement that spans the entire county. Our journey 
                  is a testament to what happens when youth come together with purpose and determination.
                </p>
                <p>
                  Today, ECCA stands as a beacon of hope and unity, showing that the future of 
                  Embu County is in capable, caring hands.
                </p>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative animate-fade-up stagger-2 mt-8 lg:mt-0" style={{ opacity: 0, animationFillMode: "forwards" }}>
              <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border overflow-hidden relative">
                <div className="absolute inset-0 opacity-20">
                  <img 
                    src="/images/unity-banner.svg" 
                    alt="Unity"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10 p-6 sm:p-8 flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center mb-4 sm:mb-6 animate-float backdrop-blur-sm">
                      <Users className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                    </div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">ECCA</p>
                    <p className="text-secondary font-semibold text-base sm:text-lg">Ni Home</p>
                    <p className="text-xs sm:text-sm text-primary font-medium italic mt-2">"Growth, Unity, Loyalty Above All Else"</p>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-3 sm:mt-4">Established 2020</p>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-primary/10 border border-primary/20 -z-10" />
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-28 h-28 rounded-xl bg-secondary/10 border border-secondary/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission */}
            <div 
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-card border border-border hover-lift hover-glow-green animate-fade-up"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                To unite, empower, and inspire the youth of Embu County through community 
                engagement, leadership development, environmental conservation, and social 
                activities that foster growth, belonging, and positive impact.
              </p>
            </div>

            {/* Vision */}
            <div 
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-card border border-border hover-lift hover-glow-orange animate-fade-up stagger-2"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 sm:mb-6">
                <Eye className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                To be the leading youth organization in Embu County, recognized for transforming 
                lives, building strong communities, and producing the next generation of leaders 
                who will shape the future of our county and nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 lg:py-24 bg-card">
        <div className="container px-4 sm:px-6">
          <SectionHeading
            badge="Our Values"
            title="What We Stand For"
            description="These core values guide everything we do at ECCA and define who we are as an organization."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={cn(
                  "p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-background border border-border text-center hover-lift transition-all duration-300 animate-fade-up",
                  index % 2 === 0 ? "hover-glow-green" : "hover-glow-orange"
                )}
                style={{ opacity: 0, animationFillMode: "forwards", animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={cn(
                    "w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl mx-auto flex items-center justify-center mb-3 sm:mb-4",
                    index % 2 === 0 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                  )}
                >
                  <value.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h4 className="font-display font-semibold text-base sm:text-lg text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl text-primary mb-4 sm:mb-6">"</div>
            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 sm:mb-6 leading-tight px-4">
              When youth unite with purpose, communities transform, 
              and nations rise. ECCA is that unity in action.
            </blockquote>
            <p className="text-sm sm:text-base text-muted-foreground">— ECCA Leadership</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
