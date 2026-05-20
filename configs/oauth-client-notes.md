# OAuth Client Notes

OAuth is preferred where the MCP client supports it.

svgicons.com supports OAuth with Dynamic Client Registration and PKCE for compatible remote MCP clients. Let the MCP client initiate the OAuth flow instead of manually inventing client IDs, client secrets, callback URLs, or token exchange steps.

## Recommended Flow

1. Add `https://svgicons.com/mcp` as a hosted remote MCP endpoint.
2. Select OAuth when the client offers it.
3. Let the client discover the svgicons.com OAuth metadata.
4. Sign in to svgicons.com in the browser authorization flow.
5. Approve the connection.
6. Refresh the tool list in the client if needed.

## Troubleshooting

- OAuth popup blocked: allow popups for the MCP client and retry.
- Authorization denied: restart the connection flow and approve only if the client is trusted.
- Wrong account: sign out of svgicons.com in the browser, then reconnect with the intended account.
- Tools not visible after auth: refresh or reconnect the MCP server in the client.
- Stale authorization: remove the MCP connection in the client and authorize again.

Do not paste OAuth tokens, authorization codes, or browser callback URLs into public issues or prompts.
