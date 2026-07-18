# Tools

The hosted svgicons.com MCP endpoint exposes exactly 12 live tools. Tool schemas are provided by the MCP server during `tools/list` discovery. The field notes below are verified from the website implementation and public docs.

Endpoint:

```text
https://svgicons.com/mcp
```

Every tool declares MCP behavior annotations verified from the server definitions: `readOnlyHint: true` on the six read tools, `destructiveHint: true` on `remove_icon_from_collection`, and an explicit `destructiveHint: false` on the five plain write tools. They are listed per tool below.

Every tool result uses MCP tool-call response fields:

- `content`: text content containing JSON for clients that display text.
- `structuredContent`: structured JSON for clients that consume typed output.
- `isError`: `false` for successful tool results and `true` for tool-level errors.

## Access Summary

- Anonymous metadata-only access covers `search_icons`, `search_icon_sets`, `get_icon`, and `recommend_icons_for_ui`. Anonymous calls are rate-limited per method and currently capped at 10 icons per search or recommendation.
- Every other tool — and raw SVG anywhere — requires a Pro token (OAuth or a Pro API personal access token) carrying `mcp:use` plus the per-tool scope listed below: `icons:read`, `collections:read`, `collections:write`, or `exports:create`.
- If a client rejects a tool call, check the MCP client response, the token's scopes, and Pro Plan access.

## `search_icons`

Status: Live

Annotations: `readOnlyHint: true` (read-only).

Purpose: Search icon metadata by query, category, or icon set prefix.

Typical use case: Find candidate icons for a button, navigation item, dashboard, onboarding step, or empty state.

Authentication expectation: Anonymous metadata-only search is supported (currently capped at 10 icons per search; a Pro token raises the cap to 50). `includeSvg` requires a Pro token with `mcp:use` and `icons:read`.

Verified input fields:

- `query` string, required — icon search query, such as "arrow left", "settings", or "github"
- `category` string — optional icon set category, including New
- `iconSetPrefix` string — optional icon set prefix to limit the search
- `limit` integer — max results, 1-50; default 10 (20 with a Pro token); capped at 10 anonymous, 20 member, 50 Pro
- `offset` integer — zero-based result offset for pagination; default 0
- `includeSvg` boolean — include wrapped SVG markup; requires a Pro token with `icons:read`

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

Annotations: `readOnlyHint: true` (read-only).

Purpose: Search icon sets by name, prefix, author, category, or description.

Typical use case: Choose a consistent icon family before selecting individual icons.

Authentication expectation: Anonymous metadata-only access is supported.

Verified input fields:

- `query` string — matched against icon set name, prefix, author, category, and description
- `category` string — optional category, including New
- `limit` integer — icon sets per page, 1-50; default 20
- `page` integer — one-based page number; default 1

Verified output shape:

- `structuredContent.data[]`: icon set objects with fields such as `id`, `name`, `prefix`, `description`, `total`, `author`, `license`, `licenseUrl`, `category`, `statusBadge`, and `pageUrl`
- `structuredContent.meta`: query, category, page, per-page count, total, last page, and access label

Safe example prompt:

```text
Find icon sets that would work for a simple analytics dashboard. Prefer sets with clean UI symbols.
```

## `get_icon`

Status: Live

Annotations: `readOnlyHint: true` (read-only).

Purpose: Fetch one icon by ID.

Typical use case: Inspect an icon selected from search results and optionally request raw SVG when authorized.

Authentication expectation: Metadata is public. Raw SVG requires a Pro token with `mcp:use` and `icons:read`.

Verified input fields:

- `id` integer, required — the catalog icon ID, as shown in search results and icon page URLs
- `includeSvg` boolean — include the raw body and wrapped SVG markup; requires a Pro token with `icons:read`; default false
- `format` string, `metadata` or `svg` — `svg` is an alias for `includeSvg: true`; `metadata` (default) returns metadata only

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

Annotations: `readOnlyHint: false`, `destructiveHint: false` (non-destructive write).

Purpose: Render one icon as a PNG file or a ZIP of PNG variants.

Typical use case: Prepare a PNG asset for a design handoff, documentation screenshot, or non-SVG integration.

Authentication expectation: Requires a Pro token with `mcp:use`, `icons:read`, and `exports:create`.

Verified input fields:

- `id` integer, required — the catalog icon ID
- `iconName` string, required — the icon slug/name from the URL; required to prevent ID-only bulk export
- `sizes` integer array — canvas sizes in pixels, up to 4 of the allowed values 16, 24, 32, 48, 96, 128, 256, 512, 1024; default `[512]`
- `densities` integer array — device-pixel-ratio multipliers 1-4, up to 2; default `[1]`
- `backgroundType` string — `transparent` (default) or `solid`
- `backgroundColor` string — hex background color used when `backgroundType` is `solid`; default `#ffffff`
- `iconColorMode` string — `preserve` (default) keeps source colors; `black`, `white`, or `custom` recolor the icon
- `iconColor` string — hex icon color used when `iconColorMode` is `custom`; default `#000000`
- `padding` integer — padding around the icon in pixels, 0-256; default 48
- `filename` string — base filename for the generated file; defaults to the icon name
- `zip` boolean — return a ZIP of all size and density variants instead of a single PNG; default false

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

