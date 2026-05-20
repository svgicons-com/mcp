# ChatGPT And Codex Setup

Use this guide for ChatGPT and Codex-style clients that connect to the hosted svgicons.com MCP endpoint.

Endpoint:

```text
https://svgicons.com/mcp
```

Authentication: OAuth with Dynamic Client Registration and PKCE where supported by the MCP client. Codex-style developer clients may also support bearer-token setup through private environment variables.

## General Remote MCP Flow

1. Add a remote MCP connector or server in the client.
2. Use the endpoint URL `https://svgicons.com/mcp`.
3. Choose OAuth when the client offers it.
4. Complete the svgicons.com authorization flow in the browser.
5. Confirm that the live tools are visible.
6. Test with a metadata-only prompt before requesting authenticated workflows.

Safe test prompt:

```text
Search for a simple search icon and show me a few options.
```

## Codex Command

The website setup docs confirm this Codex command for bearer-token configuration:

```powershell
codex mcp add svgicons --url https://svgicons.com/mcp --bearer-token-env-var SVGICONS_API_TOKEN
```

The same website docs confirm anonymous metadata-only setup:

```powershell
codex mcp add svgicons-public --url https://svgicons.com/mcp
```

Use `SVGICONS_API_TOKEN` as an environment variable, not as a pasted prompt value.

## Source Setup Guide

Use the current svgicons.com guide for product-specific steps:

<https://svgicons.com/docs/chatgpt-codex-mcp-setup>
