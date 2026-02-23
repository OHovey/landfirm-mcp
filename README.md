# UKLedger MCP Server

MCP server for the [Wicket/UKLedger](https://github.com/oliverhovey/UKLedger) UK government data API. Exposes Companies House, Land Registry, EPC, and flood risk data as MCP tools for Claude and other MCP-compatible agents.

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

Set the Wicket API base URL (defaults to `http://localhost:3000`):

```bash
export WICKET_API_URL=https://your-wicket-api.example.com
```

## Usage with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "ukledger": {
      "command": "node",
      "args": ["/path/to/UKLedger-mcp/index.js"],
      "env": {
        "WICKET_API_URL": "https://your-wicket-api.example.com"
      }
    }
  }
}
```

## Usage with Claude Code

```bash
claude mcp add ukledger node /path/to/UKLedger-mcp/index.js
```
