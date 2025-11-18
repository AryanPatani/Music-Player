import React from 'react';
import { Home, Search, Library, Music } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveView } from '../store/uiSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeView = useSelector((state) => state.ui.activeView);
  const currentUser = useSelector((state) => state.user.currentUser);

  const navItemClasses = (view) =>
    `flex items-center gap-3 text-sm font-medium px-3 py-2 rounded-md cursor-pointer transition-colors ${
      activeView === view
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:text-white hover:bg-gray-900'
    }`;

  return (
    <div className="w-64 bg-black p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Music className="w-8 h-8 text-green-500" />
        <span className="text-2xl font-bold">MusicStream</span>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <button
              type="button"
              className={navItemClasses('home')}
              onClick={() => dispatch(setActiveView('home'))}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={navItemClasses('search')}
              onClick={() => dispatch(setActiveView('search'))}
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={navItemClasses('library')}
              onClick={() => dispatch(setActiveView('library'))}
            >
              <Library className="w-5 h-5" />
              <span>Library</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={navItemClasses('playlists')}
              onClick={() => dispatch(setActiveView('playlists'))}
            >
              <Library className="w-5 h-5" />
              <span>Playlists</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="border-t border-gray-800 pt-6 mt-4">
        {currentUser && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center text-sm font-semibold">
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{currentUser.name?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div>
              <p className="text-sm text-white">{currentUser.name}</p>
              <p className="text-xs text-gray-400">Logged in</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
