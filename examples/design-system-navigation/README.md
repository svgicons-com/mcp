# Design-System Navigation

## Goal

Help a design-system team review and standardize icon choices for product navigation.

## Design-System Context

Use this workflow when multiple product areas need consistent icon style, naming, and accessibility expectations.

## Likely Tools

- `search_icon_sets`
- `recommend_icons_for_ui`
- `search_icons`
- `create_icon_kit`

## Example Prompts

```text
Suggest a consistent icon style for this product navigation. Compare icon sets before recommending individual icons.
```

```text
Review these icon choices for design-system consistency. Call out style mismatches, ambiguous meanings, and naming issues.
```

## Expected MCP Behavior

The client may compare icon sets, recommend icon candidates, search for replacements, and create an Icon Collection when authenticated access is available.

## Review Checklist

- Approved icon sets.
- Stroke and fill style.
- Naming conventions.
- Accessibility expectations.
- Provenance and license notes for team review.

## Security Notes

Do not paste confidential product plans into prompts. Review collection creation tool calls before approval.

## Links

- [Design-system icon review prompt](../../prompts/design-system-icon-review.md)
- [API relationship](../../docs/API_RELATIONSHIP.md)
- <https://github.com/svgicons-com/api>
- <https://github.com/svgicons-com/cli>
