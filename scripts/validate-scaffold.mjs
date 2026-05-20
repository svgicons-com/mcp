import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

const liveTools = [
  'search_icons',
  'search_icon_sets',
  'get_icon',
  'export_icon_png',
  'recommend_icons_for_ui',
  'create_icon_kit',
  'generate_icon_kit_for_project',
  'export_icon_collection'
];

const promptFiles = [
  'prompts/README.md',
  'prompts/search-icons.md',
  'prompts/react-component-icons.md',
  'prompts/dashboard-navigation.md',
  'prompts/replace-emoji-with-svg.md',
  'prompts/accessibility.md',
  'prompts/themeable-currentcolor-icons.md',
  'prompts/design-system-icon-review.md',
  'prompts/project-kit-workflow.md',
  'prompts/png-export.md'
];

const exampleFiles = [
  'examples/README.md',
  'examples/react-button-icon/README.md',
  'examples/dashboard-sidebar-icons/README.md',
  'examples/replace-emoji-with-svg/README.md',
  'examples/design-system-navigation/README.md',
  'examples/project-kit-workflow/README.md',
  'examples/png-export-workflow/README.md',
  'examples/icon-search-and-review/README.md'
];

const useCaseFiles = [
  'use-cases/README.md',
  'use-cases/TEMPLATE.md',
  'use-cases/examples/README.md',
  'use-cases/examples/react-button-icon.md',
  'use-cases/examples/dashboard-sidebar-icons.md',
  'use-cases/examples/ai-coding-icon-search.md',
  'use-cases/examples/design-system-icon-review.md',
  'use-cases/examples/project-kit-workflow.md'
];

const sampleUseCaseFiles = [
  'use-cases/examples/react-button-icon.md',
  'use-cases/examples/dashboard-sidebar-icons.md',
  'use-cases/examples/ai-coding-icon-search.md',
  'use-cases/examples/design-system-icon-review.md',
  'use-cases/examples/project-kit-workflow.md'
];

const issueTemplateFiles = [
  '.github/ISSUE_TEMPLATE/use-case.yml',
  '.github/ISSUE_TEMPLATE/mcp-feedback.yml',
  '.github/ISSUE_TEMPLATE/bug-report.yml',
  '.github/ISSUE_TEMPLATE/config-help.yml',
  '.github/ISSUE_TEMPLATE/config.yml'
];

const requiredFiles = [
  'README.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'LICENSE',
  '.gitignore',
  '.editorconfig',
  'package.json',
  'package-lock.json',
  'docs/AUTHENTICATION.md',
  'docs/CLIENTS.md',
  'docs/TOOLS.md',
  'docs/SECURITY.md',
  'docs/TROUBLESHOOTING.md',
  'docs/API_RELATIONSHIP.md',
  'docs/PROMPTING_GUIDE.md',
  'configs/README.md',
  'configs/chatgpt-codex.md',
  'configs/codex.example.md',
  'configs/generic-remote-mcp.example.json',
  'configs/bearer-token.example.json',
  'configs/oauth-client-notes.md',
  'configs/local-bridge-notes.md',
  ...exampleFiles,
  ...promptFiles,
  ...useCaseFiles,
  ...issueTemplateFiles,
  '.github/pull_request_template.md',
  '.github/workflows/validate.yml',
  'scripts/check-secrets.mjs',
  'scripts/check-docs.mjs',
  'scripts/validate-scaffold.mjs'
];

const requiredDirs = [
  'docs',
  'configs',
  'examples',
  'prompts',
  'use-cases',
  'use-cases/examples',
  '.github',
  '.github/ISSUE_TEMPLATE',
  '.github/workflows',
  'scripts'
];

