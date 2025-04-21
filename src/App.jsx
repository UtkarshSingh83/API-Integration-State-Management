import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage, receiveMessage } from './redux/chatSlice';
import { login, logout } from './redux/userSlice';
import { toggleTheme, toggleAccessibleMode, setNetworkStatus } from './redux/uiSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector(state => state.chat);
  const { isAuthenticated, username } = useSelector(state => state.user);
  const { theme, accessibleMode, isOffline } = useSelector(state => state.ui);

  useEffect(() => {
    dispatch(fetchMessages());
    const handleConnectionChange = () => dispatch(setNetworkStatus(!navigator.onLine));
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [dispatch]);

  const handleLogin = () => dispatch(login('User123'));
  const handleLogout = () => dispatch(logout());

  const handleSend = () => {
    const newMessage = { id: Date.now(), user: username, text: "New Message!" };
    dispatch(sendMessage(newMessage));
    setTimeout(() => dispatch(receiveMessage({ id: Date.now(), user: "Bot", text: "Got your message!" })), 1000);
  };

  return (
    <div className={`App ${theme} ${accessibleMode ? 'accessible' : ''}`}>
      {isOffline && <div className="alert">⚠️ You're offline. Changes will sync once you're back online.</div>}

      {!isAuthenticated ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleSend}>Send Message</button>
        </>
      )}

      <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
      <button onClick={() => dispatch(toggleAccessibleMode())}>Toggle Accessibility</button>

      {loading ? (
        <div className="skeleton">Loading messages...</div>
      ) : error ? (
        <div className="error">Failed to load messages. <button onClick={() => dispatch(fetchMessages())}>Retry</button></div>
      ) : (
        <ul>
          {messages.map(msg => <li key={msg.id}><strong>{msg.user}:</strong> {msg.text}</li>)}
        </ul>
      )}
    </div>
  );
}

export default App;
