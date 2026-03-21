const BASE = 'https://fatimaaa423-uk-transport-delay.hf.space';

export const fetchHealth = () =>
  fetch(`${BASE}/health`).then((r) => r.json());

export const fetchLines = () =>
  fetch(`${BASE}/api/lines`).then((r) => r.json());

export const fetchPrediction = (lineId) =>
  fetch(`${BASE}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ line_id: lineId }),
  }).then((r) => r.json());

export const fetchAllPredictions = () =>
  fetch(`${BASE}/api/predict-all`).then((r) => r.json());

export const fetchWeather = () =>
  fetch(`${BASE}/api/weather`).then((r) => r.json());
