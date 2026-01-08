import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import eccaLogo from "@/assets/ecca-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={eccaLogo} 
                alt="ECCA Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover group-hover:shadow-glow-green transition-all duration-300"
              />
              <div>
                <span className="font-display font-bold text-lg sm:text-xl text-foreground">ECCA</span>
                <span className="text-xs sm:text-sm text-primary block -mt-1">Ni Home</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Empowering Embu County youth through unity, leadership, and community development.
            </p>
            <p className="text-xs text-primary font-medium italic">
              "Growth, Unity, Loyalty Above All Else"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Activities", "Leadership", "Events", "Join"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm block py-1"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Embu County, Kenya</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="break-all">info@ecca.co.ke</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>+254 700 000 000</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="https://www.facebook.com/ECCA014/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
            <p className="mt-3 sm:mt-4 text-xs text-muted-foreground">
              Join our community and stay updated with ECCA activities.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Embu County Comrades Association. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Built with <span className="text-primary">♥</span> for the community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