const publicFiles = [
  'README.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'docs/AUTHENTICATION.md',
  'docs/CLIENTS.md',
  'docs/TOOLS.md',
  'docs/SECURITY.md',
  'docs/TROUBLESHOOTING.md',
  'docs/API_RELATIONSHIP.md',
  'docs/PROMPTING_GUIDE.md',
  'configs/README.md',
  'configs/chatgpt-codex.md',
  'configs/codex.example.md',
  'configs/generic-remote-mcp.example.json',
  'configs/bearer-token.example.json',
  'configs/oauth-client-notes.md',
  'configs/local-bridge-notes.md',
  ...exampleFiles,
  ...promptFiles,
  ...useCaseFiles,
  ...issueTemplateFiles,
  '.github/pull_request_template.md',
  '.github/workflows/validate.yml',
  'package.json'
];

const optionalClientDocs = [
  'configs/claude-code.example.md',
  'configs/cursor.example.md',
  'configs/vscode.example.md'
];

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), 'utf8');
}

function existsFile(relativePath) {
  return fs.existsSync(filePath(relativePath)) && fs.statSync(filePath(relativePath)).isFile();
}

function existsDir(relativePath) {
  return fs.existsSync(filePath(relativePath)) && fs.statSync(filePath(relativePath)).isDirectory();
}

function fail(message) {
  errors.push(message);
}

function assertIncludes(relativePath, needle, message) {
  if (!existsFile(relativePath)) {
    return;
  }

  if (!read(relativePath).includes(needle)) {
    fail(message);
  }
}

function assertPattern(relativePath, pattern, message) {
  if (!existsFile(relativePath)) {
    return;
  }

  if (!pattern.test(read(relativePath))) {
    fail(message);
  }
}

for (const relativePath of requiredFiles) {
  if (!existsFile(relativePath)) {
    fail(`Missing required file: ${relativePath}`);
  }
}

for (const relativePath of requiredDirs) {
  if (!existsDir(relativePath)) {
    fail(`Missing required directory: ${relativePath}`);
  }
}

if (existsFile('README.md')) {
  assertIncludes('README.md', 'https://svgicons.com/mcp', 'README must include endpoint https://svgicons.com/mcp');
  assertIncludes('README.md', '0.1.0', 'README must include version 0.1.0');
  assertPattern('README.md', /svgicons\.com\s+is\s+a\s+developer-focused\s+SVG\s+icon\s+platform/i, 'README must introduce svgicons.com');
  assertIncludes('README.md', 'Authentication and Pro Plan access', 'README must include Authentication and Pro Plan access section');
  assertPattern('README.md', /workflows\s+require\s+authentication/i, 'README must mention some MCP workflows may require authentication');
  assertPattern('README.md', /svgicons\.com\s+account\s+and\/or\s+Pro\s+Plan/i, 'README must mention svgicons.com account and/or Pro Plan access');
  assertPattern('README.md', /hosted\s+.*MCP/i, 'README must mention hosted MCP');
  assertPattern('README.md', /JSON-RPC/i, 'README must mention JSON-RPC');
  assertPattern('README.md', /OAuth/i, 'README must mention OAuth');
  assertPattern('README.md', /bearer/i, 'README must mention bearer token support');
  assertIncludes('README.md', 'https://github.com/svgicons-com/api', 'README must link the API repo');
  assertIncludes('README.md', 'https://github.com/svgicons-com/cli', 'README must link the CLI repo');

  for (const tool of liveTools) {
    assertIncludes('README.md', tool, `README must include live tool ${tool}`);
  }
}

if (existsFile('docs/TOOLS.md')) {
  for (const tool of liveTools) {
    assertIncludes('docs/TOOLS.md', tool, `docs/TOOLS.md must include live tool ${tool}`);
  }
}

