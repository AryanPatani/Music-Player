import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PlayerBar from './components/PlayerBar';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import AudioPlayer from './components/AudioPlayer';
import SearchView from './components/SearchView';
import PlaylistsView from './components/PlaylistsView';
import LibraryView from './components/LibraryView';

const RootLayout = () => {
  const activeView = useSelector((state) => state.ui.activeView);

  let content;
  switch (activeView) {
    case 'search':
      content = <SearchView />;
      break;
    case 'playlists':
      content = <PlaylistsView />;
      break;
    case 'library':
      content = <LibraryView />;
      break;
    default:
      content = <MainContent />;
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {content}
      </div>
      <PlayerBar />
      <AudioPlayer />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <RootLayout />
    </Provider>
  );
}

export default App;
