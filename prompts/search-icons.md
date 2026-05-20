# Search Icons

## Problem

Find SVG icon candidates by concept, name, style, or UI need without leaving an MCP-compatible AI coding client.

## When To Use

Use this when you need candidate icons before editing code, creating a kit, or exporting an asset.

## Tools Likely Used

- `search_icons`
- `search_icon_sets`
- `get_icon`

## Example Prompts

```text
Search for a simple search icon and show me five options.
```

```text
Find outline-style icons for upload, download, settings, and user profile.
```

```text
Find icons that could represent billing, analytics, and support.
```

## Expected MCP Behavior

The client may call `search_icons` for matching icon metadata, `search_icon_sets` to compare icon families, and `get_icon` to inspect a selected icon. Anonymous metadata-only access may be enough for discovery. Raw SVG requires authenticated access.

## What To Review

- Icon names and page URLs.
- Visual style consistency.
- Semantic fit for the UI.
- Whether raw SVG was requested.
- License and provenance where relevant.

## Limitations

Search results are candidates, not final design approval. Review the icon visually before adding it to a product.

## Security Notes

Do not paste tokens or private project data into the prompt. Review tool calls before allowing raw SVG retrieval.
