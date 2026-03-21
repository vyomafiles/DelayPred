// Prediction service
import client from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const predictionService = {
  create: (predictionData) =>
    client.post(API_ENDPOINTS.PREDICTIONS.CREATE, predictionData),

  get: (id) =>
    client.get(API_ENDPOINTS.PREDICTIONS.GET.replace(':id', id)),

  list: (params) =>
    client.get(API_ENDPOINTS.PREDICTIONS.LIST, { params }),

  delete: (id) =>
    client.delete(API_ENDPOINTS.PREDICTIONS.DELETE.replace(':id', id)),
};
