# Clients

Use this guide for MCP-compatible clients that can connect to the hosted svgicons.com MCP endpoint.

Endpoint:

```text
https://svgicons.com/mcp
```

The endpoint is hosted remote MCP over HTTP JSON-RPC. It is not a local stdio server.

## Quick Decision Table

| Client capability | Recommended setup |
| --- | --- |
| Remote HTTP MCP plus OAuth | Use `https://svgicons.com/mcp` and choose OAuth. |
| Remote HTTP MCP plus private headers | Use `Authorization: Bearer ...` only if the client stores headers securely. |
| Local command or stdio only | Use a trusted bridge or adapter if needed; this repo does not provide an official local Svg/icons package. |
| Unsupported MCP client | Use the REST API repo or CLI repo for non-MCP workflows. |

Config index: [configs/README.md](../configs/README.md)

## Claude Code

```bash
claude mcp add --transport http svgicons https://svgicons.com/mcp
```

Run `/mcp` inside Claude Code afterwards to complete the OAuth sign-in. To use a Pro API token instead of OAuth:

```bash
claude mcp add --transport http svgicons https://svgicons.com/mcp \
  --header "Authorization: Bearer YOUR_API_TOKEN"
```

In JSON configs (`.mcp.json`), a remote server needs `"type": "http"` — a bare `url` entry without a `type` is treated as a configuration error.

## Claude.ai And Claude Desktop

Add the endpoint as a custom connector:

1. Open **Customize → Connectors** and click **Add custom connector**.
2. Enter `https://svgicons.com/mcp` and click **Add**.
3. Complete the OAuth prompt to sign in to svgicons.com. Dynamic Client Registration is supported, so no client ID or secret is needed.
4. Enable the connector per conversation from the **+** menu → **Connectors**.

Team/Enterprise owners add it under **Organization settings → Connectors → Add → Custom → Web**; members then connect individually. Custom connectors use OAuth — bearer-token headers are not offered in this UI.

## Cursor

Project `.cursor/mcp.json` or global `~/.cursor/mcp.json`. The presence of `url` marks the server as remote; no `type` field is needed. Omit `headers` to use Cursor's OAuth flow.

```json
{
  "mcpServers": {
    "svgicons": {
      "url": "https://svgicons.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_TOKEN"
      }
    }
  }
}
```

## Windsurf

`~/.codeium/windsurf/mcp_config.json`. Remote servers accept `serverUrl` (or `url`); `headers` supports `${env:VAR}` interpolation. Omit `headers` for OAuth.

```json
{
  "mcpServers": {
    "svgicons": {
      "serverUrl": "https://svgicons.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:SVGICONS_API_TOKEN}"
      }
    }
  }
}
```

## VS Code (GitHub Copilot Agent Mode)

Workspace `.vscode/mcp.json` (top-level key is `servers`, not `mcpServers`):

```json
{
  "servers": {
    "svgicons": {
      "type": "http",
      "url": "https://svgicons.com/mcp"
    }
  }
}
```

## ChatGPT And Codex

ChatGPT and Codex-style clients use the same hosted endpoint, but setup differs by client.

Use OAuth where the client supports remote MCP OAuth with Dynamic Client Registration and PKCE. This is the preferred setup for ChatGPT-style account flows because the client handles authorization without exposing a Pro API token in prompts.

For Codex-style developer setup, the website docs confirm this command for bearer-token configuration:

```powershell
codex mcp add svgicons --url https://svgicons.com/mcp --bearer-token-env-var SVGICONS_API_TOKEN
```

The website docs also confirm anonymous Codex setup for metadata-only access:

```powershell
codex mcp add svgicons-public --url https://svgicons.com/mcp
```

See:

- [ChatGPT and Codex setup notes](../configs/chatgpt-codex.md)
- [Codex example](../configs/codex.example.md)
- <https://svgicons.com/docs/chatgpt-codex-mcp-setup>

## Generic Remote MCP Clients

Use the hosted endpoint when the client supports remote HTTP MCP servers:

```text
https://svgicons.com/mcp
```

Choose OAuth where supported. If the client supports private request headers, it may support:

```text
Authorization: Bearer YOUR_TOKEN
```

The reference JSON examples are not universal client configs:

- [generic-remote-mcp.example.json](../configs/generic-remote-mcp.example.json)
- [bearer-token.example.json](../configs/bearer-token.example.json)

Always adapt the shape to the client documentation.

## Bearer-Token-Capable Clients

Bearer-token-capable clients are useful for local development tools, CLI-driven workflows, and developer automation that can store tokens privately.

Use:

- `SVGICONS_API_TOKEN` as the environment variable name in examples.
- `Authorization: Bearer YOUR_TOKEN` as the header shape.
- The smallest permission set needed for the workflow.

Raw SVG, PNG export, persistent Icon Collections, generated project collections, and collection exports may require authenticated account permissions and/or Pro Plan access.

Do not paste bearer tokens into public config examples, prompts, issues, or screenshots.

## Local Bridge Situations

Some MCP clients only launch local commands and do not connect directly to hosted remote MCP. Those clients may require a bridge or adapter that forwards to `https://svgicons.com/mcp`.

This repo does not provide an official local Svg/icons MCP server package or local stdio server. The website docs mention `mcp-remote` for command-based clients; review any bridge security model before passing tokens through it.

See [local bridge notes](../configs/local-bridge-notes.md).

## Unsupported Or Unconfirmed Setups

These are not documented as supported Svg/icons MCP setups here:

- A local Svg/icons stdio server.
- A local Svg/icons MCP server package.
- A package install command for a Svg/icons MCP server.
- Treating `/api/pro` as MCP.
- Using `/api/v1`, which is not the live Svg/icons API surface.
- Treating MCP as OpenAPI.

If a client cannot use the hosted MCP endpoint, use the related repos where appropriate:

- REST API repo: <https://github.com/svgicons-com/api>
- CLI repo: <https://github.com/svgicons-com/cli>

## Security Checklist

- Use OAuth where supported.
- Keep bearer tokens private.
- Store tokens in a client secret store or environment variable.
- Do not commit tokens.
- Review tool calls before approval.
- Review generated SVG and code before committing.

## Troubleshooting

- [Troubleshooting](TROUBLESHOOTING.md)
- [Authentication](AUTHENTICATION.md)
- [Config index](../configs/README.md)
