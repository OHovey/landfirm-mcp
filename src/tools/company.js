import { apiGet } from '../utils/api-client.js';

export const tools = [
  {
    name: 'get_company',
    description:
      'Look up a UK company by its Companies House number. Returns company name, status, category, SIC codes, postcode, and incorporation date. Coverage: all UK companies. Price: $0.005 per call.',
    inputSchema: {
      type: 'object',
      properties: {
        companyNumber: {
          type: 'string',
          description:
            'Companies House number (8 alphanumeric characters, e.g. "00012345" or "SC123456"). Numeric numbers should be left-padded with zeros.',
        },
      },
      required: ['companyNumber'],
    },
  },
  {
    name: 'search_companies',
    description:
      'Search UK companies by name, status, SIC code, or postcode area. Returns paginated results. At least one search parameter (q, status, category, sic, or postcodeArea) is required. Price: $0.003 per call.',
    inputSchema: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          description: 'Fuzzy company name search (2-200 characters).',
        },
        status: {
          type: 'string',
          description: 'Company status filter (e.g. "Active", "Dissolved").',
        },
        category: {
          type: 'string',
          description: 'Company category filter.',
        },
        sic: {
          type: 'string',
          description: 'SIC code filter.',
        },
        postcodeArea: {
          type: 'string',
          description:
            'Postcode area prefix (1-2 letters + optional digit, e.g. "BS1", "SW", "EC2").',
        },
        incorporatedAfter: {
          type: 'string',
          description: 'Filter to companies incorporated after this date (YYYY-MM-DD).',
        },
        incorporatedBefore: {
          type: 'string',
          description: 'Filter to companies incorporated before this date (YYYY-MM-DD).',
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
    case 'get_company':
      return apiGet(`/api/company/${encodeURIComponent(args.companyNumber)}`);
    case 'search_companies': {
      const { q, status, category, sic, postcodeArea, incorporatedAfter, incorporatedBefore, page, limit } = args;
      return apiGet('/api/company/search', { q, status, category, sic, postcodeArea, incorporatedAfter, incorporatedBefore, page, limit });
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
