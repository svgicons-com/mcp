# React Component Icons

## Problem

Use selected SVG icons in React components while keeping the change small, accessible, and reviewable.

## When To Use

Use this after selecting candidate icons or when a React component needs an inline icon.

## Tools Likely Used

- `search_icons`
- `get_icon`
- `recommend_icons_for_ui`

## Example Prompts

```text
Find a simple search icon and insert it into this React button as an accessible SVG.
```

```text
Convert this selected SVG into a React component using currentColor.
```

```text
Suggest icons for these button labels and explain the choices.
```

## Expected MCP Behavior

The client may search for icon candidates, inspect a chosen icon, and request raw SVG only when authorized. MCP can help retrieve and recommend icons, but code edits still need developer review.

## What To Review

- `currentColor` usage where appropriate.
- `width`, `height`, and `viewBox`.
- `aria-hidden` for decorative icons or accessible title text for meaningful icons.
- Unexpected SVG content.
- Component naming and export style.
- Whether the code matches local React conventions.

## Limitations

The MCP server provides icon data and recommendations. It does not guarantee that the AI client will apply project conventions correctly.

## Security Notes

Do not include tokens in prompts. Treat generated SVG and React code like code from any other source and review before committing.
