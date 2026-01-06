import { useState } from "react";
import { MapPin, Mail, Phone, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: ["Embu County, Kenya", "Eastern Region"],
      variant: "green" as const,
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@ecca.co.ke", "support@ecca.co.ke"],
      variant: "orange" as const,
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 700 000 000", "+254 711 000 000"],
      variant: "green" as const,
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter/X", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent! ✉️",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
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
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              Get in Touch
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up stagger-1">
              Contact <span className="text-gradient-primary">ECCA</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground animate-fade-up stagger-2">
              Have questions, ideas, or want to partner with us? We'd love to hear from you. 
              Reach out and let's start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className={cn(
                  "p-6 rounded-2xl bg-background border border-border text-center hover-lift transition-all duration-300 animate-fade-up",
                  info.variant === "green" ? "hover-glow-green" : "hover-glow-orange"
                )}
                style={{ opacity: 0, animationFillMode: "forwards", animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-4",
                    info.variant === "green" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                  )}
                >
                  <info.icon className="w-7 h-7" />
                </div>
                <h4 className="font-display font-semibold text-lg text-foreground mb-2">
                  {info.title}
                </h4>
                {info.details.map((detail) => (
                  <p key={detail} className="text-muted-foreground text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Social */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 bg-card border-border focus:border-primary"
                    />
                  </div>
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
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-12 bg-card border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-card border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Social Links & Info */}
            <div className="space-y-8">
              {/* Social Media */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                  Follow Us
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Stay connected and follow our journey on social media.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border hover:border-primary hover:text-primary transition-all duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                  Office Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="text-foreground">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  Need Quick Help?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  For urgent matters, reach us directly via WhatsApp.
                </p>
                <Button variant="outline" className="w-full">
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
