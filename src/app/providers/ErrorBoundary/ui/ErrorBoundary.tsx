import React, { ErrorInfo, ReactNode, Suspense } from 'react';
// import { withTranslation } from 'react-i18next';
import { PageError } from 'widgets/PageError';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: ReactNode;
}

class ErrorBoundary
    extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            // You can render any custom fallback UI
            // eslint-disable-next-line i18next/no-literal-string
            return <Suspense fallback=""><PageError /></Suspense>;
        }

        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{children}</>;
    }
}

// export default withTranslation()(ErrorBoundary);
export default ErrorBoundary;