assertPattern('docs/AUTHENTICATION.md', /OAuth/i, 'docs/AUTHENTICATION.md must mention OAuth');
assertPattern('docs/AUTHENTICATION.md', /bearer/i, 'docs/AUTHENTICATION.md must mention bearer tokens');
assertIncludes('docs/CLIENTS.md', 'https://svgicons.com/mcp', 'docs/CLIENTS.md must include endpoint URL');
assertIncludes('README.md', 'configs/README.md', 'README must link to configs/README.md');
assertIncludes('README.md', 'prompts/README.md', 'README must link to prompts/README.md');
assertIncludes('README.md', 'examples/README.md', 'README must link to examples/README.md');
assertIncludes('README.md', 'use-cases/README.md', 'README must link to use-cases/README.md');
assertIncludes('README.md', 'docs/TOOLS.md', 'README must link to docs/TOOLS.md');
assertIncludes('README.md', 'docs/AUTHENTICATION.md', 'README must link to docs/AUTHENTICATION.md');
assertIncludes('README.md', 'docs/SECURITY.md', 'README must link to docs/SECURITY.md');
assertIncludes('README.md', 'docs/TROUBLESHOOTING.md', 'README must link to docs/TROUBLESHOOTING.md');
assertIncludes('docs/CLIENTS.md', 'configs/README.md', 'docs/CLIENTS.md must link to configs/README.md');
assertIncludes('docs/PROMPTING_GUIDE.md', 'prompts/README.md', 'docs/PROMPTING_GUIDE.md must link to prompts/README.md');
assertIncludes('docs/API_RELATIONSHIP.md', '/api/pro', 'docs/API_RELATIONSHIP.md must mention /api/pro');
assertPattern('docs/API_RELATIONSHIP.md', /\/api\/v1[^\n]*(is\s+not|not\s+the\s+live)/i, 'docs/API_RELATIONSHIP.md must say /api/v1 is not live');
assertPattern('docs/API_RELATIONSHIP.md', /MCP[^\n]*(separate|different)[^\n]*(REST API|REST)/i, 'docs/API_RELATIONSHIP.md must say MCP is separate from the REST API');

if (existsFile('docs/TROUBLESHOOTING.md') && read('docs/TROUBLESHOOTING.md').trim().length < 100) {
  fail('docs/TROUBLESHOOTING.md must be non-empty and useful');
}

if (existsFile('package.json')) {
  const packageJson = JSON.parse(read('package.json'));
  if (packageJson.version !== '0.1.0') {
    fail('package.json version must be 0.1.0');
  }
  if (packageJson.private !== true) {
    fail('package.json must be private');
  }
  const scripts = packageJson.scripts ?? {};
  for (const requiredScript of ['validate', 'validate:scaffold', 'check:secrets', 'check:docs']) {
    if (typeof scripts[requiredScript] !== 'string') {
      fail(`package.json must define ${requiredScript}`);
    }
  }
  for (const scriptName of Object.keys(scripts)) {
    if (/publish|release/i.test(scriptName)) {
      fail(`package.json must not define publishing scripts: ${scriptName}`);
    }
  }
}

if (existsFile('.github/workflows/validate.yml')) {
  assertIncludes('.github/workflows/validate.yml', 'npm ci', 'CI workflow must run npm ci');
  assertIncludes('.github/workflows/validate.yml', 'npm run validate', 'CI workflow must run npm run validate');
  lineFailures('.github/workflows/validate.yml', /svgicons\.com\/mcp|SVGICONS_API_TOKEN|deploy|publish/i, 'CI workflow must not call live MCP, require auth, deploy, or publish');
}

const endpointDocs = [
  'configs/README.md',
  'configs/chatgpt-codex.md',
  'configs/codex.example.md',
  'configs/oauth-client-notes.md',
  'configs/local-bridge-notes.md'
];

for (const relativePath of endpointDocs) {
  assertIncludes(relativePath, 'https://svgicons.com/mcp', `${relativePath} must include endpoint URL`);
}

for (const relativePath of promptFiles) {
  if (relativePath === 'prompts/README.md') {
    assertIncludes(relativePath, 'https://svgicons.com/mcp', `${relativePath} must include endpoint URL`);
    continue;
  }

  assertPattern(relativePath, /Expected MCP Behavior/i, `${relativePath} must mention expected MCP behavior`);
  assertPattern(relativePath, /What To Review/i, `${relativePath} must mention what to review`);
  assertPattern(relativePath, /Security Notes/i, `${relativePath} must mention security notes`);
}

