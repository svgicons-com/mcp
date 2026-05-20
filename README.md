# Svg/icons MCP

svgicons.com is a developer-focused SVG icon platform for searching icons, inspecting icon metadata, exploring icon sets, building icon workflows, and integrating icons into design systems, frontend projects, and AI-assisted coding workflows.

Svg/icons MCP helps MCP-compatible AI coding tools search icons, inspect icon sets, recommend icon choices, export assets, and prepare Icon Collection workflows through the hosted svgicons.com MCP endpoint.

Endpoint:

```text
https://svgicons.com/mcp
```

Version: `0.1.0`

This repository documents hosted MCP workflows for svgicons.com. The endpoint is remote MCP over HTTP JSON-RPC, separate from the Svg/icons REST API, and not OpenAPI. This repo does not provide a local stdio server or a local Svg/icons MCP server package.

## What This Repo Contains

- Hosted MCP endpoint setup
- Client configuration guidance
- Live tool reference
- Prompting guidance
- Example workflow documentation
- Security guidance
- Troubleshooting
- Relationship to the REST API and CLI repos
- Community use case templates

## Authentication and Pro Plan access

The hosted endpoint supports these access patterns:

- Anonymous metadata-only access for limited discovery and metadata workflows.
- OAuth with Dynamic Client Registration and PKCE where the MCP client supports it.
- `Authorization: Bearer ...` header tokens for supported developer, CLI, and Codex-style clients.

Do not assume every tool is available anonymously. Many useful workflows require authentication, and some tools or workflows may require an svgicons.com account and/or Pro Plan access. Pro/account-gated workflows can include PNG export, icon kit creation, generated project icon kits, icon collection export, raw SVG access, or other account features depending on permissions.

Do not paste tokens into prompts, issues, screenshots, commits, or public repos. If access is denied, check authentication, account permissions, and Pro Plan access.

See [docs/AUTHENTICATION.md](docs/AUTHENTICATION.md).

## Live MCP Tools

The hosted endpoint exposes exactly these live MCP tools:

- `search_icons`
- `search_icon_sets`
- `get_icon`
- `export_icon_png`
- `recommend_icons_for_ui`
- `create_icon_kit`
- `generate_icon_kit_for_project`
- `export_icon_collection`

See [docs/TOOLS.md](docs/TOOLS.md) for verified input fields, output notes, access expectations, and safe prompt examples.

## Client Setup

Use `https://svgicons.com/mcp` when your client supports hosted remote MCP over HTTP JSON-RPC.

For ChatGPT and Codex-style setup, use OAuth where supported or a private bearer-token configuration where the client supports it. The current svgicons.com setup docs are the source of truth for client-specific steps:

- <https://svgicons.com/docs/chatgpt-codex-mcp-setup>
- <https://svgicons.com/docs/mcp-server>

Config and setup docs:

- [Config index](configs/README.md)
- [ChatGPT and Codex setup](configs/chatgpt-codex.md)
- [Codex example](configs/codex.example.md)
- [Client setup overview](docs/CLIENTS.md)
- [Authentication](docs/AUTHENTICATION.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## Prompt Library

The [prompt library](prompts/README.md) includes copyable workflows for search, React components, dashboard navigation, emoji replacement, accessibility review, themeable icons, design-system review, Icon Collections, and PNG export.

Start with [search icons](prompts/search-icons.md), then move to code or export prompts only after reviewing the tool calls and selected icons.

## Examples And Use Cases

- [Examples](examples/README.md) show practical hosted MCP workflows. They are documentation examples, not runnable local MCP server apps.
- [Community use cases](use-cases/README.md) explain how to share workflows safely.
- [Use-case template](use-cases/TEMPLATE.md) provides a reusable submission format.
- [GitHub issue templates](.github/ISSUE_TEMPLATE/) support use cases, setup help, feedback, and bug reports.

Sample use cases are marked as examples, not real customer submissions. Review generated SVG and code before committing changes.

## Validation

Run local checks before proposing changes:

```bash
npm ci
npm run validate
```

CI runs the same validation without live MCP calls, auth tokens, publishing, or deployment.

## Related Repos And Docs

- Website MCP developer page: <https://svgicons.com/developers/mcp>
- MCP server docs: <https://svgicons.com/docs/mcp-server>
- ChatGPT and Codex setup docs: <https://svgicons.com/docs/chatgpt-codex-mcp-setup>
- REST API repo: <https://github.com/svgicons-com/api>
- CLI repo: <https://github.com/svgicons-com/cli>

Repo roles:

- MCP repo: AI coding tool workflows, hosted MCP setup, prompts, examples, security notes, and troubleshooting.
- API repo: REST API, OpenAPI, SDK, examples, and direct programmatic integration.
- CLI repo: terminal workflows, export automation, and project commands.

See [docs/API_RELATIONSHIP.md](docs/API_RELATIONSHIP.md).

## Security Summary

- Do not paste tokens into public prompts, issues, screenshots, commits, or repos.
- Use OAuth where supported by the MCP client.
- Use bearer tokens only in supported clients and keep them private.
- Review tool calls before approval.
- Review AI-generated SVG and code before committing.
- Treat SVG insertion as code and content insertion.

See [SECURITY.md](SECURITY.md) and [docs/SECURITY.md](docs/SECURITY.md).

## Start Here

- [Authentication](docs/AUTHENTICATION.md)
- [Tools](docs/TOOLS.md)
- [Client setup overview](docs/CLIENTS.md)
- [Config examples](configs/README.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [API relationship](docs/API_RELATIONSHIP.md)
- [MCP security](docs/SECURITY.md)
- [Prompting guide](docs/PROMPTING_GUIDE.md)
- [Prompt library](prompts/README.md)
- [Examples](examples/README.md)
- [Community use cases](use-cases/README.md)
