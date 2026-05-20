# Security Policy

Report security concerns privately through the contact path published by svgicons.com, or by opening a minimal public issue that requests a private security contact without including sensitive details.

Do not disclose real tokens, OAuth artifacts, account data, private icons, private screenshots, or private project data in issues, prompts, examples, or commits.

If a token is exposed:

1. Revoke or rotate it immediately.
2. Remove it from local files, screenshots, issue text, and commit history where practical.
3. Review recent account and API activity.
4. Replace it only in a private secret store or a supported MCP client configuration.

Use OAuth where supported by the MCP client. Use bearer tokens only in supported clients that can store headers privately.

MCP clients may ask before invoking tools. Review the requested tool call, inputs, and destination before approving sensitive actions.

Review AI-generated SVG and code before committing. Treat SVG insertion as code and content insertion because SVG can affect markup, styling, accessibility, and application behavior.

For detailed guidance, see [docs/SECURITY.md](docs/SECURITY.md).
