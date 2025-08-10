import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, UserPlus, LogIn } from 'lucide-react';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName);
      }
      
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    
    setLoading(false);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">
            {isLogin ? 'Sign in to your account' : 'Create new account'}
          </h2>
          <p className="login-subtitle">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="login-toggle"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          
          {!isLogin && (
            <div className="form-field">
              <label htmlFor="displayName">
                Display Name
              </label>
              <div className="input-with-icon">
                <User className="input-icon" />
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  required={!isLogin}
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <div className="form-field">
            <label htmlFor="email">
              Email address
            </label>
            <div className="input-with-icon">
              <Mail className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-field">
            <label htmlFor="password">
              Password
            </label>
            <div className="input-with-icon">
              <Lock className="input-icon" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {isLogin ? (
                <LogIn className="button-icon" />
              ) : (
                <UserPlus className="button-icon" />
              )}
              {loading ? 'Loading...' : (isLogin ? 'Sign in' : 'Sign up')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
