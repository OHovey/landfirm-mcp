import { wrapFetchWithPayment, x402Client } from '@x402/fetch';
import { ExactSvmScheme, toClientSvmSigner, SOLANA_MAINNET_CAIP2 } from '@x402/svm';
import { createKeyPairSignerFromBytes } from '@solana/kit';
import { getBase58Codec } from '@solana/codecs';

const BASE_URL = process.env.LANDFIRM_API_URL || 'https://api.landfirm.space';

async function buildFetch() {
  const privKey = process.env.SOLANA_PRIVATE_KEY;
  if (!privKey) return fetch;

  const bytes = getBase58Codec().encode(privKey);
  const keypair = await createKeyPairSignerFromBytes(bytes);
  const signer = toClientSvmSigner(keypair);

  const client = new x402Client();
  client.register(SOLANA_MAINNET_CAIP2, new ExactSvmScheme(signer));

  return wrapFetchWithPayment(fetch, client);
}

const payFetch = await buildFetch();

export async function apiGet(path, params = {}) {
  const url = new URL(path, BASE_URL);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await payFetch(url.toString());
  const body = await res.json();

  if (!res.ok) {
    const msg = body.message || body.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return body;
}
