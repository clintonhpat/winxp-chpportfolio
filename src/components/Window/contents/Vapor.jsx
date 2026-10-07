import React, { useState } from 'react';
import FlappyBird from './games/FlappyBird';
import SnakeGame from './games/SnakeGame';
import MinesweeperGame from './games/MinesweeperGame';
import './Vapor.css';

const GAMES = [
  {
    id: 'flappy',
    title: 'Flappy Pipe',
    description: 'Navigate through the pipes! Click or press Space to flap.',
    image: '🐦',
    developer: 'Vapor Studios',
    tags: ['Casual', 'Arcade'],
    component: FlappyBird,
  },
  {
    id: 'snake',
    title: 'Snake Classic',
    description: 'Eat food and grow longer. Don\'t hit the walls or yourself!',
    image: '🐍',
    developer: 'Vapor Studios',
    tags: ['Casual', 'Retro'],
    component: SnakeGame,
  },
  {
    id: 'minesweeper',
    title: 'Mine Finder',
    description: 'Find all the mines without clicking on them. Classic puzzle game.',
    image: '💣',
    developer: 'Vapor Studios',
    tags: ['Puzzle', 'Strategy'],
    component: MinesweeperGame,
  },
];

function Vapor() {
  const [currentView, setCurrentView] = useState('library'); // 'library' | 'store' | 'game'
  const [selectedGame, setSelectedGame] = useState(null);
  const [playingGame, setPlayingGame] = useState(null);
  const [installedGames, setInstalledGames] = useState(['flappy', 'snake', 'minesweeper']);

  const handlePlayGame = (game) => {
    setPlayingGame(game);
    setCurrentView('game');
  };

  const handleBackToLibrary = () => {
    setPlayingGame(null);
    setCurrentView('library');
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  // Render game view
  if (currentView === 'game' && playingGame) {
    const GameComponent = playingGame.component;
    return (
      <div className="vapor-game-view">
        <div className="vapor-game-header">
          <button className="vapor-back-btn" onClick={handleBackToLibrary}>
            ← Back to Library
          </button>
          <span className="vapor-game-title">{playingGame.title}</span>
        </div>
        <div className="vapor-game-container">
          <GameComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="vapor-container">
      {/* Sidebar */}
      <div className="vapor-sidebar">
        <div className="vapor-logo">
        <div className="vapor-logo-icon">
            <img 
            src={require('../../../assets/vapor-logo.png')} 
            alt="Vapor" 
            style={{ width: 40, height: 40, objectFit: 'contain' }}
            />
        </div>
        <span className="vapor-logo-text">VAPOR</span>
        </div>
        
        <nav className="vapor-nav">
          <button 
            className={`vapor-nav-item ${currentView === 'store' ? 'active' : ''}`}
            onClick={() => setCurrentView('store')}
          >
            <span className="nav-icon">🏪</span>
            <span>Store</span>
          </button>
          <button 
            className={`vapor-nav-item ${currentView === 'library' ? 'active' : ''}`}
            onClick={() => setCurrentView('library')}
          >
            <span className="nav-icon">📚</span>
            <span>Library</span>
          </button>
          <button className="vapor-nav-item">
            <span className="nav-icon">👥</span>
            <span>Community</span>
          </button>
          <button className="vapor-nav-item">
            <span className="nav-icon">👤</span>
            <span>Profile</span>
          </button>
        </nav>

        <div className="vapor-user">
          <div className="vapor-user-avatar">🎮</div>
          <div className="vapor-user-info">
            <span className="vapor-username">Player1</span>
            <span className="vapor-status">🟢 Online</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="vapor-main">
        {currentView === 'library' && (
          <>
            {/* Game List */}
            <div className="vapor-game-list">
              <div className="vapor-list-header">
                <span>GAMES</span>
                <span className="game-count">{installedGames.length}</span>
              </div>
              {GAMES.filter(g => installedGames.includes(g.id)).map((game) => (
                <button
                  key={game.id}
                  className={`vapor-game-item ${selectedGame?.id === game.id ? 'selected' : ''}`}
                  onClick={() => handleSelectGame(game)}
                  onDoubleClick={() => handlePlayGame(game)}
                >
                  <span className="game-icon">{game.image}</span>
                  <span className="game-name">{game.title}</span>
                </button>
              ))}
            </div>

            {/* Game Details */}
            <div className="vapor-game-details">
              {selectedGame ? (
                <>
                  <div className="game-hero">
                    <div className="game-hero-image">{selectedGame.image}</div>
                    <div className="game-hero-overlay">
                      <h1>{selectedGame.title}</h1>
                    </div>
                  </div>
                  <div className="game-info">
                    <div className="game-actions">
                      <button 
                        className="vapor-play-btn"
                        onClick={() => handlePlayGame(selectedGame)}
                      >
                        ▶ Play
                      </button>
                    </div>
                    <p className="game-description">{selectedGame.description}</p>
                    <div className="game-meta">
                      <span className="meta-item">
                        <strong>Developer:</strong> {selectedGame.developer}
                      </span>
                      <div className="game-tags">
                        {selectedGame.tags.map(tag => (
                          <span key={tag} className="game-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="no-game-selected">
                  <div className="no-game-icon">🎮</div>
                  <p>Select a game from your library</p>
                </div>
              )}
            </div>
          </>
        )}

        {currentView === 'store' && (
          <div className="vapor-store">
            <div className="store-header">
              <h1>Featured & Recommended</h1>
            </div>
            <div className="store-games">
              {GAMES.map((game) => (
                <div key={game.id} className="store-game-card">
                  <div className="store-game-image">{game.image}</div>
                  <div className="store-game-info">
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                    <div className="store-game-tags">
                      {game.tags.map(tag => (
                        <span key={tag} className="game-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="store-game-price">
                      <span className="price">Free to Play</span>
                      {installedGames.includes(game.id) ? (
                        <button className="store-btn installed">✓ In Library</button>
                      ) : (
                        <button 
                          className="store-btn"
                          onClick={() => setInstalledGames([...installedGames, game.id])}
                        >
                          Install
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vapor;