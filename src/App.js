import React, { useState, useCallback } from 'react';
import { Search, Bell, ChevronDown, Play, Info, Menu, X } from 'lucide-react';

// --- Dummy Data Simulation ---
const DUMMY_MOVIES = [
  { id: 1, title: 'The Silent Watchman', imageUrl: 'https://picsum.photos/300/170?random=1' },
  { id: 2, title: 'Echoes of Tomorrow', imageUrl: 'https://picsum.photos/300/170?random=2' },
  { id: 3, title: 'Midnight Run', imageUrl: 'https://picsum.photos/300/170?random=3' },
  { id: 4, title: 'Desert Storm', imageUrl: 'https://picsum.photos/300/170?random=4' },
  { id: 5, title: 'Galactic Drift', imageUrl: 'https://picsum.photos/300/170?random=5' },
  { id: 6, title: 'Code Breaker', imageUrl: 'https://picsum.photos/300/170?random=6' },
  { id: 7, title: 'Lost Signal', imageUrl: 'https://picsum.photos/300/170?random=7' },
  { id: 8, title: 'The Architect', imageUrl: 'https://picsum.photos/300/170?random=8' },
];

const FEATURED_MOVIE = {
  title: "The Silent Watchman",
  description: "A former spy must return to the field after his daughter is kidnapped by an organization he thought he had dismantled years ago. Action and suspense guaranteed.",
  genre: "Action Thriller",
  year: 2023,
  // Using a placeholder image URL that represents a cinematic backdrop
  backdropUrl: 'https://images.unsplash.com/photo-154220419213825-78e8b61e27a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
};

const DUMMY_ROWS = [
  { title: "Trending Now", items: DUMMY_MOVIES },
  { title: "Watch It Again", items: DUMMY_MOVIES.slice(2).concat(DUMMY_MOVIES.slice(0, 2)) },
  { title: "New Releases", items: DUMMY_MOVIES.reverse() },
  { title: "Action Thrillers", items: DUMMY_MOVIES.slice(3) },
];

// --- Sub-Components ---

/**
 * Navigation item optimized for the Netflix style header.
 */
const NavItem = ({ label, active = false }) => (
  <div className={`cursor-pointer transition duration-300 hover:text-gray-300 ${active ? 'font-bold text-white' : 'text-gray-400'}`}>
    {label}
  </div>
);

/**
 * Renders a single, clickable movie card within a row.
 */
