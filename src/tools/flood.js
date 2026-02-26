import { apiGet } from '../utils/api-client.js';

const testParam = {
  type: 'boolean',
  description: 'Use free test endpoint with dummy data (no payment required). Default: false.',
};

export const tools = [
  {
    name: 'get_flood_risk',
    description:
      'Get flood risk assessment and nearby flood defences for a UK postcode. Returns river/sea risk, surface water risk, suitability ratings, and defence details (type, condition, year built, distance). Coverage: all UK postcodes. Price: $0.003 per call.',
    inputSchema: {
      type: 'object',
      properties: {
        postcode: {
          type: 'string',
          description: 'UK postcode (e.g. "SW1A 1AA"). All UK postcodes supported.',
        },
        test: testParam,
      },
      required: ['postcode'],
    },
  },
  {
    name: 'search_flood_risk',
    description:
      'Search flood risk records by postcode area and risk level. At least one parameter (postcodeArea, riverSeaRisk, or surfaceWaterRisk) is required. Returns paginated results. Coverage: all UK postcodes. Price: $0.003 per call.',
    inputSchema: {
      type: 'object',
      properties: {
        postcodeArea: {
          type: 'string',
          description:
            'Postcode area prefix (e.g. "BS1", "SW", "EC2").',
        },
        riverSeaRisk: {
          type: 'string',
          description: 'River and sea flood risk level.',
          enum: ['Very Low', 'Low', 'Medium', 'High'],
        },
        surfaceWaterRisk: {
          type: 'string',
          description: 'Surface water flood risk level.',
          enum: ['Very Low', 'Low', 'Medium', 'High'],
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
    },
  },
];

export async function handle(name, args) {
  const opts = { test: args.test };
  switch (name) {
    case 'get_flood_risk':
      return apiGet(`/api/flood/${encodeURIComponent(args.postcode)}`, {}, opts);
    case 'search_flood_risk': {
      const { postcodeArea, riverSeaRisk, surfaceWaterRisk, page, limit } = args;
      return apiGet('/api/flood/search', { postcodeArea, riverSeaRisk, surfaceWaterRisk, page, limit }, opts);
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
