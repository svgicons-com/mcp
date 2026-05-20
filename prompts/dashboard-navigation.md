# Dashboard Navigation

## Problem

Create a consistent set of icons for dashboard sidebars, tab bars, and navigation menus.

## When To Use

Use this when a product navigation needs multiple icons that should feel like one set.

## Tools Likely Used

- `recommend_icons_for_ui`
- `search_icons`
- `create_icon_kit`
- `generate_icon_kit_for_project`

## Example Prompts

```text
Create matching sidebar icons for Users, Billing, Analytics, Settings, and Support.
```

```text
Recommend consistent icons for this dashboard navigation config.
```

```text
Create an icon kit for these dashboard sections.
```

## Expected MCP Behavior

The client may recommend icons from a UI description, search for alternatives, and create an Icon Collection when authenticated access is available. Metadata-only recommendations may work without authentication, while kit creation requires account permissions.

## What To Review

- Visual consistency across icons.
- Semantic fit for each navigation label.
- Duplicate or ambiguous icons.
- Design-system naming.
- Whether an Icon Collection action requires authenticated access.

## Limitations

Icon recommendations are a starting point. Review the final set with the product context and visual design system.

## Security Notes

Do not paste private navigation files if they contain sensitive routes or names. Review any kit creation tool call before approval.
