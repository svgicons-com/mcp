# MCP Security

MCP lets AI clients request tool calls against a connected service. Treat the connection as a trusted integration and review tool calls before approval.

## OAuth Safety

Use OAuth where supported by the MCP client. OAuth avoids pasting long-lived secrets into prompts, screenshots, or shared files.

When the browser authorization flow opens, confirm that you are signing in to svgicons.com and that the client is the one you intended to connect.

Do not post OAuth authorization artifacts, browser redirect URLs, session details, or account screenshots publicly.

## Bearer Token Safety

Use bearer tokens only in supported clients that can store headers privately.

Do not place tokens in:

- Public prompts
- Public issues
- Screenshots
- Commit history
- Shared example configs
- Logs copied into support requests

If a token is exposed, rotate it immediately and review recent account activity.

Do not commit bearer-token configs with real values. Use placeholders such as `YOUR_TOKEN` or `SVGICONS_API_TOKEN` in docs and examples.

## Tool-Call Review

Before approving a tool call, review:

- Tool name
- Inputs
- Whether the tool can create, export, or persist data
- Account or project context
- Whether the result may include private data

## Prompt Safety

Prompts are not a safe place for tokens, authorization codes, credentials, private account data, or private project secrets.

Before accepting AI output:

- Review tool calls before approving them.
- Review generated SVG and code.
- Treat generated code like code from any other source.
- Check accessibility labels or decorative icon handling.
- Verify icon license and provenance where relevant.
- Rotate exposed tokens immediately.

## SVG And Code Review

Review AI-generated SVG and code before committing. Treat SVG insertion as code and content insertion because SVG can affect markup, styling, accessibility, and application behavior.

Check generated SVG/code for:

- Unexpected scripts, event handlers, external references, or inline styles.
- Hardcoded colors that break theming.
- Missing `viewBox`, `aria-hidden`, labels, or titles.
- Unwanted file writes or broad refactors.
- License or provenance questions that need team review.

## Third-Party Bridge Tools

Some MCP clients require a local bridge or adapter to reach remote HTTP MCP servers. This repo does not provide an official local Svg/icons MCP server package.

Before sending bearer tokens through a bridge, review:

- Where tokens are stored.
- Whether logs can capture headers.
- How updates are delivered.
- Whether the bridge can access local files.
- Whether the project trusts that bridge for the current workflow.

## Responsible Reporting

For security concerns, use the reporting path in the root [SECURITY.md](../SECURITY.md). Avoid public disclosure of tokens, OAuth artifacts, account data, private screenshots, or private project data.

Useful private reports include:

- A short summary of the issue.
- Affected docs, configs, prompts, or workflows.
- Client name and setup style if relevant.
- Whether OAuth, bearer-token auth, or anonymous metadata-only access was involved.
- Steps to reproduce with secrets removed.
- Screenshots only if they do not expose sensitive data.

Do not post publicly:

- Real tokens or authorization headers.
- OAuth artifacts or private redirect URLs.
- Account identifiers that are not needed for triage.
- Private screenshots, repositories, icons, or customer data.
