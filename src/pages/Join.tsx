import { useState } from "react";
import { CheckCircle, Users, Calendar, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const Join = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    reason: "",
  });

  const benefits = [
    {
      icon: Users,
      title: "Community & Belonging",
      description: "Join a family of like-minded youth who support and uplift each other.",
    },
    {
      icon: Calendar,
      title: "Exclusive Events",
      description: "Get access to members-only events, networking opportunities, and activities.",
    },
    {
      icon: Award,
      title: "Growth Opportunities",
      description: "Access mentorship, skills training, and leadership development programs.",
    },
    {
      icon: Heart,
      title: "Make an Impact",
      description: "Be part of meaningful community projects that create lasting change.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("membership_applications")
        .insert({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          location: formData.location.trim(),
          reason: formData.reason.trim(),
        });

      if (error) throw error;

      toast({
        title: "Application Submitted! 🎉",
        description: "Welcome to the ECCA family! We'll be in touch soon.",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              Join the Movement
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up stagger-1">
              Become an <span className="text-gradient-primary">ECCA Member</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground animate-fade-up stagger-2">
              Ready to be part of something bigger? Join thousands of young people 
              who are already making a difference in Embu County.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container px-4">
          <SectionHeading
            badge="Why Join?"
            title="Benefits of Membership"
            description="As an ECCA member, you gain access to a world of opportunities and a supportive community."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={cn(
                  "p-6 rounded-2xl bg-background border border-border text-center hover-lift transition-all duration-300 animate-fade-up",
                  index % 2 === 0 ? "hover-glow-green" : "hover-glow-orange"
                )}
                style={{ opacity: 0, animationFillMode: "forwards", animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-4",
                    index % 2 === 0 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                  )}
                >
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h4 className="font-display font-semibold text-lg text-foreground mb-2">
                  {benefit.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to <span className="text-gradient-primary">Join</span>?
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and take the first step to becoming an ECCA member.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 bg-card border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0700 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="h-12 bg-card border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 bg-card border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-foreground">
                    Location in Embu County *
                  </label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Embu Town, Runyenjes"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="h-12 bg-card border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="reason" className="text-sm font-medium text-foreground">
                  Why do you want to join ECCA? *
                </label>
                <Textarea
                  id="reason"
                  name="reason"
                  placeholder="Tell us what excites you about ECCA and what you hope to contribute..."
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-card border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="glow"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                By submitting, you agree to our community guidelines and values.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Join;
