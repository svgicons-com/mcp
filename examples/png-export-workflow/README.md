# PNG Export Workflow

## Goal

Request PNG assets from selected icons where supported by the account and MCP client.

## Auth Note

PNG export may require authenticated account permissions and/or Pro Plan access. Check the tool response, account permissions, and Pro Plan access.

## Likely Tools

- `export_icon_png`
- `search_icons`
- `get_icon`

## Example Prompts

```text
Find a download icon and export it as a transparent 512 px PNG if my account supports it.
```

```text
Export this selected icon as PNG for a toolbar mockup and tell me the generated file name.
```

## Expected MCP Behavior

The client may search for an icon, inspect the selected icon, and call `export_icon_png` when authenticated access is available.

## Review Checklist

- Dimensions.
- Transparent background.
- File name.
- Generated asset usage.
- Whether SVG is better for app UI.

## Security Notes

Do not paste tokens into prompts. Review generated files before adding them to a repository.

## Links

- [PNG export prompt](../../prompts/png-export.md)
