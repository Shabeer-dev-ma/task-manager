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
        <div className="flex items-center justify-center min-h-[400px] px-4">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Something went wrong</h2>
            <p className="text-sm text-slate-500 mb-5">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button onClick={this.handleReset} className="btn-primary px-5 py-2.5 text-sm">
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
