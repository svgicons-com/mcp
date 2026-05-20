# Themeable CurrentColor Icons

## Problem

Use icons that inherit text color and adapt to themes, hover states, focus states, and dark mode.

## When To Use

Use this when inline SVG icons should follow CSS color instead of fixed SVG colors.

## Tools Likely Used

- `get_icon`
- `search_icons`

## Example Prompts

```text
Convert this selected SVG to use currentColor where appropriate.
```

```text
Create a themeable icon component that inherits text color.
```

```text
Review this SVG for hardcoded fill and stroke values.
```

## Expected MCP Behavior

The client may fetch or inspect icon SVG when authorized, then suggest code changes. The MCP server does not automatically transform SVGs; review any transformation the AI client proposes.

## What To Review

- `fill` and `stroke` values.
- `viewBox`, `width`, and `height`.
- `currentColor` usage.
- CSS classes.
- Dark mode behavior.
- Hover and focus states.

## Limitations

Some icons intentionally use multiple colors or filled shapes. Do not force `currentColor` if it breaks the icon's meaning.

## Security Notes

Do not paste tokens into prompts. Review generated SVG changes before committing.
