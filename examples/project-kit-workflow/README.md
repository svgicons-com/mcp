# Project Kit Workflow

## Goal

Use authenticated MCP workflows to create or prepare an Icon Collection for a project.

## Auth Note

Project Kit and collection workflows may require authenticated account permissions and/or Pro Plan access. Check the MCP client response, account permissions, and Pro Plan access.

## Likely Tools

- `create_icon_kit`
- `generate_icon_kit_for_project`
- `export_icon_collection`
- `search_icons`
- `recommend_icons_for_ui`

## Example Prompts

```text
Create an icon kit for this admin dashboard if my account supports it. Show selected icons before exporting.
```

```text
Generate an icon kit for this project navigation file. Group the selected icons by screen.
```

```text
Export the selected icon collection if my account supports it, and tell me what generated files I should review.
```

## Expected MCP Behavior

The client may search and recommend icons, create or generate an Icon Collection, and queue an export when authenticated access is available.

## Review Checklist

- Kit name.
- Selected icons.
- Export results.
- Account permissions.
- Generated files.

## Security Notes

Do not paste tokens or private project secrets into prompts. Review create and export tool calls before approval.

## Links

- [Project Kit workflow prompt](../../prompts/project-kit-workflow.md)
- [Authentication](../../docs/AUTHENTICATION.md)
- [Tools](../../docs/TOOLS.md)
