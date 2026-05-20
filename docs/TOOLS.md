# Tools

The hosted svgicons.com MCP endpoint exposes exactly eight live tools. Tool schemas are provided by the MCP server during `tools/list` discovery. The field notes below are verified from the website implementation and public docs.

Endpoint:

```text
https://svgicons.com/mcp
```

Every tool result uses MCP tool-call response fields:

- `content`: text content containing JSON for clients that display text.
- `structuredContent`: structured JSON for clients that consume typed output.
- `isError`: `false` for successful tool results and `true` for tool-level errors.

## Access Summary

- Anonymous metadata-only access is supported for supported metadata workflows.
- Authenticated account and/or Pro Plan access may be required where the requested operation returns raw SVG, creates or exports assets, or persists Icon Collections.
- If a client rejects a tool call, check the MCP client response, svgicons.com account permissions, and Pro Plan access.

## `search_icons`

Status: Live

Purpose: Search icon metadata by query, category, or icon set prefix.

Typical use case: Find candidate icons for a button, navigation item, dashboard, onboarding step, or empty state.

Authentication expectation: Anonymous metadata-only search is supported. `includeSvg` may require authenticated account and/or Pro Plan access with raw SVG permission.

Verified input fields:

- `query` string, required
- `category` string
- `iconSetPrefix` string
- `limit` integer
- `offset` integer
- `includeSvg` boolean

Verified output shape:

- `structuredContent.data[]`: icon objects with metadata such as `id`, `name`, `label`, `width`, `height`, `category`, `pageUrl`, and `iconSet`
- `structuredContent.data[].svg`, `body`, and `svgUrl`: only when raw SVG is requested and authorized
- `structuredContent.meta`: query, filters, pagination fields, access label, and whether SVG was included

Safe example prompt:

```text
Search Svg/icons for outline icons that fit a compact settings sidebar. Return icon page links and explain the best matches.
```

## `search_icon_sets`

Status: Live

Purpose: Search icon sets by name, prefix, author, category, or description.

Typical use case: Choose a consistent icon family before selecting individual icons.

Authentication expectation: Anonymous metadata-only access is supported.

Verified input fields:

- `query` string
- `category` string
- `limit` integer
- `page` integer

Verified output shape:

- `structuredContent.data[]`: icon set objects with fields such as `id`, `name`, `prefix`, `description`, `total`, `author`, `license`, `licenseUrl`, `category`, `statusBadge`, and `pageUrl`
- `structuredContent.meta`: query, category, page, per-page count, total, last page, and access label

Safe example prompt:

```text
Find icon sets that would work for a simple analytics dashboard. Prefer sets with clean UI symbols.
```

## `get_icon`

Status: Live

Purpose: Fetch one icon by ID.

Typical use case: Inspect an icon selected from search results and optionally request raw SVG when authorized.

Authentication expectation: Metadata is public. Raw SVG may require authenticated account and/or Pro Plan access.

Verified input fields:

- `id` integer, required
- `includeSvg` boolean
- `format` string, `metadata` or `svg`

Verified output shape:

- `structuredContent.icon`: icon metadata
- `structuredContent.icon.svg`, `body`, and `svgUrl`: only when raw SVG is requested and authorized
- `structuredContent.meta.access`
- `structuredContent.meta.svgIncluded`

Safe example prompt:

```text
Get metadata for icon ID 123 and explain whether it fits a destructive action button.
```

## `export_icon_png`

Status: Live

Purpose: Render one icon as a PNG file or a ZIP of PNG variants.

Typical use case: Prepare a PNG asset for a design handoff, documentation screenshot, or non-SVG integration.

Authentication expectation: Requires authenticated account and/or Pro Plan access with icon-read and export permission.

Verified input fields:

- `id` integer, required
- `iconName` string, required
- `sizes` integer array
- `densities` integer array
- `backgroundType` string
- `backgroundColor` string
- `iconColorMode` string
- `iconColor` string
- `padding` integer
- `filename` string
- `zip` boolean

Verified output shape:

- `structuredContent.icon`: icon metadata
- `structuredContent.file.filename`
- `structuredContent.file.contentType`
- `structuredContent.file.encoding`
- `structuredContent.file.dataBase64`
- `structuredContent.file.dataUri`
- `structuredContent.file.files`
- `structuredContent.file.bytes`
- `structuredContent.meta.access`
- `structuredContent.meta.note`

Safe example prompt:

```text
Find a download icon and export a 512 px transparent PNG for the best candidate.
```

## `recommend_icons_for_ui`

Status: Live

Purpose: Recommend icon candidates for a product screen or UI description.

Typical use case: Ask an assistant to map UI concepts to icon candidates before implementation.

Authentication expectation: Anonymous metadata-only recommendations are supported. Results should be reviewed for style and license fit.

Verified input fields:

- `uiDescription` string, required
- `concepts` string array
- `category` string
- `limit` integer

Verified output shape:

- `structuredContent.data[]`: recommendation objects with `concept`, `rationale`, and `icon`
- `structuredContent.meta.concepts`
- `structuredContent.meta.limit`
- `structuredContent.meta.access`
- `structuredContent.meta.note`

Safe example prompt:

