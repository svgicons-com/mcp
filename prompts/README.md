# Prompt Library

Use these prompts with an MCP-compatible AI coding client connected to the hosted svgicons.com MCP endpoint.

Endpoint:

```text
https://svgicons.com/mcp
```

Setup prerequisite: connect a compatible client using [configs](../configs/README.md) or [client setup docs](../docs/CLIENTS.md).

Authentication reminder: some prompts may require authenticated account permissions and/or Pro Plan access. Anonymous metadata-only access can support discovery workflows, but raw SVG, PNG export, persistent Icon Collections, generated project collections, and collection exports may require authentication.

## Prompt Files

| File | Use when |
| --- | --- |
| [search-icons.md](search-icons.md) | Searching by concept, name, style, or UI need. |
| [react-component-icons.md](react-component-icons.md) | Preparing React SVG icon component changes after selecting icons. |
| [dashboard-navigation.md](dashboard-navigation.md) | Building consistent dashboard sidebar or navigation icon sets. |
| [replace-emoji-with-svg.md](replace-emoji-with-svg.md) | Replacing emoji placeholders with consistent SVG icons. |
| [accessibility.md](accessibility.md) | Asking for accessible SVG icon usage and review. |
| [themeable-currentcolor-icons.md](themeable-currentcolor-icons.md) | Making icon usage themeable with `currentColor`. |
| [design-system-icon-review.md](design-system-icon-review.md) | Reviewing icon choices for design-system consistency. |
| [project-kit-workflow.md](project-kit-workflow.md) | Creating or preparing Icon Collection workflows. |
| [png-export.md](png-export.md) | Exporting PNG assets where supported. |

## How To Use These Prompts

1. Connect your MCP client to `https://svgicons.com/mcp`.
2. Run a small search prompt first.
3. Review the tool calls before approving them.
4. Review generated SVG and code.
5. Commit only after human review.

## Safety Checklist

- Do not paste tokens into prompts.
- Do not commit generated code blindly.
- Review SVG markup before adding it to a project.
- Add accessibility labels or titles as needed.
- Verify icon license and provenance where relevant.
- Keep design-system naming consistent.
