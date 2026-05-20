# Design-System Icon Review

## Problem

Evaluate whether icon choices are consistent enough for a product or design system.

## When To Use

Use this when standardizing icon choices across navigation, buttons, empty states, alerts, or feature cards.

## Tools Likely Used

- `recommend_icons_for_ui`
- `search_icons`
- `search_icon_sets`
- `create_icon_kit`

## Example Prompts

```text
Review these icon choices for a design system.
```

```text
Suggest a consistent icon style for this product navigation.
```

```text
Find icons from compatible sets for these UI labels.
```

## Expected MCP Behavior

The client may search icon sets, compare icon candidates, recommend alternatives, and create an Icon Collection when authenticated access is available.

## What To Review

- Style consistency.
- Stroke and fill style.
- Naming conventions.
- Semantic clarity.
- License and provenance where relevant.
- Team approval process before adoption.

## Limitations

MCP can surface candidates and metadata, but design-system approval remains a team decision.

## Security Notes

Do not paste private roadmap or customer data into prompts. Review any collection creation tool call before approval.
