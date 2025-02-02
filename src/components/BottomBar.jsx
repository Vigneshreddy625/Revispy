import React from 'react';
import { Home, ShoppingBag, Tag, BarChart2, Grid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomBar = () => {
  const [active, setActive] = React.useState('home');
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'sale', icon: Tag, label: 'Sale' },
    { id: 'categories', icon: Grid, label: 'Categories' },
    { id: 'trending', icon: BarChart2, label: 'Trending' },
    { id: 'cart', icon: ShoppingBag, label: 'Bag' }
  ];

  const handleClick = (id) => {
    navigate(`/${id}`);
    setActive(id);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-600 px-2 py-1 shadow-lg">
      <nav className="max-w-lg mx-auto">
        <ul className="flex items-center justify-between">
          {navItems.map(({ id, icon: Icon, label }) => (
            <li key={id} className="flex-1">
              <button
                onClick={() => handleClick(id)}
                className={`w-full flex flex-col items-center py-2 px-1 space-y-1 transition-colors
                  ${active === id 
                    ? 'text-blue-600' 
                    : 'text-gray-600 dark:text-white hover:text-blue-500'}`}
              >
                <Icon size={20} className={`${active === id ? 'animate-bounce' : ''}`} />
                <span className="text-xs font-medium truncate">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BottomBar;