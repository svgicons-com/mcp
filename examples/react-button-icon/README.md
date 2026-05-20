# React Button Icon

## Goal

Use the hosted Svg/icons MCP endpoint to find an icon and insert it into a React button as a small, reviewable code change.

## Setup Requirements

- An MCP-compatible client connected to `https://svgicons.com/mcp`.
- OAuth or bearer-token authentication if raw SVG is needed.
- A React component ready for review.

## Likely Tools

- `search_icons`
- `get_icon`
- `recommend_icons_for_ui`

## Example Prompt

```text
Find a simple search icon and insert it into this React button as an accessible SVG. Use currentColor where appropriate and keep the component change small.
```

## Expected MCP Behavior

The client may call `search_icons` or `recommend_icons_for_ui` to find candidates, then `get_icon` to inspect the selected icon. Raw SVG retrieval may require authenticated access.

## Example Code Shape

Before:

```tsx
export function SearchButton() {
  return <button type="button">Search</button>;
}
```

After, subject to review:

```tsx
export function SearchButton() {
  return (
    <button type="button" className="inline-flex items-center gap-2">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
        {/* reviewed icon paths */}
      </svg>
      <span>Search</span>
    </button>
  );
}
```

## Review Checklist

- SVG `viewBox`, `width`, and `height`.
- `currentColor` use where appropriate.
- Decorative or meaningful accessibility behavior.
- Component naming and local code conventions.
- No unexpected SVG or generated code.

## Security Notes

Do not paste tokens into the prompt. Review generated SVG and code before committing.

## Links

- [React component icons prompt](../../prompts/react-component-icons.md)
- [Accessibility prompt](../../prompts/accessibility.md)
- [Themeable currentColor prompt](../../prompts/themeable-currentcolor-icons.md)
- [Tools](../../docs/TOOLS.md)
- [Security](../../docs/SECURITY.md)
