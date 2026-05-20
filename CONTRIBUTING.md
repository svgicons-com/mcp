# Contributing

Contributions should improve accurate, useful MCP developer workflows for svgicons.com.

Useful contributions include:

- Client setup notes for MCP-compatible tools.
- Prompt examples that help teams choose, inspect, or prepare icons.
- Workflow examples that use the hosted endpoint.
- Troubleshooting improvements.
- Community use cases.
- Documentation fixes.

Contribution rules:

- Do not include real tokens, credentials, private screenshots, or private project data.
- Do not add tools that are not live on `https://svgicons.com/mcp`.
- Do not add setup commands for a local Svg/icons MCP server package unless that package exists.
- Do not claim a local stdio MCP server exists.
- Do not describe MCP as REST API or OpenAPI.
- Do not present `/api/v1` as a live Svg/icons API surface.
- Keep external links editorial, optional, and workflow-relevant.
- Do not add fabricated customer claims.

Before proposing changes, run:

```bash
npm ci
npm run validate
```

Validation runs secret checks, docs checks, and scaffold checks. It does not call the live MCP endpoint and does not require real auth tokens.
