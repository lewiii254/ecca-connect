import SectionHeading from "@/components/shared/SectionHeading";
import LeaderCard from "@/components/shared/LeaderCard";
import { Quote } from "lucide-react";

const Leadership = () => {
  const leaders = [
    { name: "John Mwangi", role: "Chairperson" },
    { name: "Grace Wanjiku", role: "Vice Chairperson" },
    { name: "Peter Njeru", role: "Secretary General" },
    { name: "Faith Wambui", role: "Treasurer" },
    { name: "David Muthomi", role: "Organizing Secretary" },
    { name: "Mary Njoki", role: "Communications Director" },
    { name: "James Kariuki", role: "Youth Coordinator" },
    { name: "Sarah Muthoni", role: "Environmental Lead" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              Our Team
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up stagger-1">
              Meet Our <span className="text-gradient-primary">Leadership</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground animate-fade-up stagger-2">
              Dedicated young leaders committed to serving the youth of Embu County 
              with passion, integrity, and unwavering commitment to our shared vision.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Structure */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          <SectionHeading
            badge="Executive Committee"
            title="Leadership Structure"
            description="Our leadership team brings together diverse talents and perspectives to guide ECCA's mission."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {leaders.map((leader, index) => (
              <div
                key={leader.name}
                className="animate-fade-up"
                style={{ opacity: 0, animationFillMode: "forwards", animationDelay: `${index * 0.1}s` }}
              >
                <LeaderCard {...leader} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message from Leadership */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 lg:p-12 rounded-3xl bg-background border border-border relative overflow-hidden">
              {/* Decorative Quote */}
              <div className="absolute top-6 left-6 text-primary/10">
                <Quote className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  Message from Leadership
                </span>
                
                <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-8 leading-relaxed">
                  "To every young person in Embu County: ECCA is your home. Here, your voice 
                  matters, your dreams are valid, and your potential is limitless. Together, 
                  we are building more than an organization — we are building a legacy of unity, 
                  service, and transformative impact that will echo through generations."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="font-display font-bold text-xl text-primary">JM</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">John Mwangi</p>
                    <p className="text-primary text-sm">Chairperson, ECCA</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Join Leadership */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Want to Lead with <span className="text-gradient-secondary">Purpose</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              ECCA welcomes passionate young leaders who want to make a difference. 
              Leadership opportunities are available for members who demonstrate commitment 
              and a desire to serve.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Integrity", "Service", "Vision", "Dedication"].map((value) => (
                <span
                  key={value}
                  className="px-6 py-2 rounded-full bg-card border border-border text-muted-foreground"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
