# Icon Search And Review

## Goal

Run a simple first workflow: search, compare, inspect, and review icon candidates.

## Likely Tools

- `search_icons`
- `search_icon_sets`
- `get_icon`

## Example Prompts

```text
Search for five settings icons suitable for an account page. Include icon page URLs and explain the differences.
```

```text
Compare icon sets that would fit a compact admin dashboard. Recommend one set to inspect first.
```

## Expected MCP Behavior

The client may search icon metadata, compare icon sets, and inspect one selected icon. Anonymous metadata-only access may be enough for this workflow.

## Review Checklist

- Inspect several options.
- Verify visual fit.
- Verify metadata and provenance when relevant.
- Do not accept generated code blindly.

## Security Notes

Do not paste tokens or private project data into prompts. Review selected icons before asking the client to edit code.

## Links

- [Search icons prompt](../../prompts/search-icons.md)
- [Tools](../../docs/TOOLS.md)
