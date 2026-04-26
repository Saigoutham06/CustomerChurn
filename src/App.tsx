import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { predictML, type MLPredictionResponse } from './api';
import { EmptyState } from './components/EmptyState';
import { FileUploader } from './components/FileUploader';
import { ErrorAlert } from './components/ErrorAlert';
import { ResultsHeader } from './components/ResultsHeader';
import { MetricsGrid } from './components/MetricsGrid';
import { PredictionChart } from './components/PredictionChart';
import { PredictionsTable } from './components/PredictionsTable';
import { DebugConsole } from './components/DebugConsole';

interface AppState {
  file: File | null;
  loading: boolean;
  result: MLPredictionResponse | null;
  error: string | null;
}

function App() {
  const [state, setState] = useState<AppState>({
    file: null,
    loading: false,
    result: null,
    error: null,
  });

  const handleFileSelect = async (file: File) => {
    setState({ file, loading: true, result: null, error: null });

    try {
      const result = await predictML(file);
      setState({ file, loading: false, result, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setState({ file: null, loading: false, result: null, error: errorMessage });
    }
  };

  const handleReset = () => {
    setState({ file: null, loading: false, result: null, error: null });
  };

  const handleDismissError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const handleRetryError = () => {
    handleFileSelect(state.file!);
  };

  if (state.loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Loader className="w-12 h-12 text-cyan-400 animate-spin" />
        </motion.div>
        <p className="mt-4 text-slate-300 text-lg font-medium">Processing file...</p>
      </div>
    );
  }

  if (!state.result && !state.error && !state.file) {
    return <EmptyState onFileSelect={handleFileSelect} isLoading={state.loading} />;
  }

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {state.error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <ErrorAlert
                message={state.error}
                onDismiss={handleDismissError}
                onRetry={handleRetryError}
              />
            </motion.div>
          ) : state.result ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <ResultsHeader
                modelUsed={state.result.model_used}
                problemType={state.result.problem_type}
                onReset={handleReset}
              />

              <MetricsGrid metrics={state.result.metrics} />

              {state.result.plot_data && (
                <PredictionChart plotData={state.result.plot_data} />
              )}

              <PredictionsTable predictions={state.result.predictions} />

              <DebugConsole debugInfo={state.result.debug} />
            </motion.div>
          ) : (
            <motion.div
              key="uploader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[60vh]"
            >
              <div className="w-full max-w-2xl">
                <FileUploader onFileSelect={handleFileSelect} isLoading={state.loading} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
