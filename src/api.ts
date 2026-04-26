export interface Metrics {
  rmse: number | null;
  accuracy: number | null;
  aic: number | null;
}

export interface PlotData {
  x: (string | number)[];
  y: (string | number)[];
}

export interface DebugInfo {
  pipeline_selected: string;
  columns: string[];
}

export interface MLPredictionResponse {
  status: string;
  model_used: string;
  problem_type: string;
  predictions: (string | number)[] | Record<string, unknown>[];
  metrics: Metrics;
  plot_data: PlotData | null;
  debug: DebugInfo;
}

const API_TIMEOUT = 60000;

export async function predictML(file: File): Promise<MLPredictionResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/predict', {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error(data.message || 'API returned non-success status');
    }

    return data as MLPredictionResponse;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Unable to connect to the server');
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timeout: API took too long to respond');
    }

    if (error instanceof SyntaxError) {
      throw new Error('Invalid API response format');
    }

    throw error;
  }
}
