import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as company from './tools/company.js';
import * as property from './tools/property.js';
import * as epc from './tools/epc.js';
import * as flood from './tools/flood.js';

const modules = [company, property, epc, flood];

// Build lookup maps
const allTools = modules.flatMap((mod) => mod.tools);
const handlerByTool = new Map();
for (const mod of modules) {
  for (const tool of mod.tools) {
    handlerByTool.set(tool.name, mod.handle);
  }
}

export function createServer() {
  const server = new Server(
    { name: 'ukledger', version: '1.0.0' },
    { capabilities: { tools: {}, resources: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: allTools.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
    })),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const handler = handlerByTool.get(name);
    if (!handler) {
      return {
        content: [{ type: 'text', text: `Unknown tool: ${name}` }],
        isError: true,
      };
    }
    try {
      const result = await handler(name, args || {});
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text', text: `Error: ${err.message}` }],
        isError: true,
      };
    }
  });

  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: [
      {
        uri: 'wicket://api/overview',
        name: 'Wicket API Overview',
        description: 'Overview of the Wicket/UKLedger API: data sources, coverage, and pricing',
        mimeType: 'text/plain',
      },
    ],
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    if (request.params.uri === 'wicket://api/overview') {
      return {
        contents: [
          {
            uri: 'wicket://api/overview',
            mimeType: 'text/plain',
            text: OVERVIEW_TEXT,
          },
        ],
      };
    }
    throw new Error(`Unknown resource: ${request.params.uri}`);
  });

  return server;
}

const OVERVIEW_TEXT = `Wicket (UKLedger) API — UK Government Data for AI Agents

Data Sources:
• Companies House — All UK registered companies (name, status, SIC codes, incorporation date, postcode)
• Land Registry Price Paid — Property transactions in England & Wales (price, date, type, tenure, address)
• Energy Performance Certificates (EPC) — Energy ratings for buildings in England & Wales (80+ fields per certificate)
• Environment Agency — Flood risk assessments (river/sea, surface water) and flood defence data for all UK postcodes

Geographic Coverage:
• Company data: All UK
• Property transactions: England & Wales only
• EPC certificates: England & Wales only
• Flood risk: All UK

Pricing (pay-per-query via x402 on Solana):
• Company lookup: $0.005
• Company search: $0.003
• Property transactions: $0.010
• Property summary: $0.015
• Property intelligence (cross-referenced bundle): $0.025
• Property search: $0.008
• EPC lookup: $0.005
• EPC search: $0.005
• Flood risk lookup: $0.003
• Flood risk search: $0.003

Payment: x402 micropayments on Solana mainnet. Payment is handled automatically at the HTTP layer — no API key required.`;
