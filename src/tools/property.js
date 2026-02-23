import { apiGet } from '../utils/api-client.js';

export const tools = [
  {
    name: 'get_property_transactions',
    description:
      'Get all Land Registry property transactions for a UK postcode. Returns individual sale records with price, date, property type, and address. Coverage: England & Wales only. Price: $0.010 per call.',
    inputSchema: {
      type: 'object',
      properties: {
        postcode: {
          type: 'string',
          description: 'UK postcode (e.g. "SW1A 1AA"). England & Wales only.',
        },
      },
      required: ['postcode'],
    },
  },
  {
    name: 'get_property_summary',
    description:
      'Get aggregate property statistics for a UK postcode: average/median price, year-on-year trend, time series, and breakdowns by property type and tenure. Coverage: England & Wales only. Price: $0.015 per call.',
    inputSchema: {
      type: 'object',
      properties: {
        postcode: {
          type: 'string',
          description: 'UK postcode (e.g. "SW1A 1AA"). England & Wales only.',
        },
      },
      required: ['postcode'],
    },
  },
  {
    name: 'get_property_intelligence',
    description:
      'Get a full cross-referenced property data bundle for a UK postcode: transactions, EPC certificates, flood risk, and summary statistics combined. The most comprehensive single call for property due diligence. Coverage: England & Wales only. Price: $0.025 per call.',
    inputSchema: {
      type: 'object',
      properties: {
        postcode: {
          type: 'string',
          description: 'UK postcode (e.g. "SW1A 1AA"). England & Wales only.',
        },
      },
      required: ['postcode'],
    },
  },
  {
    name: 'search_properties',
    description:
      'Search property transactions by area, type, tenure, price range, and date range. At least one area parameter (town, district, or county) is required. Returns paginated results. Coverage: England & Wales only. Price: $0.008 per call.',
    inputSchema: {
      type: 'object',
      properties: {
        town: {
          type: 'string',
          description: 'Town or city name.',
        },
        district: {
          type: 'string',
          description: 'District name.',
        },
        county: {
          type: 'string',
          description: 'County name.',
        },
        type: {
          type: 'string',
          description: 'Property type: D (Detached), S (Semi-detached), T (Terraced), F (Flat), O (Other).',
          enum: ['D', 'S', 'T', 'F', 'O'],
        },
        tenure: {
          type: 'string',
          description: 'Tenure: F (Freehold) or L (Leasehold).',
          enum: ['F', 'L'],
        },
        minPrice: {
          type: 'integer',
          description: 'Minimum transaction price.',
        },
        maxPrice: {
          type: 'integer',
          description: 'Maximum transaction price.',
        },
        fromDate: {
          type: 'string',
          description: 'Earliest transfer date (YYYY-MM-DD).',
        },
        toDate: {
          type: 'string',
          description: 'Latest transfer date (YYYY-MM-DD).',
        },
        page: {
          type: 'integer',
          description: 'Page number (default: 1).',
        },
        limit: {
          type: 'integer',
          description: 'Results per page (default: 20, max: 100).',
        },
      },
    },
  },
];

export async function handle(name, args) {
  switch (name) {
    case 'get_property_transactions':
      return apiGet(`/api/property/${encodeURIComponent(args.postcode)}`);
    case 'get_property_summary':
      return apiGet(`/api/property/${encodeURIComponent(args.postcode)}/summary`);
    case 'get_property_intelligence':
      return apiGet(`/api/property/${encodeURIComponent(args.postcode)}/intelligence`);
    case 'search_properties': {
      const { town, district, county, type, tenure, minPrice, maxPrice, fromDate, toDate, page, limit } = args;
      return apiGet('/api/property/search', { town, district, county, type, tenure, minPrice, maxPrice, fromDate, toDate, page, limit });
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
