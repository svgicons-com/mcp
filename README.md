# Svg/icons MCP

The Svg/icons MCP server connects AI coding tools to [svgicons.com](https://svgicons.com), a catalog of 320K+ open-source SVG icons. Assistants can search icons and icon sets, fetch icon metadata, and get icon recommendations for a UI without any account. With a Pro account (OAuth or a scoped API token), they can also fetch raw SVG markup, render PNG exports, and create, read, extend, and export persistent Icon Collections — including custom-styled icons — so the icon-discovery step never leaves the development workflow.

The server is hosted, remote MCP over Streamable HTTP (JSON-RPC requests via HTTP `POST`). There is no local install and no local Svg/icons MCP server package.

Endpoint:

```text
https://svgicons.com/mcp
```

Current MCP server version: `0.3.2` (protocol `2025-06-18`).

Official MCP Registry name: `com.svgicons/mcp` — see [Official MCP Registry listing](#official-mcp-registry-listing).

[![smithery badge](https://smithery.ai/badge/contact-deyv/svgicons)](https://smithery.ai/servers/contact-deyv/svgicons)

## What This Repo Contains

This repository documents the hosted MCP endpoint. It contains no server code.

- Client connection instructions and reference configs
- Live tool reference
- Authentication and scope guidance
- Prompting guidance and a prompt library
- Example workflow documentation
- Security guidance and troubleshooting
- Relationship to the REST API and CLI repos
- Community use case templates

The live product docs are the source of truth: [MCP server docs](https://svgicons.com/docs/mcp-server) and the [MCP developer overview](https://svgicons.com/developers/mcp).

## Live MCP Tools

The hosted endpoint exposes exactly these 12 live tools.

**Search and read** (anonymous metadata; raw SVG with Pro):

- `search_icons` — search icon metadata by query, category, or icon set prefix; add `includeSvg` for raw SVG with a Pro token.
- `search_icon_sets` — search icon sets by name, prefix, author, category, or description to pick a consistent visual family.
- `get_icon` — fetch one icon by ID; metadata is public, raw SVG requires a Pro token.

**Recommendations** (anonymous):

- `recommend_icons_for_ui` — describe a UI or screen and receive icon candidates with short rationales.

**Icon Collections — create, read, extend** (Pro):

- `create_icon_kit` — create a persistent Icon Collection and optionally seed it with icon IDs.
- `generate_icon_kit_for_project` — generate an Icon Collection from a project brief, screen list, or required concepts.
- `list_icon_collections` — list your Icon Collections with icon counts, an optional name/slug filter, and pagination.
- `get_icon_collection` — read one collection with paginated entries, including custom-icon entries and their customized SVG bodies.
- `add_icons_to_collection` — add catalog icons to an existing collection; idempotent, already-present icons are skipped.
- `remove_icon_from_collection` — remove an icon from a collection; entry-precise by default, pass `allVariants: true` to remove every entry of the icon.

**Exports** (Pro):

- `export_icon_png` — render one icon as a PNG file or a ZIP of PNG variants, returned as a JSON-safe base64 payload.
- `export_icon_collection` — queue an Icon Collection export: SVG folders, SVG sprites, React/Vue/Svelte/Solid/Blade components, Storybook galleries, npm package scaffolds, PNG packs, Iconify JSON, and JSON/license manifests.

See [docs/TOOLS.md](docs/TOOLS.md) for verified input fields, output notes, access requirements, and safe prompt examples.

### Export behavior worth knowing

- Custom-icon entries in a collection export their customized snapshot under a unique derived filename — the customization is kept, not replaced by the catalog icon.
- When you do not pass `colorPolicy`, collections that carry styling (an applied style or custom-icon entries) default to `preserve`, so exported files keep the colors the customization defined. Plain collections keep the `currentColor` default. An explicit `colorPolicy` always wins.
- Use `formats: ["png"]` as a shorthand for `png-pack`.

## Access Tiers And Authentication

**Anonymous (no account):** metadata-only access to `search_icons`, `search_icon_sets`, `get_icon`, and `recommend_icons_for_ui`. Anonymous requests are rate-limited per method and currently capped at 10 icons per search or recommendation. Raw SVG, PNG export, and all Icon Collection tools are not available anonymously.

**Pro:** authenticate with either of:

- **OAuth 2.0** — authorization code with PKCE and Dynamic Client Registration. Clients discover the configuration at `https://svgicons.com/.well-known/oauth-authorization-server` (resource metadata at `/.well-known/oauth-protected-resource/mcp`), register dynamically, and send you to svgicons.com to sign in and approve access.
- **Pro API token** — a scoped personal access token created from your account page, sent as `Authorization: Bearer YOUR_API_TOKEN` in clients that support private headers.

Pro raises search caps (up to 50 icons per search) and unlocks raw SVG, PNG export, and the Icon Collection and export tools.

Token scopes — give each client the smallest set it needs:

| Scope | Unlocks |
| --- | --- |
| `mcp:use` | Required for any authenticated MCP call. |
| `search:read` | Search workflows. |
| `icons:read` | Raw SVG and PNG export inputs. |
| `collections:read` | Listing and reading Icon Collections. |
| `collections:write` | Creating and extending Icon Collections. |
| `exports:create` | PNG export and Icon Collection export workflows. |

The Pro Plan is €6/$7 per month or €69/$79 lifetime — see [pricing](https://svgicons.com/pricing). On the website, Icon Collections are also available to free Member accounts through a one-time trial allowance of 15 Pro credits; MCP and API access always require a Pro token.

See [docs/AUTHENTICATION.md](docs/AUTHENTICATION.md) and the [MCP server docs](https://svgicons.com/docs/mcp-server).

## Connect Your Client

### Claude Code

```bash
claude mcp add --transport http svgicons https://svgicons.com/mcp
```

Then run `/mcp` inside Claude Code to complete the OAuth sign-in. To use a Pro API token instead:

```bash
claude mcp add --transport http svgicons https://svgicons.com/mcp \
  --header "Authorization: Bearer YOUR_API_TOKEN"
```

### Claude.ai and Claude Desktop (custom connector)

1. Open **Customize → Connectors** and click **Add custom connector**.
2. Enter `https://svgicons.com/mcp` and click **Add**.
3. Complete the OAuth prompt to sign in to svgicons.com (Dynamic Client Registration — no client ID needed).
4. Enable the connector per conversation from the **+** menu → **Connectors**.

Team/Enterprise owners add it under **Organization settings → Connectors → Add → Custom → Web**; members then connect individually.

### Cursor

Project `.cursor/mcp.json` or global `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "svgicons": {
      "url": "https://svgicons.com/mcp"
    }
  }
}
```

Omit `headers` to use Cursor's OAuth flow, or add a token:

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

### Windsurf

`~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "svgicons": {
      "serverUrl": "https://svgicons.com/mcp"
    }
  }
}
```

Omit `headers` for OAuth, or reference an environment variable:

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

### VS Code (GitHub Copilot agent mode)

Workspace `.vscode/mcp.json`:

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

### ChatGPT and Codex

ChatGPT authenticates through OAuth with Dynamic Client Registration; Codex-style clients can use a bearer token. Follow the website guide: [Use MCP with ChatGPT and Codex](https://svgicons.com/docs/chatgpt-codex-mcp-setup), plus [configs/chatgpt-codex.md](configs/chatgpt-codex.md) and [configs/codex.example.md](configs/codex.example.md).

### Other clients

Clients that support remote HTTP MCP servers can connect with the generic shape:

```json
{
  "mcpServers": {
    "svgicons": {
      "type": "http",
      "url": "https://svgicons.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_TOKEN"
      }
    }
  }
}
```

Clients that only launch local command-based MCP servers can bridge with `mcp-remote`:

```json
{
  "mcpServers": {
    "svgicons": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://svgicons.com/mcp",
        "--header",
        "Authorization: Bearer ${SVGICONS_API_TOKEN}"
      ],
      "env": {
        "SVGICONS_API_TOKEN": "YOUR_API_TOKEN"
      }
    }
  }
}
```

More client guidance: [docs/CLIENTS.md](docs/CLIENTS.md) and [configs/README.md](configs/README.md).

## Official MCP Registry Listing

The server is published in the [Official MCP Registry](https://registry.modelcontextprotocol.io) as `com.svgicons/mcp`. Verify the live listing:

```bash
curl -s "https://registry.modelcontextprotocol.io/v0/servers?search=com.svgicons"
```

Directories that ingest the official registry (such as PulseMCP) pick the listing up automatically.

## Example Agent Prompts

1. "Find me a minimal lock icon that works at 16px and add it to my app's Icon Collection."
2. "Recommend icons for a billing settings page — I need payment method, invoice, and refund concepts — then create a collection called 'Billing UI' with the best ones."
3. "Export my 'Dashboard' collection as React TypeScript components with a 20px default size and download the PNG pack at 2x density."

The [prompt library](prompts/README.md) includes copyable workflows for search, React components, dashboard navigation, emoji replacement, accessibility review, themeable icons, design-system review, Icon Collections, and PNG export. Start with [search icons](prompts/search-icons.md), then move to code or export prompts only after reviewing the tool calls and selected icons.

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
- Give every client the smallest scope set it needs and revoke unused tokens.
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
