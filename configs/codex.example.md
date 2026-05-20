# Codex Example

Endpoint:

```text
https://svgicons.com/mcp
```

Codex connects to the hosted remote MCP endpoint. The website setup docs confirm bearer-token configuration through an environment variable.

## Authenticated Setup

Set `SVGICONS_API_TOKEN` in your local environment or secret store, then add the hosted MCP server:

```powershell
codex mcp add svgicons --url https://svgicons.com/mcp --bearer-token-env-var SVGICONS_API_TOKEN
```

Verify in Codex:

```powershell
codex mcp list
codex mcp get svgicons
```

Do not paste token values into prompts, issues, screenshots, or committed files.

## Anonymous Metadata-Only Setup

For metadata-only search without a token:

```powershell
codex mcp add svgicons-public --url https://svgicons.com/mcp
```

Anonymous setup can support limited discovery workflows, but it cannot return raw SVG or create persistent Icon Collections.

## Verification Prompt

```text
Use the Svg/icons MCP server to search for five settings icons suitable for a compact account page. Include icon page URLs.
```

## Troubleshooting

- If Codex cannot authenticate, confirm `SVGICONS_API_TOKEN` is available in the same shell or environment where Codex runs.
- If tools are missing, remove and re-add the MCP server so Codex refreshes tool discovery.
- If raw SVG or export workflows fail, check account permissions and the MCP tool response.

Reference:

<https://svgicons.com/docs/chatgpt-codex-mcp-setup>