```text
Recommend icons for a billing dashboard with invoices, payment methods, usage, account settings, and notifications.
```

## `create_icon_kit`

Status: Live

Purpose: Create a persistent Icon Collection and optionally add selected icon IDs.

Typical use case: Save reviewed icon choices as a reusable collection for later export.

Authentication expectation: Requires authenticated account and/or Pro Plan access with collection-write permission.

Verified input fields:

- `name` string, required
- `description` string
- `iconIds` integer array
- `framework` string
- `colorPolicy` string
- `namingPolicy` string

Verified output shape:

- `structuredContent.kit`: Icon Collection summary
- `structuredContent.addedIcons`
- `structuredContent.meta.access`

Safe example prompt:

```text
Create an Icon Collection named Billing Settings UI from the reviewed icon IDs for invoice, receipt, payment method, lock, and user.
```

## `generate_icon_kit_for_project`

Status: Live

Purpose: Generate and persist an Icon Collection from a project brief, screens, and required concepts.

Typical use case: Create a starting collection for a new application area that a developer will review before exporting.

Authentication expectation: Requires authenticated account and/or Pro Plan access with collection-write permission.

Verified input fields:

- `projectName` string
- `projectDescription` string, required
- `screens` string array
- `requiredConcepts` string array
- `category` string
- `maxIcons` integer
- `framework` string
- `colorPolicy` string
- `namingPolicy` string

Verified output shape:

- `structuredContent.kit`: Icon Collection summary
- `structuredContent.icons[]`: selected icon metadata
- `structuredContent.addedIcons`
- `structuredContent.meta.concepts`
- `structuredContent.meta.access`
- `structuredContent.meta.note`

Safe example prompt:

```text
Generate an Icon Collection for a project with dashboard, billing, user management, security, notifications, and settings screens.
```

## `export_icon_collection`

Status: Live

Purpose: Queue an Icon Collection export.

Typical use case: Export a reviewed collection as SVG folders, sprites, manifests, framework components, PNG packs, Iconify JSON, Storybook galleries, or package scaffolds.

Authentication expectation: Requires authenticated account and/or Pro Plan access with export permission.

Verified input fields:

- `collectionId` integer or string, required
- `formats` string array
- `colorPolicy` string
- `namingPolicy` string
- `sizeProps` boolean
- `typescript` boolean
- `defaultSize` integer
- `titleProp` boolean
- `decorative` boolean
- `componentSuffix` string
- `packageName` string
- `packageVersion` string
- `png` object

Verified format values include:

- `svg-folder`
- `svg-sprite`
- `json-manifest`
- `license-manifest`
- `react-ts`
- `vue`
- `svelte`
- `solid`
- `blade`
- `storybook`
- `npm-package`
- `png-pack`
- `iconify-json`
- `png` as shorthand for `png-pack`

Verified output shape:

- `structuredContent.export`: queued export metadata
- `structuredContent.meta.access`
- `structuredContent.meta.note`

Safe example prompt:

```text
Queue a PNG pack export for this reviewed Icon Collection and tell me what status URL to check.
```

## Not Documented As Live

The following are not documented as live Svg/icons MCP surfaces in this repo:

- A local Svg/icons MCP server package.
- A local Svg/icons stdio MCP server.
- MCP tools under `/api/v1`, which is not the live Svg/icons MCP surface.
- MCP tools for framework export formats beyond the live `export_icon_collection` tool.
- Any tool not listed on this page.

## Prompt Examples By Tool

| Tool | Useful prompt docs |
| --- | --- |
| `search_icons` | [Search icons](../prompts/search-icons.md), [React component icons](../prompts/react-component-icons.md), [Replace emoji with SVG](../prompts/replace-emoji-with-svg.md) |
| `search_icon_sets` | [Search icons](../prompts/search-icons.md), [Design-system icon review](../prompts/design-system-icon-review.md) |
| `get_icon` | [React component icons](../prompts/react-component-icons.md), [Accessibility](../prompts/accessibility.md), [Themeable currentColor icons](../prompts/themeable-currentcolor-icons.md) |
| `export_icon_png` | [PNG export](../prompts/png-export.md) |
| `recommend_icons_for_ui` | [Dashboard navigation](../prompts/dashboard-navigation.md), [Design-system icon review](../prompts/design-system-icon-review.md), [Project Kit workflow](../prompts/project-kit-workflow.md) |
| `create_icon_kit` | [Dashboard navigation](../prompts/dashboard-navigation.md), [Design-system icon review](../prompts/design-system-icon-review.md), [Project Kit workflow](../prompts/project-kit-workflow.md) |
| `generate_icon_kit_for_project` | [Dashboard navigation](../prompts/dashboard-navigation.md), [Project Kit workflow](../prompts/project-kit-workflow.md) |
| `export_icon_collection` | [Project Kit workflow](../prompts/project-kit-workflow.md) |

## Related Links

- [Authentication](AUTHENTICATION.md)
- [API relationship](API_RELATIONSHIP.md)
- [Prompting guide](PROMPTING_GUIDE.md)
- [Prompt library](../prompts/README.md)
- <https://svgicons.com/docs/mcp-server>
- <https://svgicons.com/developers/mcp>
