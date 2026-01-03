import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin } from 'lucide-react';

const socialIcons = [
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Youtube, href: '#' },
];

const footerLinks = [
  ['FAQ', 'Investor Relations', 'Privacy', 'Speed Test'],
  ['Help Center', 'Jobs', 'Cookie Preferences', 'Legal Notices'],
  ['Account', 'Redeem Gift Cards', 'Corporate Information', 'Only on نتفلكس'],
  ['Media Center', 'Ways to Watch', 'Terms of Use', 'Contact Us'],
];

const Footer = () => {
  return (
    <footer className="bg-black py-12 md:py-24 text-gray-400 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Social Media Links */}
        <div className="flex space-x-6 mb-8">
          {socialIcons.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition duration-200"
            >
              <item.icon size={24} />
            </a>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
          {footerLinks.map((column, colIndex) => (
            <ul key={colIndex} className="space-y-3">
              {column.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href="#"
                    className="hover:underline text-gray-400 transition duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Service Code and Copyright */}
        <div className="pt-4 space-y-4">
          
          {/* Service Code Button */}
          <button className="text-sm border border-gray-400 py-1.5 px-3 hover:text-white transition duration-200">
            Service Code
          </button>

          {/* Location and Copyright */}
          <div className="text-xs space-y-1">
            <div className="flex items-center space-x-1">
                <MapPin size={14} className="inline-block" />
                <span>
                    نتفلكس MENA
                </span>
            </div>
            <p>
              &copy; {new Date().getFullYear()} نتفلكس, Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;