for (const relativePath of exampleFiles) {
  if (relativePath === 'examples/README.md') {
    assertIncludes(relativePath, 'https://svgicons.com/mcp', `${relativePath} must include endpoint URL`);
    continue;
  }

  assertPattern(relativePath, /Expected MCP Behavior/i, `${relativePath} must mention expected MCP behavior`);
  assertPattern(relativePath, /Review Checklist/i, `${relativePath} must include a review checklist`);
}

for (const relativePath of sampleUseCaseFiles) {
  assertIncludes(relativePath, 'status: "example"', `${relativePath} must be marked as status: "example"`);
}

assertPattern('use-cases/TEMPLATE.md', /Do not include real API tokens/i, 'use-cases/TEMPLATE.md must include a token warning');

for (const relativePath of issueTemplateFiles) {
  if (existsFile(relativePath) && read(relativePath).trim().length < 50) {
    fail(`${relativePath} must be non-empty and useful`);
  }
}

if (existsFile('.github/pull_request_template.md') && read('.github/pull_request_template.md').trim().length < 100) {
  fail('.github/pull_request_template.md must be non-empty and useful');
}

function parseJsonFile(relativePath) {
  if (!existsFile(relativePath)) {
    return null;
  }

  try {
    return JSON.parse(read(relativePath));
  } catch (error) {
    fail(`JSON file does not parse: ${relativePath}`);
    return null;
  }
}

function listFiles(dir, matcher, found = []) {
  const absoluteDir = filePath(dir);
  if (!fs.existsSync(absoluteDir)) {
    return found;
  }

  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    if (entry.isDirectory() && ['.git', 'node_modules', 'dist', 'coverage'].includes(entry.name)) {
      continue;
    }

    const relativePath = path.join(dir, entry.name).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      listFiles(relativePath, matcher, found);
    } else if (matcher(relativePath)) {
      found.push(relativePath);
    }
  }

  return found;
}

for (const relativePath of listFiles('.', (candidate) => candidate.endsWith('.json'))) {
  parseJsonFile(relativePath);
}

for (const relativePath of listFiles('.', (candidate) => /\.ya?ml$/i.test(candidate))) {
  if (read(relativePath).trim().length === 0) {
    fail(`YAML file must not be empty: ${relativePath}`);
    continue;
  }

  const text = read(relativePath);
  if (/\t/.test(text)) {
    fail(`YAML file must not use tab indentation: ${relativePath}`);
  }

  if (relativePath.endsWith('.github/ISSUE_TEMPLATE/config.yml')) {
    if (!/^blank_issues_enabled:/m.test(text) || !/^contact_links:/m.test(text)) {
      fail(`${relativePath} must include issue-template config keys`);
    }
  } else if (relativePath.startsWith('.github/ISSUE_TEMPLATE/')) {
    if (!/^name:/m.test(text) || !/^body:/m.test(text)) {
      fail(`${relativePath} must include name and body keys`);
    }
  }
}

for (const relativePath of listFiles('.', (candidate) => candidate.endsWith('.md'))) {
  if (read(relativePath).trim().length === 0) {
    fail(`Markdown file must not be empty: ${relativePath}`);
  }
}

const bearerExample = parseJsonFile('configs/bearer-token.example.json');
if (bearerExample !== null) {
  const serialized = JSON.stringify(bearerExample);
  if (!serialized.includes('YOUR_TOKEN')) {
    fail('configs/bearer-token.example.json must use YOUR_TOKEN placeholder');
  }
  if (/Bearer\s+(?!YOUR_TOKEN\b)[A-Za-z0-9._|~+/=-]{12,}/i.test(serialized)) {
    fail('configs/bearer-token.example.json must not contain real-looking bearer tokens');
  }
}

for (const relativePath of optionalClientDocs) {
  if (existsFile(relativePath)) {
    assertIncludes(relativePath, 'https://svgicons.com/mcp', `${relativePath} must include endpoint URL`);
  }
}