const MovieCard = ({ movie }) => (
  <div className="group bg-zinc-900 col-span relative h-[12vw] min-w-[300px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] mr-2">
    <img
      src={movie.imageUrl}
      alt={movie.title}
      className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
    />
    <div className="absolute top-0 opacity-0 transition duration-300 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
      />
      <div className="z-10 bg-zinc-800 p-3 absolute w-full transition shadow-md rounded-b-md">
        <p className="text-green-400 font-semibold mt-2">
          New <span className="text-white ml-2 text-sm">2023</span>
        </p>
        <div className="flex flex-row items-center gap-2 mt-2">
          <p className="text-white text-xs">{movie.title}</p>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Horizontal row component for displaying a list of movies.
 */
const MovieRow = ({ title, items }) => {
  const scrollRef = React.useRef(null);

  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const amount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollLeft + amount, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="px-4 md:px-8 mt-12 mb-8">
      <p className="text-white text-xl md:text-2xl lg:text-3xl font-semibold mb-4 hover:text-gray-300 cursor-pointer transition">
        {title}
      </p>
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-2 transition duration-500 ease-in-out"
        >
          {items.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {/* Scroll Buttons (Hidden until hover) */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 z-20 hidden group-hover:flex items-center justify-center h-[12vw] transition duration-300 rounded-r-md"
          aria-label="Scroll left"
        >
          &lt;
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 z-20 hidden group-hover:flex items-center justify-center h-[12vw] transition duration-300 rounded-l-md"
          aria-label="Scroll right"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

/**
 * Large featured content section (Hero).
 */
const Billboard = ({ movie }) => (
  <div className="relative h-[56.25vw]">
    <div
      className="w-full h-[56.25vw] bg-cover bg-center"
      style={{ backgroundImage: `url(${movie.backdropUrl})` }}
    >
      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-transparent"></div>
    </div>

    <div className="absolute top-[30%] ml-4 md:ml-16">
      <p className="text-white text-3xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
        {movie.title}
      </p>
      <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
        {movie.description}
      </p>
      <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
        <button
          className="bg-white text-black text-xs md:text-lg font-semibold flex items-center py-2 px-3 md:py-3 md:px-6 rounded-md hover:bg-opacity-80 transition"
        >
          <Play className="w-4 md:w-7 mr-1" />
          Play
        </button>
        <button
          className="bg-white bg-opacity-30 text-white text-xs md:text-lg font-semibold flex items-center py-2 px-3 md:py-3 md:px-6 rounded-md hover:bg-opacity-20 transition"
        >
          <Info className="w-4 md:w-7 mr-1" />
          More Info
        </button>
      </div>
    </div>
  </div>
);

/**
 * Top navigation bar (Header).
 */
const Header = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const TOP_OFFSET = 66;

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className={`fixed w-full z-40 transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : 'bg-transparent'}`}>
      <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500">
        <img src="/netflix_logo.png" className="h-4 lg:h-7" alt="Logo" />
        
        {/* Desktop Navigation */}
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavItem label="Home" active />
          <NavItem label="Series" />
          <NavItem label="Films" />
          <NavItem label="New & Popular" />
          <NavItem label="My List" />
          <NavItem label="Browse by Languages" />
        </div>

        {/* Mobile Menu Toggle */}
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <ChevronDown className={`w-4 text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
        </div>
        
        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="bg-black w-56 absolute top-[60px] left-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-4 px-3">
              <NavItem label="Home" active />
              <NavItem label="Series" />
              <NavItem label="Films" />
              <NavItem label="New & Popular" />
              <NavItem label="My List" />
              <NavItem label="Browse by Languages" />
            </div>
          </div>
        )}

        {/* Right Side Icons */}
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <Search className="w-6" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <Bell className="w-6" />
          </div>
          
          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/user_avatar.png" alt="Profile" className='w-full h-full object-cover' />
            </div>
            <ChevronDown className="w-4 text-white transition rotate-0 hover:rotate-180" /> 
            {/* Real implementation would use a dropdown component here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

/**
 * Main application component for Netflix Clone (نتفلكس).
 */
const App = () => {
  // Ensure the body/html has a dark background for the full Netflix experience
  React.useEffect(() => {
    document.body.classList.add('bg-black');
    document.documentElement.classList.add('bg-black');
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main>
        {/* Hero Section */}
        <Billboard movie={FEATURED_MOVIE} />
        
        <div className="pb-40">
          {/* Content Rows */}
          {DUMMY_ROWS.map((row, index) => (
            <div key={index} className={index === 0 ? 'mt-[-8vw]' : ''}>
              <MovieRow title={row.title} items={row.items} />
            </div>
          ))}
        </div>
      </main>

      {/* Basic Footer Placeholder */}
      <footer className="py-10 bg-zinc-900 mt-10">
        <div className="max-w-7xl mx-auto px-4 md:px-16 text-gray-400 text-sm">
          <div className="flex space-x-4 mb-4">
            {/* Social Icons Placeholder */}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Audio Description', 'Help Center', 'Gift Cards', 'Media Center', 'Investor Relations', 'Legal Notices', 'Privacy', 'Contact Us'].map((item, i) => (
              <p key={i} className="hover:underline cursor-pointer">{item}</p>
            ))}
          </div>
          <button className="mt-6 border border-gray-500 py-2 px-4 text-xs hover:text-white transition">
            Service Code
          </button>
          <p className="mt-4 text-xs">© 1997-{new Date().getFullYear()} نتفلكس, Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;