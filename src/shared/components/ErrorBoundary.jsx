import { Component } from 'react'

// Error Boundary must be a class component — React doesn't support
// functional error boundaries yet (hooks can't catch render errors).
//
// Usage:
//   <ErrorBoundary>
//     <SomeComponentThatMightCrash />
//   </ErrorBoundary>
//
// Optional fallback prop:
//   <ErrorBoundary fallback={<p>Custom error UI</p>}>

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // In production you'd send this to a logging service (Sentry, Datadog, etc.)
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p style={{ color: '#888', marginBottom: '1rem' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button onClick={this.handleReset}>Try again</button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