function lineFailures(relativePath, pattern, message, allowed = () => false) {
  if (!existsFile(relativePath)) {
    return;
  }

  const lines = read(relativePath).split(/\r?\n/);
  lines.forEach((line, index) => {
    if (pattern.test(line) && !allowed(line)) {
      fail(`${message}: ${relativePath}:${index + 1}`);
    }
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const disallowedStatusTerms = [
  'al' + 'pha',
  'be' + 'ta',
  'pre' + 'view',
  'pre' + 'release',
  'pre-' + 'release'
];
const disallowedStatusPattern = new RegExp(`\\b(${disallowedStatusTerms.map(escapeRegExp).join('|')})\\b`, 'i');

const tokenPattern = /\bsk-[A-Za-z0-9_-]{16,}\b|svgicons_(secret|live|test)_[A-Za-z0-9_-]{16,}|\bmcp_(oat|ort|code)_[A-Za-z0-9_-]{16,}\b/i;

for (const relativePath of publicFiles) {
  lineFailures(
    relativePath,
    /@svgicons-com\/mcp-server/i,
    'Found unverified local MCP server package reference',
    (line) => /no\s+official|does\s+not\s+provide|do\s+not|not\s+provide/i.test(line)
  );
  lineFailures(relativePath, /\bnpx\s+@?svgicons[^\n]*mcp/i, 'Found unverified npx MCP server setup');
  lineFailures(relativePath, /\bnpm\s+(install|i)\s+[^\n]*(svgicons[^\n]*mcp|mcp[^\n]*svgicons)/i, 'Found unverified local MCP package install command');
  lineFailures(relativePath, /\/api\/v1/i, 'Found /api/v1 without clear not-live wording', (line) => /\bno\b|do\s+not|does\s+not|did\s+not|not\s+(the\s+)?live|not\s+available|is\s+not/i.test(line));
  lineFailures(relativePath, /must\s+link\s+back|required\s+backlink|link\s+back\s+required|dofollow\s+backlink|link\s+exchange\s+required|trade\s+links|link\s+trading/i, 'Found forced link placement wording');
  lineFailures(relativePath, tokenPattern, 'Found real-looking token');
  lineFailures(relativePath, /\bFortune\s+\d+|Acme\s+Corp|Globex|customer\s+quote/i, 'Found fabricated customer claim pattern');
  lineFailures(relativePath, /\bpublished\s+to\s+npm\b|\bnpm\s+publish\b|\bavailable\s+on\s+npm\b/i, 'Found package publishing claim');
  lineFailures(relativePath, disallowedStatusPattern, 'Found disallowed release-status wording');
  lineFailures(relativePath, /C:\\[^\s`)]+/i, 'Found local Windows path in public-facing file');
  lineFailures(relativePath, /\bMilestone\s+\d+\b/i, 'Found internal milestone wording in public-facing file');
  lineFailures(relativePath, /\ball\s+tools\s+are\s+anonymous\b/i, 'Found all-tools-anonymous claim');
  lineFailures(relativePath, /\bfree\s+API\b|\bunauthenticated\s+icon\s+API\b|\bpublic\s+icon\s+REST\s+API\b/i, 'Found unsupported free or unauthenticated icon API claim');
  lineFailures(relativePath, /\blegal\s+compliance\b/i, 'Found legal compliance claim');
  lineFailures(relativePath, /\brate\s+limits?\b/i, 'Found rate-limit wording outside a fake-claim warning', (line) => /fake|do\s+not\s+invent|unsupported|no\s+fake/i.test(line));
  lineFailures(relativePath, /\btoken\s+scopes?\b/i, 'Found token-scope wording outside a fake-claim warning', (line) => /fake|do\s+not\s+invent|unsupported|no\s+fake/i.test(line));
}

const scanned = publicFiles.length;

if (errors.length > 0) {
  console.error('Scaffold validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Scaffold validation passed. Checked ${requiredFiles.length} required files and ${scanned} public-facing files.`);
