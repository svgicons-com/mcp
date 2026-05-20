# Configs

This directory contains setup notes and reference config shapes for connecting MCP-compatible clients to the hosted svgicons.com MCP endpoint.

Endpoint:

```text
https://svgicons.com/mcp
```

Protocol: hosted remote MCP over HTTP JSON-RPC.

## Authentication Modes

- OAuth with Dynamic Client Registration and PKCE where supported by the MCP client.
- `Authorization: Bearer ...` where supported by the MCP client.
- Anonymous metadata-only access where supported by the tool call.

Do not assume every tool is available anonymously. Raw SVG, PNG export, persistent Icon Collections, generated project collections, and collection exports may require authenticated account permissions and/or Pro Plan access.

## Setup Files

| File | Purpose |
| --- | --- |
| [chatgpt-codex.md](chatgpt-codex.md) | ChatGPT and Codex-style setup flow using the hosted endpoint. |
| [codex.example.md](codex.example.md) | Codex-specific command and verification notes confirmed by the website docs. |
| [generic-remote-mcp.example.json](generic-remote-mcp.example.json) | Conceptual remote MCP reference shape for clients that support hosted HTTP MCP. |
| [bearer-token.example.json](bearer-token.example.json) | Conceptual bearer-token reference shape for clients that securely support custom headers. |
| [oauth-client-notes.md](oauth-client-notes.md) | OAuth, Dynamic Client Registration, PKCE, and reconnect notes. |
| [local-bridge-notes.md](local-bridge-notes.md) | Notes for clients that require a local command bridge or adapter. |

Each MCP client has its own configuration format. The JSON files in this directory are reference examples, not universal drop-in configs.

## Important Warning

There is no official local `@svgicons-com/mcp-server` npm package in this repo. Do not replace the hosted endpoint with a made-up local package or setup command.

## Security Reminders

- Do not paste tokens into public prompts.
- Do not commit tokens.
- Use OAuth where supported.
- Keep bearer tokens private.
- Review tool calls before approval.
- Review generated SVG and code before committing.

See [authentication](../docs/AUTHENTICATION.md), [clients](../docs/CLIENTS.md), and [troubleshooting](../docs/TROUBLESHOOTING.md).
