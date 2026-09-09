import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CRITICAL REACT ERROR:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 40,
            color: '#ff5555',
            background: '#0a0a0a',
            minHeight: '100vh',
            fontFamily: 'monospace',
          }}
        >
          <h1 style={{ color: '#F5941E' }}>Application Runtime Error Caught</h1>
          <pre
            style={{
              background: '#111',
              padding: 20,
              borderRadius: 8,
              whiteSpace: 'pre-wrap',
            }}
          >
            {this.state.error?.toString()}
          </pre>
          <pre
            style={{
              background: '#111',
              padding: 20,
              borderRadius: 8,
              whiteSpace: 'pre-wrap',
              color: '#888',
            }}
          >
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

window.addEventListener('error', (e) => {
  console.error('GLOBAL WINDOW ERROR:', e);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
