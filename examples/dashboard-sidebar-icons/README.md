# Dashboard Sidebar Icons

## Goal

Use MCP to recommend consistent icons for a dashboard sidebar or navigation menu.

## Example Navigation Config

```ts
export const navigation = [
  { label: "Users", href: "/users" },
  { label: "Billing", href: "/billing" },
  { label: "Analytics", href: "/analytics" },
  { label: "Settings", href: "/settings" },
  { label: "Support", href: "/support" }
];
```

## Likely Tools

- `recommend_icons_for_ui`
- `search_icons`
- `search_icon_sets`
- `create_icon_kit`
- `generate_icon_kit_for_project`

## Example Prompts

```text
Recommend consistent icons for this dashboard navigation config. Include icon page URLs and explain the semantic fit.
```

```text
Create an icon kit for these dashboard sections if my account supports it. Show the chosen icons for review first.
```

## Expected MCP Behavior

The client may call `recommend_icons_for_ui`, search for alternatives, compare icon sets, and create an Icon Collection when authenticated access is available.

## Review Checklist

- Visual consistency.
- Semantic fit.
- Duplicate or ambiguous icons.
- Style mismatch.
- Team naming.
- Auth requirements for kit workflows.

## Security Notes

Do not paste private routes or customer data into prompts. Review kit creation tool calls before approval.

## Links

- [Dashboard navigation prompt](../../prompts/dashboard-navigation.md)
- [Design-system review prompt](../../prompts/design-system-icon-review.md)
