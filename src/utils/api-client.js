const BASE_URL = process.env.LANDFIRM_API_URL || 'https://api.landfirm.space';

export async function apiGet(path, params = {}) {
  const url = new URL(path, BASE_URL);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString());
  const body = await res.json();

  if (!res.ok) {
    const msg = body.message || body.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return body;
}
