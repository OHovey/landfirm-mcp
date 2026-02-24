#!/usr/bin/env node

if (process.argv.includes('--http') || process.env.PORT) {
  await import('./src/http.js');
} else {
  const { StdioServerTransport } = await import('@modelcontextprotocol/sdk/server/stdio.js');
  const { createServer } = await import('./src/server.js');

  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