Annotations: `readOnlyHint: true` (read-only).

Purpose: Recommend icon candidates for a product screen or UI description.

Typical use case: Ask an assistant to map UI concepts to icon candidates before implementation.

Authentication expectation: Anonymous metadata-only recommendations are supported. Results should be reviewed for style and license fit.

Verified input fields:

- `uiDescription` string, required — product UI, screen, or feature description
- `concepts` string array — optional explicit concept keywords, merged with concepts extracted from the description
- `category` string — optional icon set category filter, including New
- `limit` integer — max recommendations, 1-30 with a Pro token (1-10 otherwise); default 8

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

Annotations: `readOnlyHint: false`, `destructiveHint: false` (non-destructive write).

Purpose: Create a persistent Icon Collection and optionally add selected icon IDs.

Typical use case: Save reviewed icon choices as a reusable collection for later export.

Authentication expectation: Requires a Pro token with `mcp:use` and `collections:write`.

Verified input fields:

- `name` string, required — collection name, up to 120 characters
- `description` string — optional collection description, up to 600 characters
- `iconIds` integer array — catalog icon IDs to add at creation; up to 200, duplicates ignored
- `framework` string — default export framework stored on the collection: `svg` (default), `react-ts`, `vue`, or `sprite`
- `colorPolicy` string — stored color policy: `currentColor` (default) rewrites fills, `preserve` keeps them, `strip` removes them
- `namingPolicy` string — file and component naming: `kebab` (default), `pascal`, or `camel`

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

Annotations: `readOnlyHint: false`, `destructiveHint: false` (non-destructive write).

Purpose: Generate and persist an Icon Collection from a project brief, screens, and required concepts.

Typical use case: Create a starting collection for a new application area that a developer will review before exporting.

Authentication expectation: Requires a Pro token with `mcp:use` and `collections:write`.

Verified input fields:

- `projectName` string — optional collection name; derived from the description when omitted
- `projectDescription` string, required — project brief used to extract icon concepts, up to 1500 characters
- `screens` string array — optional screen or page names that contribute extra concepts
- `requiredConcepts` string array — concepts that must be searched, merged with concepts extracted from the brief
- `category` string — optional icon set category filter, including New
- `maxIcons` integer — maximum icons in the generated collection, 1-64; default 16
- `framework` string — default export framework stored on the collection: `svg` (default), `react-ts`, `vue`, or `sprite`
- `colorPolicy` string — stored color policy: `currentColor` (default) rewrites fills, `preserve` keeps them, `strip` removes them
- `namingPolicy` string — file and component naming: `kebab` (default), `pascal`, or `camel`

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

## `list_icon_collections`

Status: Live

Annotations: `readOnlyHint: true` (read-only).

Purpose: List your persistent Icon Collections with icon counts, an optional name/slug filter, and pagination.

Typical use case: Discover a `collectionId` before reading, extending, or exporting a collection — including collections created in earlier sessions or on the website.

Authentication expectation: Requires a Pro token with `mcp:use` and `collections:read`.

Verified input fields:

- `query` string — optional name or slug filter
- `limit` integer — collections per page, 1-50; default 20
- `page` integer — one-based page number; default 1

Verified output shape:

- `structuredContent.data[]`: collection summaries with `id`, `name`, `slug`, `iconsCount`, and `styledWith`
- `structuredContent.meta`: query, page, per-page count, total, last page, and access label

Safe example prompt:

```text
List my Icon Collections and tell me which ones already cover dashboard navigation.
```

## `get_icon_collection`

Status: Live

Annotations: `readOnlyHint: true` (read-only).

Purpose: Read one Icon Collection with its paginated entries.

Typical use case: Review what a collection already contains — including custom-styled entries created on the website — before deciding what to add or export.

Authentication expectation: Requires a Pro token with `mcp:use` and `collections:read`.

Verified input fields:

- `collectionId` integer or numeric string, required — numeric ID of the collection
- `page` integer — one-based page number; default 1
- `perPage` integer — entries per page, 1-100; default 50

Verified output shape:

- `structuredContent.collection`: collection detail, including `styledWith` and `hasCustomIcons`
- `structuredContent.icons`: paginated entries; each entry includes `entryId` (the entry row id), and custom-icon entries include `customEditId`, `customName`, and their customized SVG snapshot as the `body` — exactly what the website and Pro API show

Safe example prompt:

```text
Show me what is in my Billing UI collection and flag any icons that do not fit the outline style.
```

## `add_icons_to_collection`

Status: Live

Annotations: `readOnlyHint: false`, `destructiveHint: false` (non-destructive write).

Purpose: Add catalog icons to an existing Icon Collection as plain entries.

Typical use case: Extend a collection across sessions after reviewing new search results.

