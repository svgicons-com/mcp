# Prompting Guide

Use this guide with the [prompt library](../prompts/README.md) and a connected MCP-compatible client.

Endpoint:

```text
https://svgicons.com/mcp
```

## Effective MCP Prompts

Good prompts give the assistant enough context to choose useful MCP tools and produce output a developer can review.

Include:

- Product or page context.
- Icon style or set constraints.
- Whether the task is discovery, code insertion, review, export, or kit creation.
- Accessibility expectations.
- Theme behavior, such as `currentColor`.
- A request to keep changes small and easy to inspect.

Start with search before code modification. Ask for several icon options and ask the assistant to explain why each candidate fits.

## Workflow Pattern

1. Ask for icon options.
2. Compare candidates and choose one.
3. Ask for accessible usage.
4. Ask for themeable output when relevant.
5. Review tool calls before approval.
6. Review generated SVG and code.
7. Commit only after human review.

## Prompt Patterns

### Find

```text
Find five outline-style icons for account settings. Include icon page URLs and a short rationale for each.
```

### Compare

```text
Compare these icon candidates for a billing dashboard. Prefer consistent stroke style and clear semantics.
```

### Insert

```text
Insert the selected icon into this button as an accessible inline SVG. Keep the component change small and use currentColor where appropriate.
```

### Refactor

```text
Replace these emoji placeholders with SVG icons from Svg/icons. Keep labels and component names consistent with the surrounding code.
```

### Review

```text
Review this SVG icon usage for accessibility, hardcoded colors, and design-system naming issues.
```

### Export

```text
Export this selected icon as a transparent PNG if my account supports it. Tell me what file was generated and what I should verify.
```

### Create Kit

```text
Create an Icon Collection for this dashboard navigation if my account supports it. Show the selected icons for review before export.
```

## Safety Rules

- Do not paste secrets into prompts.
- Do not ask the assistant to bypass authentication.
- Use Project Kit and export prompts only when the account is authorized for those workflows.
- Review tool calls before accepting them.
- Review generated SVG and code before committing.
- Verify icon license and provenance where relevant.

## Prompt Library

- [Search icons](../prompts/search-icons.md)
- [React component icons](../prompts/react-component-icons.md)
- [Dashboard navigation](../prompts/dashboard-navigation.md)
- [Replace emoji with SVG](../prompts/replace-emoji-with-svg.md)
- [Accessibility](../prompts/accessibility.md)
- [Themeable currentColor icons](../prompts/themeable-currentcolor-icons.md)
- [Design-system icon review](../prompts/design-system-icon-review.md)
- [Project Kit workflow](../prompts/project-kit-workflow.md)
- [PNG export](../prompts/png-export.md)
