// Route service
import client from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const routeService = {
  search: (query) =>
    client.get(API_ENDPOINTS.ROUTES.SEARCH, { params: { q: query } }),

  getDetails: (id) =>
    client.get(API_ENDPOINTS.ROUTES.GET_DETAILS.replace(':id', id)),

  getPopular: () =>
    client.get(API_ENDPOINTS.ROUTES.LIST_POPULAR),
};
