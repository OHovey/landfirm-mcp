# Landfirm MCP Server

MCP server for the [Landfirm](https://landfirm.space) UK government data API. Gives Claude and other MCP-compatible agents access to Companies House, Land Registry, EPC, and flood risk data for England & Wales.

## Tools

| Tool | Description | Price |
|------|-------------|-------|
| `get_company` | Look up a company by Companies House number | $0.005 |
| `search_companies` | Search companies by name, status, SIC code, area | $0.003 |
| `get_property_transactions` | Get property transactions for a postcode | $0.010 |
| `get_property_summary` | Get aggregate property stats for a postcode | $0.015 |
| `get_property_intelligence` | Full cross-referenced property data bundle | $0.025 |
| `search_properties` | Search transactions by area, type, price range | $0.008 |
| `get_epc` | Get EPC certificates for a postcode | $0.005 |
| `search_epc` | Search EPCs by area and rating | $0.005 |
| `get_flood_risk` | Get flood risk and defences for a postcode | $0.003 |
| `search_flood_risk` | Search flood risk by area and risk level | $0.003 |

## Usage with Claude Code

```bash
claude mcp add landfirm -- npx landfirm-mcp
```

## Usage with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "landfirm": {
      "command": "npx",
      "args": ["landfirm-mcp"]
    }
  }
}
```

## Remote (Streamable HTTP)

The server can also run as a remote HTTP endpoint using Streamable HTTP transport:

```bash
# Start HTTP server (default port 3001)
npm run serve

# Or with a custom port
PORT=8080 npm run serve
```

Connect any MCP client to `http://your-host:3001/mcp`.

### Usage with Claude Code (remote)

```bash
claude mcp add --transport http landfirm http://localhost:3001/mcp
```

## Configuration

By default the server connects to the Landfirm production API. To override:

```json
{
  "mcpServers": {
    "landfirm": {
      "command": "npx",
      "args": ["landfirm-mcp"],
      "env": {
        "LANDFIRM_API_URL": "http://localhost:3000"
      }
    }
  }
}
```

## Payments

All API calls are priced via [x402](https://www.x402.org/) micropayments on Solana. The prices shown above are per-call. No API key or signup required — just a funded Solana wallet.

## License

MIT
