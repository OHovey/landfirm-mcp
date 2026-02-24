# Landfirm MCP Server

MCP server for the [Landfirm](https://landfirm.com) UK government data API. Exposes Companies House, Land Registry, EPC, and flood risk data as MCP tools for Claude and other MCP-compatible agents.

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

## Setup

```bash
npm install
```

## Configuration

Set the Landfirm API base URL (defaults to `http://localhost:3000`):

```bash
export LANDFIRM_API_URL=https://landfirm.com
```

## Usage with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "landfirm": {
      "command": "node",
      "args": ["/path/to/landfirm-mcp/index.js"],
      "env": {
        "LANDFIRM_API_URL": "https://landfirm.com"
      }
    }
  }
}
```

## Usage with Claude Code

```bash
claude mcp add landfirm node /path/to/landfirm-mcp/index.js
```
