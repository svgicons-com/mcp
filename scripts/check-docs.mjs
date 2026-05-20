import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

const ignoredDirs = new Set(['.git', 'node_modules', 'dist', 'coverage']);

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

const promptAndExampleFiles = [
  'prompts/search-icons.md',
  'prompts/react-component-icons.md',
  'prompts/dashboard-navigation.md',
  'prompts/replace-emoji-with-svg.md',
  'prompts/accessibility.md',
  'prompts/themeable-currentcolor-icons.md',
  'prompts/design-system-icon-review.md',
  'prompts/project-kit-workflow.md',
  'prompts/png-export.md',
  'examples/react-button-icon/README.md',
  'examples/dashboard-sidebar-icons/README.md',
  'examples/replace-emoji-with-svg/README.md',
  'examples/design-system-navigation/README.md',
  'examples/project-kit-workflow/README.md',
  'examples/png-export-workflow/README.md',
  'examples/icon-search-and-review/README.md'
];

function fail(message) {
  errors.push(message);
}

function relativePath(absolutePath) {
  return path.relative(root, absolutePath).replace(/\\/g, '/');
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) {
      continue;
    }

    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(absolutePath, files);
    } else {
      files.push(absolutePath);
    }
  }

  return files;
}

function lineFailures(relativePath, pattern, message, allowed = () => false) {
  if (!exists(relativePath)) {
    return;
  }

  read(relativePath).split(/\r?\n/).forEach((line, index) => {
    if (pattern.test(line) && !allowed(line, relativePath)) {
      fail(`${message}: ${relativePath}:${index + 1}`);
    }
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const statusTerms = ['al' + 'pha', 'be' + 'ta', 'pre' + 'view', 'pre' + 'release', 'pre-' + 'release'];
const statusPattern = new RegExp(`\\b(${statusTerms.map(escapeRegExp).join('|')})\\b`, 'i');

const markdownFiles = walk(root)
  .map(relativePath)
  .filter((file) => file.endsWith('.md'));

for (const file of markdownFiles) {
  if (read(file).trim().length === 0) {
    fail(`Markdown file is empty: ${file}`);
  }
}

const publicFiles = walk(root)
  .map(relativePath)
  .filter((file) => /\.(md|ya?ml|json)$/i.test(file));

for (const file of publicFiles) {
  lineFailures(file, /\bMilestone\s+\d+\b/i, 'Public file contains internal milestone wording');
  lineFailures(file, /C:\\[^\s`)]+/i, 'Public file contains a local Windows path');
  lineFailures(file, statusPattern, 'Public file contains unsupported release-status wording');
  lineFailures(
    file,
    /must\s+link\s+back|required\s+backlink|link\s+back\s+required|dofollow\s+backlink|link\s+exchange\s+required|trade\s+links|link\s+trading/i,
    'Public file contains forced link placement wording',
    (line) => /do\s+not|not\s+allowed|never/i.test(line)
  );
  lineFailures(file, /\bpublished\s+to\s+npm\b|\bnpm\s+publish\b|\bavailable\s+on\s+npm\b/i, 'Public file claims npm publication');
  lineFailures(
    file,
    /@svgicons-com\/mcp-server/i,
    'Public file references an unverified local MCP package',
    (line) => /no\s+official|does\s+not\s+provide|do\s+not|not\s+provide/i.test(line)
  );
  lineFailures(file, /\bnpx\s+@?svgicons[^\n]*mcp/i, 'Public file contains unverified npx MCP setup');
  lineFailures(file, /\/api\/v1/i, 'Public file mentions /api/v1 without not-live wording', (line) => /\bno\b|do\s+not|does\s+not|did\s+not|not\s+(the\s+)?live|not\s+available|is\s+not/i.test(line));
  lineFailures(file, /\ball\s+tools\s+are\s+anonymous\b/i, 'Public file claims all tools are anonymous');
  lineFailures(file, /\bfree\s+API\b|\bunauthenticated\s+icon\s+API\b|\bpublic\s+icon\s+REST\s+API\b/i, 'Public file implies an unsupported free or unauthenticated icon API');
  lineFailures(file, /\blegal\s+compliance\b/i, 'Public file claims legal compliance');
  lineFailures(file, /\brate\s+limits?\b/i, 'Public file mentions rate limits outside a fake-claim warning', (line) => /fake|do\s+not\s+invent|unsupported|no\s+fake/i.test(line));
  lineFailures(file, /\btoken\s+scopes?\b/i, 'Public file mentions token scopes outside a fake-claim warning', (line) => /fake|do\s+not\s+invent|unsupported|no\s+fake/i.test(line));
}

const readme = exists('README.md') ? read('README.md') : '';
if (!/svgicons\.com\s+is\s+a\s+developer-focused\s+SVG\s+icon\s+platform/i.test(readme)) {
  fail('README must introduce svgicons.com');
}
if (!readme.includes('Authentication and Pro Plan access')) {
  fail('README must include Authentication and Pro Plan access section');
}
if (!/workflows\s+require\s+authentication/i.test(readme)) {
  fail('README must mention that some MCP workflows may require authentication');
}
if (!/svgicons\.com\s+account\s+and\/or\s+Pro\s+Plan/i.test(readme)) {
  fail('README must mention svgicons.com account and/or Pro Plan access');
}

for (const link of [
  'docs/AUTHENTICATION.md',
  'docs/TOOLS.md',
  'docs/CLIENTS.md',
  'configs/README.md',
  'prompts/README.md',
  'examples/README.md',
  'use-cases/README.md',
  'docs/SECURITY.md',
  'docs/TROUBLESHOOTING.md'
]) {
  if (!readme.includes(link)) {
    fail(`README must link to ${link}`);
  }
}

if (exists('docs/TOOLS.md')) {
  const toolsDoc = read('docs/TOOLS.md');
  for (const tool of liveTools) {
    if (!toolsDoc.includes(tool)) {
      fail(`docs/TOOLS.md must list ${tool}`);
    }
  }
}

if (exists('docs/AUTHENTICATION.md')) {
  const authDoc = read('docs/AUTHENTICATION.md');
  if (!/OAuth/i.test(authDoc) || !/bearer/i.test(authDoc)) {
    fail('docs/AUTHENTICATION.md must describe OAuth and bearer token auth');
  }
}

if (exists('docs/CLIENTS.md') && !read('docs/CLIENTS.md').includes('configs/README.md')) {
  fail('docs/CLIENTS.md must link to configs/README.md');
}

for (const file of promptAndExampleFiles) {
  if (!exists(file)) {
    continue;
  }

  const text = read(file);
  if (!/review/i.test(text) || !/(security|safety)/i.test(text)) {
    fail(`${file} must include review and safety notes`);
  }
}

if (errors.length > 0) {
  console.error('Docs check failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Docs check passed. Checked ${markdownFiles.length} Markdown files and ${publicFiles.length} public-facing files.`);
