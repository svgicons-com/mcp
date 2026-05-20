# Authentication

Endpoint:

```text
https://svgicons.com/mcp
```

Protocol: hosted remote MCP over HTTP JSON-RPC. Clients send JSON-RPC requests to the hosted endpoint; MCP is separate from the Svg/icons REST API.

## Supported Modes

The live implementation supports these access patterns:

- Anonymous metadata-only access for supported icon discovery and recommendation workflows.
- OAuth with Dynamic Client Registration and PKCE where the MCP client supports it.
- `Authorization: Bearer ...` header tokens for supported developer, Codex, CLI, and remote HTTP MCP clients.

Do not assume every tool or operation is available anonymously. Many useful workflows require authentication, and some tools or workflows may require an svgicons.com account and/or Pro Plan access. Pro/account-gated workflows can include raw SVG access, PNG export, persistent Icon Collections, generated project collections, collection export, or other account features depending on permissions.

## Anonymous Metadata-Only Access

Anonymous requests can use supported metadata workflows such as icon search, icon set search, icon metadata lookup, and UI recommendations. Metadata responses can include fields such as icon IDs, names, dimensions, page URLs, and icon set metadata.

Anonymous access does not mean raw SVG, PNG export, persistent Icon Collection creation, generated project collection creation, or collection export access. Check the MCP client response, svgicons.com account permissions, and Pro Plan access for each tool call.

## OAuth With Dynamic Client Registration And PKCE

Use OAuth where the MCP client supports it. OAuth keeps long-lived secrets out of prompts and local config files and lets the client manage authorization.

At a high level:

1. Configure the MCP client with `https://svgicons.com/mcp`.
2. Choose OAuth when the client offers it for remote MCP.
3. Let the client discover the svgicons.com OAuth metadata.
4. Sign in to svgicons.com in the browser flow.
5. Review and approve the MCP connection.

Do not invent OAuth client IDs, client secrets, callback URLs, or manual authorization steps. Use the flow exposed by the MCP client.

Useful source docs:

- <https://svgicons.com/docs/chatgpt-codex-mcp-setup>
- <https://svgicons.com/docs/mcp-server>

Repo setup notes:

- [ChatGPT and Codex setup](../configs/chatgpt-codex.md)
- [OAuth client notes](../configs/oauth-client-notes.md)

## Bearer Tokens

Some developer clients support private headers for remote HTTP MCP servers. In those clients, the header shape is:

```text
Authorization: Bearer YOUR_TOKEN
```

For local developer environments, store the token in an environment variable or client secret store:

```text
SVGICONS_API_TOKEN=YOUR_TOKEN
```

Use bearer tokens only in clients that store headers privately. The server requires MCP-capable authorization for authenticated workflows, and individual tools may require additional account permissions or Pro Plan access for raw SVG, exports, or Icon Collections.

Bearer-token config notes:

- [Codex example](../configs/codex.example.md)
- [Bearer-token reference JSON](../configs/bearer-token.example.json)

## Token Safety

- Do not paste tokens into public prompts.
- Do not commit tokens.
- Do not include tokens in screenshots, issues, logs, or shared examples.
- Rotate exposed tokens immediately.
- Prefer OAuth where supported.
- Use bearer tokens only in supported clients.
- Use placeholders such as `YOUR_TOKEN` or `SVGICONS_API_TOKEN` in documentation.

## What Not To Do

- Do not invent token scopes or access levels.
- Do not claim all tools are available anonymously.
- Do not claim all tools require authentication.
- Do not use REST API setup as a substitute for MCP setup.
- Do not document a local Svg/icons MCP server package unless one exists and is officially documented.
