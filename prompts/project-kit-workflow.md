# Project Kit Workflow

## Problem

Create or prepare an Icon Collection for a project, feature area, or design-system slice.

## When To Use

Use this when a team wants a reusable set of selected icons that can be reviewed and exported.

## Tools Likely Used

- `create_icon_kit`
- `generate_icon_kit_for_project`
- `export_icon_collection`
- `search_icons`
- `recommend_icons_for_ui`

## Example Prompts

```text
Create an icon kit for this admin dashboard.
```

```text
Generate an icon kit for this project navigation file.
```

```text
Export the selected icon collection if my account supports it.
```

## Expected MCP Behavior

The client may search and recommend icons first, then create or generate an Icon Collection when authenticated access is available. Exporting a collection may require account permissions.

## What To Review

- Selected icons.
- Kit naming.
- Export format if supported.
- Generated files.
- Team workflow and ownership.
- Whether the action creates or exports account resources.

## Limitations

Generated kits are starting points. Review visual consistency, naming, and provenance before using exported files.

## Security Notes

Do not paste tokens or private project secrets into prompts. Review create and export tool calls before approval.
