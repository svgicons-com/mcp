# Troubleshooting

## Client Cannot Connect To The Endpoint

Confirm the endpoint is exactly:

```text
https://svgicons.com/mcp
```

The client must support hosted remote MCP over HTTP JSON-RPC, or it must use a verified bridge that forwards to the hosted endpoint.

## JSON Config Does Not Parse

Validate commas, quotes, and braces. The files in [configs](../configs/README.md) are reference examples; each MCP client has its own config shape.

Do not paste comments into JSON files unless the client explicitly supports them.

## Client Ignores The Remote URL

Confirm the client supports hosted remote HTTP MCP. Some clients only launch local commands and require a bridge or adapter. See [local bridge notes](../configs/local-bridge-notes.md).

## OAuth Flow Does Not Start

Confirm that the client supports OAuth for remote MCP and that you selected OAuth in the client setup. Allow browser popups for the client if needed.

If the client asks for manual OAuth details that are not documented by svgicons.com, stop and check the current setup docs instead of inventing client IDs, secrets, or callback URLs.

## Client Does Not Support OAuth

Use anonymous metadata-only access if that is enough for the workflow, or use a client that supports private bearer headers. Do not paste bearer tokens into public prompts or examples.

## Client Does Not Support Remote HTTP MCP

Some clients only launch local commands. Those clients need a verified bridge or adapter before they can use `https://svgicons.com/mcp`. This repo does not provide a local Svg/icons MCP server package.

## Client Requires Stdio Or Local Command

Use a trusted bridge or adapter if needed. Review the bridge security model, token handling, logs, and update process before sending bearer tokens through it.

## Bridge Security Concerns

If a bridge asks for broad file permissions, stores tokens in plain text, logs request headers, or asks you to paste tokens into chat, stop and review the bridge before continuing. Prefer OAuth where the client supports it.

## No Tools Visible

Confirm that the server URL is correct and that the client has refreshed tool discovery. The live tools are listed in [TOOLS.md](TOOLS.md).

If tools remain missing after OAuth, reconnect or reauthorize the MCP server in the client.

## Tool Call Rejected

Read the MCP client response. Tool-level errors can indicate missing authentication, missing account permission, invalid input, or an unsupported operation.

## Anonymous Access Only Returns Limited Metadata

This is expected. Anonymous metadata-only access can support discovery workflows, but raw SVG, PNG export, persistent Icon Collections, generated project collections, and collection exports may require authenticated account permissions and/or Pro Plan access.

## Pro Or Account Feature Unavailable

Confirm that the account is connected, the token or OAuth session is valid, the account has the required permissions, and Pro Plan access is available when the workflow needs it. Check [AUTHENTICATION.md](AUTHENTICATION.md) and [TOOLS.md](TOOLS.md).

## Bearer Token Not Accepted

Confirm the client sends:

```text
Authorization: Bearer YOUR_TOKEN
```

Confirm the token is stored privately, has not expired or been revoked, and is available to the same process that runs the client.

For Codex, confirm `SVGICONS_API_TOKEN` is available in the same shell or environment where Codex runs.

## Token Accidentally Exposed

Rotate the token immediately, remove it from public locations, and review recent account activity. Do not include the exposed token in an issue.

## Generated SVG Or Code Needs Review

Review AI-generated SVG and code before committing. Treat SVG insertion as code and content insertion because it can affect markup, styling, accessibility, and application behavior.

If generated SVG or code looks too broad, ask the assistant to make a smaller change, preserve the surrounding code style, and explain each generated file change before you accept it.

## Exported PNG Or Icon Kit Not Available

PNG export requires a valid icon ID and matching icon name. Icon Collection creation and export may require authenticated account permissions and/or Pro Plan access. For queued collection exports, check the returned export status metadata.

## Tool Did Not Run

Ask the client to use the Svg/icons MCP server directly, and confirm the server is connected. Some clients answer from model context unless a tool call is explicitly requested or approved.

## Prompt Returns A Generic Answer

Start with a concrete search prompt such as:

```text
Use the Svg/icons MCP server to search for five settings icons and include icon page URLs.
```

Then review whether the client requested `search_icons` or another live tool.

## Too Many Icon Choices

Ask for a smaller number of candidates and include constraints such as style, icon set, UI location, or semantic role.

## Icon Style Is Inconsistent

Ask the assistant to compare icon sets before choosing individual icons, or use the [design-system review prompt](../prompts/design-system-icon-review.md).

## Generated Component Has Hardcoded Colors

Use the [themeable currentColor prompt](../prompts/themeable-currentcolor-icons.md) and review `fill`, `stroke`, CSS classes, and dark mode behavior.

## Accessibility Labels Are Missing

Use the [accessibility prompt](../prompts/accessibility.md). Review whether the icon is decorative or meaningful in the surrounding UI.

## Project Kit Or Export Prompt Fails

Project Kit and export workflows may require authenticated account permissions and/or Pro Plan access. Check the tool response, account permissions, Pro Plan access, and [authentication docs](AUTHENTICATION.md).

## CI Or Validation Fails

Run the same local checks used by CI:

```bash
npm ci
npm run validate
git diff --check
```

If validation fails, read the exact file and line reported by the script. Most failures are caused by unsupported setup wording, missing review notes, non-placeholder token examples, malformed JSON/YAML, or a missing required doc.

## Config Validation Fails

Confirm JSON examples parse and use placeholders such as `YOUR_TOKEN`. Do not add comments to JSON examples unless the target client supports them.

## Where To Check

- [Config index](../configs/README.md)
- [Authentication](AUTHENTICATION.md)
- [Clients](CLIENTS.md)
- [Tools](TOOLS.md)
- [Prompt library](../prompts/README.md)
- <https://svgicons.com/docs/mcp-server>
