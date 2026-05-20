# API Relationship

Svg/icons MCP, the REST API, and the CLI are related developer surfaces with different jobs.

## MCP

- Endpoint: `https://svgicons.com/mcp`
- Future repo target: <https://github.com/svgicons-com/mcp>
- Protocol: hosted MCP over HTTP JSON-RPC
- Primary use: AI coding tools and assistant workflows
- OpenAPI: no

MCP is for workflows where an AI client searches icons, inspects icon sets, recommends candidates, fetches authorized SVG data, creates Icon Collections, or queues export workflows through tool calls.

## REST API

- Repo: <https://github.com/svgicons-com/api>
- Live surface: `/api/pro`
- Primary use: direct programmatic integration, REST requests, OpenAPI-driven workflows, SDK usage, and backend automation

Use the REST API when your application or backend needs direct HTTP integration. MCP is separate from the REST API and is not part of the REST OpenAPI surface.

`/api/v1` is not the live Svg/icons API surface.

## CLI

- Repo: <https://github.com/svgicons-com/cli>
- Primary use: terminal workflows, export automation, project commands, and local scripting

Use the CLI when the workflow belongs in a terminal or automation script. The CLI may use the hosted MCP endpoint for specific AI-assisted commands, but the CLI repo remains separate from this MCP documentation repo.

## Choosing The Right Surface

- Use MCP for AI coding tools and assistant-driven icon workflows.
- Use the REST API for direct programmatic integration.
- Use the CLI for terminal and project automation.

Links should be natural and useful to developers.