Authentication expectation: Requires a Pro token with `mcp:use` and `collections:write`.

Verified input fields:

- `collectionId` integer or numeric string, required — numeric ID of the collection
- `iconIds` integer array, required — catalog icon IDs to add as plain entries; up to 200 per call, existing entries skipped

Verified output shape:

- `structuredContent.addedIcons`: how many entries were actually created — adding is idempotent and icons already in the collection are skipped
- `structuredContent.meta.access`

Safe example prompt:

```text
Add the reviewed invoice, receipt, and refund icons to my Billing UI collection.
```

## `remove_icon_from_collection`

Status: Live

Annotations: `readOnlyHint: false`, `destructiveHint: true` (destructive write — clients may ask for confirmation).

Purpose: Remove an icon from an Icon Collection.

Typical use case: Curate a collection without a website round-trip.

Authentication expectation: Requires a Pro token with `mcp:use` and `collections:write`.

Verified input fields:

- `collectionId` integer or numeric string, required — numeric ID of the collection
- `iconId` integer, required — numeric ID of the catalog icon whose entry should be removed
- `allVariants` boolean — default `false`: entry-precise, only the plain entry is removed and custom variants survive; `true` removes every entry of the icon, including custom variants

Verified output shape:

- `structuredContent`: removal result and updated collection metadata
- `structuredContent.meta.access`

The tool is entry-precise by default: only the plain entry is removed and custom-icon variants of the same icon survive, matching the website behavior. Pass `allVariants: true` to remove every entry of the icon. Note the Pro REST API's `DELETE .../icons/{icon}` defaults the other way (`all_variants: true`) for backward compatibility.

Safe example prompt:

```text
Remove the duplicate settings icon from my Dashboard collection but keep the styled variant.
```

## `export_icon_collection`

Status: Live

Annotations: `readOnlyHint: false`, `destructiveHint: false` (non-destructive write).

Purpose: Queue an Icon Collection export.

Typical use case: Export a reviewed collection as SVG folders, sprites, manifests, framework components, PNG packs, Iconify JSON, Storybook galleries, or package scaffolds.

Authentication expectation: Requires a Pro token with `mcp:use` and `exports:create`.

Verified input fields:

- `collectionId` integer or numeric string, required — numeric ID of the collection
- `formats` string array — formats to build; `png` is shorthand for `png-pack`; defaults to the basic set: SVG folder, SVG sprite, JSON manifest, license manifest
- `colorPolicy` string — `currentColor` rewrites fills, `preserve` keeps them, `strip` removes them; when omitted, collections carrying styling (applied style or custom icons) default to `preserve` and plain collections use the collection's stored policy (`currentColor` unless changed)
- `namingPolicy` string — `kebab`, `pascal`, or `camel`; when omitted, uses the collection's stored policy (`kebab` unless changed)
- `sizeProps` boolean — emit size props on framework components; default true
- `typescript` boolean — emit TypeScript where the format supports it; default true
- `defaultSize` integer — default component render size in pixels, 1-1024; default 24
- `titleProp` boolean — include an accessible title prop on components; default true
- `decorative` boolean — mark components decorative (aria-hidden) by default; default true
- `componentSuffix` string — component name suffix, 1-32 letters or digits starting with a letter; default `Icon`
- `packageName` string — npm package name for `npm-package` exports, lowercase, optionally scoped
- `packageVersion` string — semver version for `npm-package` exports, such as 1.0.0; default 0.1.0
- `png` object — PNG pack options: `sizes` (up to 6 allowed pixel values, default `[512]`), `densities` (1-3, default `[1]`), `backgroundType` and `backgroundColor`, `iconColorMode` and `iconColor`, `padding` 0-256 pixels (default 48)

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

Export behavior notes:

- Custom-icon entries export their customized snapshot under a unique derived filename — the customization is kept, not replaced by the catalog icon.
- When `colorPolicy` is omitted, collections that carry styling (an applied style or custom-icon entries) default to `preserve` so exported files keep the customization's colors; plain collections keep the `currentColor` default. An explicit `colorPolicy` always wins.

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
| `list_icon_collections` | [Project Kit workflow](../prompts/project-kit-workflow.md) |
| `get_icon_collection` | [Project Kit workflow](../prompts/project-kit-workflow.md), [Design-system icon review](../prompts/design-system-icon-review.md) |
| `add_icons_to_collection` | [Project Kit workflow](../prompts/project-kit-workflow.md), [Dashboard navigation](../prompts/dashboard-navigation.md) |
| `remove_icon_from_collection` | [Project Kit workflow](../prompts/project-kit-workflow.md) |
| `export_icon_collection` | [Project Kit workflow](../prompts/project-kit-workflow.md) |

## Related Links

- [Authentication](AUTHENTICATION.md)
- [API relationship](API_RELATIONSHIP.md)
- [Prompting guide](PROMPTING_GUIDE.md)
- [Prompt library](../prompts/README.md)
- <https://svgicons.com/docs/mcp-server>
- <https://svgicons.com/developers/mcp>
