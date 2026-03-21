// usePrediction hook
import { usePredictionStore } from '../store/predictionStore';

export function usePrediction() {
  const {
    predictions,
    currentPrediction,
    loading,
    error,
    fetchPredictions,
    createPrediction,
    updatePrediction,
    deletePrediction,
  } = usePredictionStore();

  return {
    predictions,
    currentPrediction,
    loading,
    error,
    fetchPredictions,
    createPrediction,
    updatePrediction,
    deletePrediction,
  };
}
