import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>很抱歉，出現了一些問題</h2>
          <button onClick={() => window.location.reload()}>重新整理頁面</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
