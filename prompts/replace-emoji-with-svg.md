# Replace Emoji With SVG

## Problem

Replace emoji placeholders with consistent SVG icons that match the surrounding UI.

## When To Use

Use this when cards, tables, empty states, or navigation items use emoji as temporary visual markers.

## Tools Likely Used

- `search_icons`
- `get_icon`
- `recommend_icons_for_ui`

## Example Prompts

```text
Replace the emoji placeholders in this pricing table with matching SVG icons.
```

```text
Find SVG icons for these feature cards: fast, secure, customizable, collaborative.
```

## Expected MCP Behavior

The client may recommend icons for each concept, search for alternatives, and inspect selected icons. Raw SVG insertion requires authenticated access and should be reviewed before committing.

## What To Review

- Semantic match between the former emoji and selected icon.
- Accessibility labels or decorative icon handling.
- Visual style consistency.
- Theme behavior.
- Generated code changes.

## Limitations

Emoji and SVG icons can carry different tone and meaning. Review the replacement in the real UI.

## Security Notes

Do not paste secrets or private copy into prompts. Review generated SVG markup and code before committing.
