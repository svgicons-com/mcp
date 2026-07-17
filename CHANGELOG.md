# Changelog

## 0.3.0 - 2026-07-17

- Updated the repository for MCP server v0.3.0 (protocol `2025-06-18`).
- Documented all 12 live tools, adding `list_icon_collections`, `get_icon_collection`, `add_icons_to_collection`, and `remove_icon_from_collection`.
- Replaced vague access wording with the real model: anonymous metadata tier with current caps, Pro OAuth (PKCE + Dynamic Client Registration), Pro API tokens, and the six token scopes.
- Added verified connection instructions for Claude Code, Claude.ai/Claude Desktop custom connectors, Cursor, Windsurf, and VS Code alongside the existing ChatGPT/Codex guides.
- Documented export behavior: custom-icon entries export their customized snapshots, and styled collections default to the `preserve` color policy when `colorPolicy` is omitted.
- Documented the Official MCP Registry listing `com.svgicons/mcp` with a verification command.

## 0.1.0 - 2026-05-20

- Added the public scaffold for hosted svgicons.com MCP workflows.
- Documented the hosted endpoint at `https://svgicons.com/mcp`.
- Added initial authentication, client, tool, security, troubleshooting, prompting, API relationship, and roadmap docs.
- Added contribution, use case, issue template, and validation scaffolding.
- Expanded hosted MCP endpoint, authentication, live tool, client, API relationship, troubleshooting, and security documentation.
- Added hosted MCP client setup docs and reference config examples.
- Added MCP prompt library and AI coding workflow docs.
- Added MCP examples, community use-case templates, issue templates, and moderation docs.
- Added CI validation, docs quality checks, secret checks, and release-readiness docs.
- Prepared website developer-page integration status notes.
