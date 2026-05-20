# Local Bridge Notes

Some MCP clients may not support hosted remote HTTP MCP directly. Those clients may require a local bridge or adapter that forwards requests to:

```text
https://svgicons.com/mcp
```

This repo does not provide an official local Svg/icons MCP server package or stdio server. There is no official local `@svgicons-com/mcp-server` npm package in this repo.

The svgicons.com website docs mention `mcp-remote` for command-based clients. If you use any third-party remote-MCP bridge, review its security model, update process, token storage, and logging behavior before passing bearer tokens through it.

Security checklist:

- Keep tokens private.
- Prefer OAuth where the client supports it.
- Do not commit bridge configs that include secrets.
- Do not paste tokens into prompts, issues, or screenshots.
- Review generated SVG and code before committing.

If your client cannot use hosted remote MCP or a trusted bridge, use the REST API repo or CLI repo for non-MCP workflows:

- <https://github.com/svgicons-com/api>
- <https://github.com/svgicons-com/cli>
