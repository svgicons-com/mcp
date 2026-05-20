---
title: "React button icon workflow"
author: "Svg/icons example team"
status: "example"
workflow_type: "MCP"
mcp_client: "Codex"
tools_used: ["search_icons", "get_icon"]
prompts_used: ["react-component-icons", "accessibility"]
stack: ["React", "TypeScript"]
demo_url:
repo_url:
website_url:
permission_to_feature: false
---

# React Button Icon Workflow

This is a documentation example, not a real customer submission.

## Problem

A React button needs a search icon that fits the surrounding UI and remains accessible.

## Solution

Use the hosted MCP endpoint to search for icon candidates, inspect one selected icon, and ask the AI coding client to produce a small reviewed component change.

## Tools Used

- `search_icons`
- `get_icon`

## Prompts Used

- [React component icons](../../prompts/react-component-icons.md)
- [Accessibility](../../prompts/accessibility.md)

## Workflow

1. Search for candidate icons.
2. Inspect one selected icon.
3. Ask for a React component change using `currentColor`.
4. Review SVG, accessibility behavior, and component naming.

## Review Checklist

- SVG viewBox and dimensions.
- Decorative or meaningful accessibility behavior.
- No unexpected SVG or generated code.
- No tokens or private data included.

## Links

- [React button icon example](../../examples/react-button-icon/)
