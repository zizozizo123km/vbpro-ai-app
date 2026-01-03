import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'TV Shows', href: '/tv' },
    { name: 'Movies', href: '/movies' },
    { name: 'New & Popular', href: '/latest' },
    { name: 'My List', href: '/list' },
];

/**
 * Modern Netflix-style header component.
 * Features: Sticky position, dynamic background on scroll, navigation, and user icons.
 */
function Header() {
    // State to handle header background change on scroll (transparent to black)
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Change background after scrolling 50px
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Tailwind classes for the header container
    const headerClasses = `
        fixed top-0 z-50 w-full px-4 md:px-12 transition duration-300
        ${scrolled 
            ? 'bg-black shadow-lg' 
            : 'bg-gradient-to-b from-black/70 to-transparent'
        }
    `;

    return (
        <header className={headerClasses}>
            <div className="flex items-center justify-between h-[68px]">

                {/* Left Section: Logo and Primary Navigation */}
                <div className="flex items-center space-x-8">
                    
                    {/* Logo (Using text placeholder) */}
                    <a href="/" className="text-red-600 text-4xl font-extrabold tracking-wider select-none">
                        NETFLIX
                    </a>

                    {/* Navigation Links (Desktop Only) */}
                    <nav className="hidden lg:block">
                        <ul className="flex space-x-6 text-sm">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href} 
                                        // Highlight 'Home' by default for demonstration
                                        className={`
                                            ${link.name === 'Home' ? 'font-bold' : 'font-normal text-gray-300'}
                                            text-white hover:text-gray-300 transition duration-150 cursor-pointer
                                        `}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Browse Menu Toggle */}
                    <button className="lg:hidden text-white flex items-center space-x-1 text-sm font-medium hover:text-gray-300 transition">
                        <span>Browse</span>
                        <ChevronDown size={18} className="transition duration-300" />
                    </button>
                </div>

                {/* Right Section: Icons and Profile */}
                <div className="flex items-center space-x-4 md:space-x-6 text-white">
                    
                    {/* Search Icon/Toggle */}
                    <button aria-label="Search" className="hover:text-gray-300 transition">
                        <Search size={24} />
                    </button>

                    {/* Kids Link (Visible on medium screens and up) */}
                    <span className="hidden md:block text-sm cursor-pointer hover:text-gray-300 transition">
                        Kids
                    </span>

                    {/* Notifications Icon */}
                    <button aria-label="Notifications" className="hover:text-gray-300 transition relative">
                        {/* Notification Dot */}
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-black bg-red-600"></span>
                        <Bell size={24} />
                    </button>

                    {/* Profile Dropdown */}
                    <div className="flex items-center group relative">
                        <img 
                            // Use a standard small avatar size
                            src="https://picsum.photos/32/32?random=profile" 
                            alt="User Profile" 
                            className="w-8 h-8 rounded cursor-pointer object-cover" 
                        />
                        {/* Chevron for the dropdown indicator */}
                        <ChevronDown size={16} className="ml-1 transition duration-200 group-hover:rotate-180 cursor-pointer" />
                    </div>

                </div>

            </div>
        </header>
    );
}

export default Header;