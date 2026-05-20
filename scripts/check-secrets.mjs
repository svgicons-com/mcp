import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

const ignoredDirs = new Set(['.git', 'node_modules', 'dist', 'coverage']);
const allowedPlaceholders = new Set([
  'YOUR_TOKEN',
  'SVGICONS_API_TOKEN',
  'YOUR_API_TOKEN',
  'YOUR_OAUTH_TOKEN',
  'EXAMPLE_TOKEN'
]);

function fail(message) {
  errors.push(message);
}

function relativePath(absolutePath) {
  return path.relative(root, absolutePath).replace(/\\/g, '/');
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

function isTextFile(file) {
  const ext = path.extname(file).toLowerCase();
  return [
    '',
    '.cjs',
    '.editorconfig',
    '.gitignore',
    '.json',
    '.js',
    '.md',
    '.mjs',
    '.txt',
    '.yaml',
    '.yml'
  ].includes(ext);
}

function isAllowedPlaceholder(value) {
  return allowedPlaceholders.has(value) || /^example[_-]?[a-z0-9_-]*$/i.test(value);
}

for (const absolutePath of walk(root)) {
  const rel = relativePath(absolutePath);
  const base = path.basename(rel);

  if (/^\.env(\.|$)/i.test(base) && !/^\.env\.example$/i.test(base)) {
    fail(`Possible environment file committed: ${rel}`);
  }

  if (!isTextFile(absolutePath)) {
    continue;
  }

  const text = fs.readFileSync(absolutePath, 'utf8');
  const lines = text.split(/\r?\n/);

  lines.forEach((line, index) => {
    const location = `${rel}:${index + 1}`;

    if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(line)) {
      fail(`Private key material found: ${location}`);
    }

    if (/\bsk-[A-Za-z0-9_-]{16,}\b/.test(line)) {
      fail(`OpenAI-style token found: ${location}`);
    }

    if (/svgicons_(secret|live|test)_[A-Za-z0-9_-]{16,}/i.test(line)) {
      fail(`Svg/icons token-like value found: ${location}`);
    }

    if (/\bmcp_(oat|ort|code)_[A-Za-z0-9_-]{16,}\b/i.test(line)) {
      fail(`MCP auth artifact-like value found: ${location}`);
    }

    if (/\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/.test(line)) {
      fail(`JWT-like value found: ${location}`);
    }

    const bearerMatches = line.matchAll(/\bBearer\s+([A-Za-z0-9._|~+/=-]{12,})/gi);
    for (const match of bearerMatches) {
      const value = match[1].replace(/[.,;:)]+$/, '');
      if (value.length < 12) {
        continue;
      }

      if (!isAllowedPlaceholder(value)) {
        fail(`Bearer token-like value found: ${location}`);
      }
    }

    const assignmentMatches = line.matchAll(/\b(api[_-]?key|access[_-]?token|refresh[_-]?token|client[_-]?secret|password)\b\s*[:=]\s*["']?([^"',\s}]{8,})/gi);
    for (const match of assignmentMatches) {
      const value = match[2];
      if (!isAllowedPlaceholder(value)) {
        fail(`Credential-like assignment found: ${location}`);
      }
    }
  });
}

if (errors.length > 0) {
  console.error('Secret check failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Secret check passed.');
