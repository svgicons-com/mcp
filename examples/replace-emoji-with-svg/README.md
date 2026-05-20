# Replace Emoji With SVG

## Goal

Replace emoji placeholders with consistent SVG icons from the hosted MCP workflow.

## Example UI Snippet

```tsx
const features = [
  { icon: "⚡", label: "Fast setup" },
  { icon: "🔒", label: "Secure access" },
  { icon: "🎨", label: "Customizable UI" },
  { icon: "🤝", label: "Team workflows" }
];
```

## Likely Tools

- `search_icons`
- `get_icon`
- `recommend_icons_for_ui`

## Example Prompt

```text
Replace the emoji placeholders in this feature list with matching SVG icons. Prefer a consistent style, use currentColor where appropriate, and explain each choice.
```

## Expected MCP Behavior

The client may recommend icons for each feature label, search for alternatives, and inspect selected icons. Raw SVG retrieval may require authenticated access.

## Review Checklist

- Semantic match.
- Visual style.
- Accessibility labels or decorative handling.
- Theming and `currentColor`.
- Generated code review.

## Security Notes

Do not paste private feature plans or credentials into prompts. Review SVG and component changes before committing.

## Links

- [Replace emoji prompt](../../prompts/replace-emoji-with-svg.md)
- [Accessibility prompt](../../prompts/accessibility.md)
