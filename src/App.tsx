import Dogs from "./components/dogs/Dogs";
import ReactQueryProvider from "./lib/ReactQueryProvider";
import { ErrorBoundary } from "react-error-boundary";
import DogImagesProvider from "./components/context/DogImagesProvider";

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary} type="button">
        Try again
      </button>
    </div>
  );
}

export default function App() {
  const logError = (error: any, errorInfo: any) => {
    console.log({ error, errorInfo });
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <ReactQueryProvider>
        <DogImagesProvider>
          <div className="app">
            <Dogs />
          </div>
        </DogImagesProvider>
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}
