# Accessibility

## Problem

Ask the AI coding tool to use SVG icons in a way that matches the icon's role in the interface.

## When To Use

Use this when inserting icons, reviewing existing SVG usage, or deciding whether an icon is decorative or meaningful.

## Tools Likely Used

- `get_icon`
- `search_icons`

## Example Prompts

```text
Insert this icon as decorative with aria-hidden.
```

```text
Insert this icon with an accessible title for screen readers.
```

```text
Review this SVG icon usage for accessibility issues.
```

## Expected MCP Behavior

The client may inspect a selected icon or search for a better semantic fit. The accessibility implementation happens in the project code and must be reviewed in app context.

## What To Review

- Decorative icons use `aria-hidden` where appropriate.
- Meaningful icons have an accessible name through surrounding text, labels, or a title.
- SVG focus behavior is appropriate for the framework and browser targets.
- Icons inside buttons do not replace visible or accessible button text accidentally.
- Generated markup matches the component library conventions.

## Limitations

Accessibility depends on surrounding UI, text, focus behavior, and interaction model. An icon alone cannot prove the interface is accessible.

## Security Notes

Do not paste private user data into accessibility examples. Review generated markup and test the UI with the app's normal accessibility checks.
