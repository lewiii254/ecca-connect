import { Briefcase, TreePine, Users, PartyPopper, Megaphone, GraduationCap } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const Activities = () => {
  const activities = [
    {
      icon: GraduationCap,
      title: "Mentorship & Career Forums",
      description: "We connect young people with industry professionals and mentors who guide them in their career paths. Our forums feature successful professionals sharing insights and opportunities.",
      highlights: ["Career guidance sessions", "CV writing workshops", "Interview preparation", "Industry networking"],
      variant: "green" as const,
      image: "/images/youth-empowerment.svg",
    },
    {
      icon: TreePine,
      title: "Environmental Conservation",
      description: "ECCA leads the charge in environmental sustainability through tree planting initiatives, clean-up campaigns, and awareness programs about climate action.",
      highlights: ["Tree planting drives", "River clean-up campaigns", "Environmental education", "Sustainability workshops"],
      variant: "green" as const,
      image: "/images/environmental-conservation.svg",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "We actively participate in community development through outreach programs, charity events, and partnerships with local organizations.",
      highlights: ["Community outreach", "Charity initiatives", "Youth forums", "Local partnerships"],
      variant: "orange" as const,
      image: "/images/community-development.svg",
    },
    {
      icon: PartyPopper,
      title: "Social & Networking Events",
      description: "From the annual ECCA Gala to Comrades Nights, we create spaces for youth to connect, celebrate, and build lasting friendships.",
      highlights: ["Annual ECCA Gala", "Comrades Nights", "Sports tournaments", "Cultural celebrations"],
      variant: "orange" as const,
      image: "/images/leadership-networking.svg",
    },
    {
      icon: Megaphone,
      title: "Advocacy & Awareness",
      description: "We amplify youth voices on issues that matter — from education policy to mental health awareness — ensuring young people are heard.",
      highlights: ["Policy advocacy", "Mental health awareness", "Youth rights campaigns", "Educational forums"],
      variant: "green" as const,
      image: "/images/youth-empowerment.svg",
    },
    {
      icon: Briefcase,
      title: "Skills Development",
      description: "Through workshops and training programs, we equip young people with practical skills that enhance their employability and entrepreneurial potential.",
      highlights: ["Digital skills training", "Entrepreneurship workshops", "Financial literacy", "Leadership training"],
      variant: "orange" as const,
      image: "/images/community-development.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-secondary/10 text-secondary text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fade-up">
              What We Do
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight animate-fade-up stagger-1">
              Activities & <span className="text-gradient-secondary">Impact</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4 animate-fade-up stagger-2">
              From mentorship programs to environmental conservation, discover how ECCA 
              is making a difference in Embu County through action and engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-6 sm:gap-8">
            {activities.map((activity, index) => (
              <div
                key={activity.title}
                className={cn(
                  "group rounded-2xl sm:rounded-3xl bg-card border border-border overflow-hidden hover-lift transition-all duration-300 animate-fade-up",
                  activity.variant === "green" ? "hover-glow-green" : "hover-glow-orange"
                )}
                style={{ opacity: 0, animationFillMode: "forwards", animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid md:grid-cols-[1fr,1.5fr] gap-4 md:gap-6">
                  {/* Image/Icon Section */}
                  <div className={cn(
                    "p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden",
                    activity.variant === "green" 
                      ? "bg-gradient-to-br from-primary/10 to-primary/5" 
                      : "bg-gradient-to-br from-secondary/10 to-secondary/5"
                  )}>
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-30">
                      <img 
                        src={activity.image} 
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={cn(
                      "relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300",
                      activity.variant === "green"
                        ? "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                        : "bg-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
                    )}>
                      <activity.icon className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h3 className="relative z-10 font-display text-lg sm:text-xl font-bold text-foreground">
                      {activity.title}
                    </h3>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 sm:p-8 md:p-12 md:pl-0">
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                      {activity.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {activity.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className={cn(
                            "flex items-center gap-2 text-xs sm:text-sm",
                            activity.variant === "green" ? "text-primary" : "text-secondary"
                          )}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container px-4">
          <SectionHeading
            badge="Our Impact"
            title="Numbers That Tell Our Story"
            description="The impact of ECCA can be measured in the lives we've touched and the communities we've transformed."
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { number: "500+", label: "Youth Mentored" },
              { number: "10,000+", label: "Trees Planted" },
              { number: "50+", label: "Community Events" },
              { number: "20+", label: "Partner Organizations" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-background border border-border animate-fade-up"
                style={{ opacity: 0, animationFillMode: "forwards", animationDelay: `${index * 0.1}s` }}
              >
                <div className="font-display text-4xl sm:text-5xl font-bold text-gradient-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;
