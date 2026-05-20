# Examples

These examples describe practical hosted MCP workflows for svgicons.com. They are documentation examples, not executable apps or local MCP server code.

Endpoint:

```text
https://svgicons.com/mcp
```

Setup prerequisite: connect an MCP-compatible client using [configs](../configs/README.md) or [client setup docs](../docs/CLIENTS.md).

Authentication reminder: some workflows require authenticated account permissions and/or Pro Plan access. Anonymous metadata-only access can support discovery, but raw SVG, PNG export, persistent Icon Collections, generated project collections, and collection exports may require authentication.

| Example | Use case | Likely tools used | Auth requirement | Prompt links | Review checklist | Status |
| --- | --- | --- | --- | --- | --- | --- |
| [react-button-icon](react-button-icon/) | Find and insert an icon into a React button. | `search_icons`, `get_icon`, `recommend_icons_for_ui` | Metadata may be anonymous; raw SVG may require auth. | [React](../prompts/react-component-icons.md), [accessibility](../prompts/accessibility.md) | SVG, `currentColor`, accessibility, naming, code review | Documentation example |
| [dashboard-sidebar-icons](dashboard-sidebar-icons/) | Recommend consistent dashboard navigation icons. | `recommend_icons_for_ui`, `search_icons`, `search_icon_sets`, `create_icon_kit`, `generate_icon_kit_for_project` | Kit workflows may require auth. | [Dashboard](../prompts/dashboard-navigation.md), [review](../prompts/design-system-icon-review.md) | Consistency, semantics, duplicates, naming | Documentation example |
| [replace-emoji-with-svg](replace-emoji-with-svg/) | Replace emoji placeholders with SVG icons. | `search_icons`, `get_icon`, `recommend_icons_for_ui` | Metadata may be anonymous; raw SVG may require auth. | [Emoji replacement](../prompts/replace-emoji-with-svg.md), [accessibility](../prompts/accessibility.md) | Semantic match, labels, theming, code review | Documentation example |
| [design-system-navigation](design-system-navigation/) | Review and standardize navigation icons. | `search_icon_sets`, `recommend_icons_for_ui`, `search_icons`, `create_icon_kit` | Collection workflows may require auth. | [Design-system review](../prompts/design-system-icon-review.md) | Approved sets, style, naming, provenance | Documentation example |
| [project-kit-workflow](project-kit-workflow/) | Create or export an Icon Collection workflow. | `create_icon_kit`, `generate_icon_kit_for_project`, `export_icon_collection`, `search_icons`, `recommend_icons_for_ui` | May require authenticated account permissions and/or Pro Plan access. | [Project Kit](../prompts/project-kit-workflow.md) | Kit name, selected icons, export results, files | Documentation example |
| [png-export-workflow](png-export-workflow/) | Request PNG assets where supported. | `export_icon_png`, `search_icons`, `get_icon` | PNG export may require auth. | [PNG export](../prompts/png-export.md) | Dimensions, background, file name, asset use | Documentation example |
| [icon-search-and-review](icon-search-and-review/) | Simple first workflow: search, compare, inspect, review. | `search_icons`, `search_icon_sets`, `get_icon` | Metadata may be anonymous; raw SVG may require auth. | [Search icons](../prompts/search-icons.md) | Several options, visual fit, metadata, code review | Documentation example |

Review generated SVG and code before committing.
