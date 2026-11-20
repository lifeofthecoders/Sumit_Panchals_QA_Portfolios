import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/site';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Certifications", href: "#research", id: "research" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="site-header">
      <div className="container nav-container">
        <a href="#" className="nav-brand" aria-label="Sumit Panchal Home">
          <div className="brand-monogram">SP</div>
          <div>
            <span className="brand-text">{siteConfig.identity.fullName}</span>
            <span className="brand-sub">{siteConfig.identity.profession}</span>
          </div>
        </a>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a
            href={siteConfig.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
          >
            LinkedIn <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}