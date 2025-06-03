import React, { useState, useContext, createContext } from 'react';
import './RecipeHubMain.css';

// PUBLIC_INTERFACE
const ThemeContext = createContext();

/**
 * Themes: Light and Dark, following the provided color palette.
 */
const themes = {
  light: {
    '--primary': '#FF7043',
    '--secondary': '#FFF3E0',
    '--accent': '#388E3C',
    '--background': '#FFF6F0',
    '--text': '#2A1E13',
    '--cardBg': '#FFFFFF',
    '--cardShadow': 'rgba(255,150,92,0.16)',
    '--navBg': '#FFF6F0',
    '--navbarShadow': '0 4px 16px 0 rgba(255,112,67,0.10)',
    '--searchBg': '#FFF3E0',
  },
  dark: {
    '--primary': '#FF7043',
    '--secondary': '#1F130A',
    '--accent': '#388E3C',
    '--background': '#1A1210',
    '--text': '#FFF3E0',
    '--cardBg': '#231813',
    '--cardShadow': 'rgba(255,150,92,0.10)',
    '--navBg': '#231813',
    '--navbarShadow': '0 4px 16px 0 rgba(255,112,67,0.06)',
    '--searchBg': '#2A1E13',
  }
};

// PUBLIC_INTERFACE
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const value = { theme, setTheme };

  React.useEffect(() => {
    const vars = themes[theme];
    Object.keys(vars).forEach((key) => {
      document.documentElement.style.setProperty(key, vars[key]);
    });
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
function useTheme() {
  return useContext(ThemeContext);
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="theme-switcher"
      aria-label="Switch Theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '🌞' : '🌚'}
    </button>
  );
}

// PUBLIC_INTERFACE
function RecipeHubMain() {
  return (
    <ThemeProvider>
      <MainContainer />
    </ThemeProvider>
  );
}

/** Skeuomorphic styled navbar with title and theme switch */
function Navbar() {
  return (
    <nav className="rh-navbar skeuo-surface rh-navbar-shadow">
      <span className="rh-logo">
        <img
          src="https://img.icons8.com/fluency/48/chef-hat.png"
          alt="RecipeHub logo"
          style={{width: 32, height: 32, marginRight: 8}}
        />
        RecipeHub
      </span>
      <ThemeSwitcher />
    </nav>
  );
}

/** Search bar on top */
function SearchBar() {
  return (
    <div className="rh-search skeuo-surface">
      <input className="rh-search-input" placeholder="Search recipes, ingredients..." />
      <span className="rh-search-icon" role="img" aria-label="search">🔍</span>
    </div>
  );
}

/** Featured recipes carousel MOCK */
function FeaturedRecipesCarousel() {
  // Using static mock images (free, attribution-friendly)
  const recipes = [
    { title: 'Classic Pancakes', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    { title: 'Fresh Salad Bowl', img: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' },
    { title: 'Spaghetti Supreme', img: 'https://images.unsplash.com/photo-1502741126161-b048400d0152?auto=format&fit=crop&w=400&q=80' },
    { title: 'Berry Parfait', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80' }
  ];
  return (
    <div className="rh-carousel skeuo-surface">
      <div className="rh-carousel-strip">
        {recipes.map((r, idx) => (
          <div key={idx} className="rh-carousel-item skeuo-btn">
            <img src={r.img} alt={r.title} />
            <div className="rh-carousel-title">{r.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Recipe categories MOCK */
function CategoriesCards() {
  const cats = [
    { name: 'Breakfast', img: 'https://img.icons8.com/color/96/000000/breakfast.png' },
    { name: 'Lunch', img: 'https://img.icons8.com/color/96/000000/salad.png' },
    { name: 'Dinner', img: 'https://img.icons8.com/color/96/000000/spaghetti.png' },
    { name: 'Dessert', img: 'https://img.icons8.com/color/96/000000/cake.png' },
    { name: 'Drinks', img: 'https://img.icons8.com/color/96/000000/smoothie.png' },
    { name: 'Soups', img: 'https://img.icons8.com/color/96/000000/soup-plate.png' }
  ];
  return (
    <div className="rh-categories skeuo-surface">
      {cats.map(category => (
        <div className="rh-category-card skeuo-btn" key={category.name}>
          <img src={category.img} alt={category.name} width="54" height="54" />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
}

/** Bottom navigation bar */
function BottomNav() {
  const tabs = [
    { icon: '🏠', label: 'Home' },
    { icon: '🔎', label: 'Search' },
    { icon: '❤️', label: 'Favorites' },
    { icon: '👤', label: 'Profile' }
  ];
  return (
    <nav className="rh-bottomnav skeuo-surface rh-bottomnav-shadow">
      {tabs.map(tab => (
        <button className="rh-bottomnav-item skeuo-btn" key={tab.label}>
          <span className="rh-bottomnav-icon">{tab.icon}</span>
          <span className="rh-bottomnav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

/** Main container holding full layout */
function MainContainer() {
  return (
    <div className="rh-root skeuo-bg">
      <Navbar />
      <main className="rh-content">
        <SearchBar />
        <FeaturedRecipesCarousel />
        <CategoriesCards />
      </main>
      <BottomNav />
    </div>
  );
}

export default RecipeHubMain;
