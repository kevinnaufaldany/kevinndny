import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface NavbarProps {
  isCaseStudy?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isCaseStudy = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work', count: '06' },
    { name: 'Service', href: '#services', count: '04' },
    { name: 'Experience', href: '#experience', count: '05' },
    { name: 'Certifications', href: '#certifications', count: '01' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-8",
        isScrolled 
          ? "py-3.5 bg-white/85 backdrop-blur-md border-b border-brand-border/80 shadow-subtle" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Badge or Back button */}
        <div className="flex items-center gap-4">
          {isCaseStudy ? (
            <Link to="/">
              <Button variant="white" showArrow={false} className="gap-2">
                <span>← Back</span>
              </Button>
            </Link>
          ) : (
            <Badge />
          )}
        </div>

        {/* Center: Desktop Nav Links */}
        {!isCaseStudy && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-secondary">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-brand-primary transition-colors duration-200 tracking-tight flex items-center gap-1.5 py-1"
              >
                <span>{link.name}</span>
                {link.count && (
                  <span className="text-xs text-brand-secondary/60 font-mono font-normal">
                    [{link.count}]
                  </span>
                )}
              </a>
            ))}
          </nav>
        )}

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button 
            asAnchor 
            href="#contact"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            Let's Talk
          </Button>

          {!isCaseStudy && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-brand-border text-brand-dark bg-white shadow-subtle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Slide-down Overlay */}
      {mobileMenuOpen && !isCaseStudy && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-brand-border p-6 shadow-card animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-brand-dark hover:text-black flex items-center justify-between py-2 border-b border-zinc-100"
              >
                <span>{link.name}</span>
                {link.count && (
                  <span className="text-xs text-brand-secondary font-mono">[{link.count}]</span>
                )}
              </a>
            ))}
            <div className="pt-2">
              <Button 
                asAnchor 
                href="#contact"
                variant="primary"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let's Talk
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
