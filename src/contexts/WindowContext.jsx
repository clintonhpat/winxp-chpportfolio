import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Window state management using reducer pattern for clean state updates
const WindowContext = createContext(null);

// Action types for window operations
const ACTIONS = {
  OPEN_WINDOW: 'OPEN_WINDOW',
  CLOSE_WINDOW: 'CLOSE_WINDOW',
  MINIMIZE_WINDOW: 'MINIMIZE_WINDOW',
  MAXIMIZE_WINDOW: 'MAXIMIZE_WINDOW',
  RESTORE_WINDOW: 'RESTORE_WINDOW',
  FOCUS_WINDOW: 'FOCUS_WINDOW',
  UPDATE_POSITION: 'UPDATE_POSITION',
  UPDATE_SIZE: 'UPDATE_SIZE',
};

// Initial state
const initialState = {
  windows: {},
  windowOrder: [], // z-index ordering
  activeWindowId: null,
  nextZIndex: 100,
};

// Reducer for window state management
function windowReducer(state, action) {
  switch (action.type) {
    case ACTIONS.OPEN_WINDOW: {
      const { id, windowConfig } = action.payload;
      
      // If window already exists, just focus it
      if (state.windows[id]) {
        const newOrder = state.windowOrder.filter(wId => wId !== id);
        return {
          ...state,
          windows: {
            ...state.windows,
            [id]: { ...state.windows[id], isMinimized: false },
          },
          windowOrder: [...newOrder, id],
          activeWindowId: id,
          nextZIndex: state.nextZIndex + 1,
        };
      }

      // Create new window
      const newWindow = {
        id,
        title: windowConfig.title || 'Untitled',
        icon: windowConfig.icon || 'folder',
        content: windowConfig.content,
        position: windowConfig.position || { x: 50 + Object.keys(state.windows).length * 30, y: 50 + Object.keys(state.windows).length * 30 },
        size: windowConfig.size || { width: 600, height: 400 },
        minSize: windowConfig.minSize || { width: 300, height: 200 },
        isMinimized: false,
        isMaximized: false,
        zIndex: state.nextZIndex,
        previousState: null, // For restore after maximize
      };

      return {
        ...state,
        windows: { ...state.windows, [id]: newWindow },
        windowOrder: [...state.windowOrder, id],
        activeWindowId: id,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case ACTIONS.CLOSE_WINDOW: {
      const { id } = action.payload;
      const { [id]: removed, ...remainingWindows } = state.windows;
      const newOrder = state.windowOrder.filter(wId => wId !== id);
      
      return {
        ...state,
        windows: remainingWindows,
        windowOrder: newOrder,
        activeWindowId: newOrder.length > 0 ? newOrder[newOrder.length - 1] : null,
      };
    }

    case ACTIONS.MINIMIZE_WINDOW: {
      const { id } = action.payload;
      const newOrder = state.windowOrder.filter(wId => wId !== id);
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: true },
        },
        windowOrder: newOrder,
        activeWindowId: newOrder.length > 0 ? newOrder[newOrder.length - 1] : null,
      };
    }

    case ACTIONS.MAXIMIZE_WINDOW: {
      const { id } = action.payload;
      const window = state.windows[id];
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            isMaximized: true,
            previousState: {
              position: window.position,
              size: window.size,
            },
          },
        },
      };
    }

    case ACTIONS.RESTORE_WINDOW: {
      const { id } = action.payload;
      const window = state.windows[id];
      
      if (window.isMinimized) {
        const newOrder = state.windowOrder.filter(wId => wId !== id);
        return {
          ...state,
          windows: {
            ...state.windows,
            [id]: { ...window, isMinimized: false },
          },
          windowOrder: [...newOrder, id],
          activeWindowId: id,
          nextZIndex: state.nextZIndex + 1,
        };
      }
      
      if (window.isMaximized && window.previousState) {
        return {
          ...state,
          windows: {
            ...state.windows,
            [id]: {
              ...window,
              isMaximized: false,
              position: window.previousState.position,
              size: window.previousState.size,
              previousState: null,
            },
          },
        };
      }
      
      return state;
    }

    case ACTIONS.FOCUS_WINDOW: {
      const { id } = action.payload;
      if (!state.windows[id] || state.windows[id].isMinimized) return state;
      
      const newOrder = state.windowOrder.filter(wId => wId !== id);
      
      return {
        ...state,
        windowOrder: [...newOrder, id],
        activeWindowId: id,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case ACTIONS.UPDATE_POSITION: {
      const { id, position } = action.payload;
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], position },
        },
      };
    }

    case ACTIONS.UPDATE_SIZE: {
      const { id, size } = action.payload;
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], size },
        },
      };
    }

    default:
      return state;
  }
}

// Provider component
export function WindowProvider({ children }) {
  const [state, dispatch] = useReducer(windowReducer, initialState);

  const openWindow = useCallback((id, windowConfig) => {
    dispatch({ type: ACTIONS.OPEN_WINDOW, payload: { id, windowConfig } });
  }, []);

  const closeWindow = useCallback((id) => {
    dispatch({ type: ACTIONS.CLOSE_WINDOW, payload: { id } });
  }, []);

  const minimizeWindow = useCallback((id) => {
    dispatch({ type: ACTIONS.MINIMIZE_WINDOW, payload: { id } });
  }, []);

  const maximizeWindow = useCallback((id) => {
    dispatch({ type: ACTIONS.MAXIMIZE_WINDOW, payload: { id } });
  }, []);

  const restoreWindow = useCallback((id) => {
    dispatch({ type: ACTIONS.RESTORE_WINDOW, payload: { id } });
  }, []);

  const focusWindow = useCallback((id) => {
    dispatch({ type: ACTIONS.FOCUS_WINDOW, payload: { id } });
  }, []);

  const updatePosition = useCallback((id, position) => {
    dispatch({ type: ACTIONS.UPDATE_POSITION, payload: { id, position } });
  }, []);

  const updateSize = useCallback((id, size) => {
    dispatch({ type: ACTIONS.UPDATE_SIZE, payload: { id, size } });
  }, []);

  const value = {
    ...state,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updatePosition,
    updateSize,
  };

  return (
    <WindowContext.Provider value={value}>
      {children}
    </WindowContext.Provider>
  );
}

// Custom hook for consuming window context
export function useWindowManager() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowProvider');
  }
  return context;
}

export default WindowContext;
