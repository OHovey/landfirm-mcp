import { apiGet } from '../utils/api-client.js';

const testParam = {
  type: 'boolean',
  description: 'Use free test endpoint with dummy data (no payment required). Default: false.',
};

export const tools = [
  {
    name: 'get_epc',
    description:
      'Get Energy Performance Certificates (EPC) for a UK postcode. Returns energy ratings, efficiency scores, property type, floor area, and 80+ additional fields per certificate. Coverage: England & Wales only. Price: $0.005 per call.',
    inputSchema: {
      type: 'object',
      properties: {
        postcode: {
          type: 'string',
          description: 'UK postcode (e.g. "SW1A 1AA"). England & Wales only.',
        },
        test: testParam,
      },
      required: ['postcode'],
    },
  },
  {
    name: 'search_epc',
    description:
      'Search Energy Performance Certificates by postcode area, energy rating, efficiency score, property type, or built form. The postcodeArea parameter is required. Returns paginated results. Coverage: England & Wales only. Price: $0.005 per call.',
    inputSchema: {
      type: 'object',
      properties: {
        postcodeArea: {
          type: 'string',
          description:
            'Postcode area prefix (required, e.g. "BS1", "SW", "EC2").',
        },
        rating: {
          type: 'string',
          description: 'Energy rating filter (A-G).',
          enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        },
        minEfficiency: {
          type: 'integer',
          description: 'Minimum energy efficiency score.',
        },
        maxEfficiency: {
          type: 'integer',
          description: 'Maximum energy efficiency score.',
        },
        propertyType: {
          type: 'string',
          description: 'Property type filter.',
        },
        builtForm: {
          type: 'string',
          description: 'Built form filter.',
        },
        page: {
          type: 'integer',
          description: 'Page number (default: 1).',
        },
        limit: {
          type: 'integer',
          description: 'Results per page (default: 20, max: 100).',
        },
        test: testParam,
      },
      required: ['postcodeArea'],
    },
  },
];

export async function handle(name, args) {
  const opts = { test: args.test };
  switch (name) {
    case 'get_epc':
      return apiGet(`/api/epc/${encodeURIComponent(args.postcode)}`, {}, opts);
    case 'search_epc': {
      const { postcodeArea, rating, minEfficiency, maxEfficiency, propertyType, builtForm, page, limit } = args;
      return apiGet('/api/epc/search', { postcodeArea, rating, minEfficiency, maxEfficiency, propertyType, builtForm, page, limit }, opts);
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
