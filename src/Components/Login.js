import './Login.css';

import React, { useEffect, useState } from 'react';

const dummyUsers = [
  { username: 'John Doe', password: 'johndoe@123', role: 'Admin' },
  { username: 'Nick', password: 'Nick@123', role: 'User' },
  { username: 'Guest', password: 'guest@123', role: 'Guest' },
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');
  const [bgColor, setBgColor] = useState('#ffffff'); // Default background color
  const [textColor, setTextColor] = useState('#000000'); // Default text color

  // Update body styles on theme change
  useEffect(() => {
    document.body.style.backgroundColor = bgColor; // Change the body's background color
    document.body.style.color = textColor; // Change the body's text color
  }, [bgColor, textColor]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = dummyUsers.find((user) => user.username === username && user.password === password);
    
    if (user) {
      alert(`Welcome, ${user.role}!`);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme); // Update theme state
  };

  return (
    <div className={`login-container ${theme}`} style={{ backgroundColor: bgColor, color: textColor }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
      <button onClick={toggleTheme}>Toggle Theme</button>

      {/* Color Picker for Background Color */}
      <label>
        Background Color:
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </label>

      {/* Color Picker for Text Color */}
      <label>
        Text Color:
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </label>
    </div>
  );
};

export default Login;
