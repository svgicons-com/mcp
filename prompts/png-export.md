# PNG Export

## Problem

Export PNG assets from selected icons where supported by the connected account and MCP client.

## When To Use

Use this for mockups, documentation, handoff assets, or integrations that specifically need PNG files.

## Tools Likely Used

- `export_icon_png`
- `get_icon`
- `search_icons`

## Example Prompts

```text
Find a download icon and export it as a PNG if my account supports it.
```

```text
Export this selected icon as PNG for a toolbar mockup.
```

## Expected MCP Behavior

The client may search for an icon, inspect the selected icon, and call `export_icon_png` when authenticated access is available. The tool returns a JSON-safe payload that the client may use to write an asset file.

## What To Review

- Requested size.
- Transparent background if relevant.
- Generated asset dimensions.
- File naming.
- Whether PNG is intended instead of inline SVG.

## Limitations

PNG export is not a replacement for inline SVG in every app. Use PNG only when the workflow needs raster output.

## Security Notes

Do not paste tokens into prompts. Review generated files before adding them to a repository.
