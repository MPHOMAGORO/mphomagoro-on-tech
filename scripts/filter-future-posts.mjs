import fs from 'node:fs';
import path from 'node:path';

const mode = process.argv[2] === 'restore' ? 'restore' : 'filter';
const rootDir = process.cwd();
const articlesDir = path.join(rootDir, 'articles');
const tempDir = path.join(rootDir, '.future-posts-temp');
const showFuturePosts = process.env.SHOW_FUTURE_POSTS === 'true';

const allowedExtensions = new Set(['.md', '.mdx']);

function collectFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
      continue;
    }

    if (entry.isFile() && allowedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function parseFrontmatterDate(content) {
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!frontmatterMatch) {
    return null;
  }

  const frontmatter = frontmatterMatch[1];
  const dateMatch = frontmatter.match(/(?:^|\n)\s*date\s*:\s*(.+?)\s*(?:\n|$)/);

  if (!dateMatch) {
    return null;
  }

  const rawValue = dateMatch[1].trim().replace(/^['"]|['"]$/g, '');
  const parsedDate = new Date(rawValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function restoreFiles() {
  if (!fs.existsSync(tempDir)) {
    return;
  }

  const movedFiles = collectFiles(tempDir);

  for (const movedFile of movedFiles) {
    const relativePath = path.relative(tempDir, movedFile);
    const targetPath = path.join(articlesDir, relativePath);

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });

    if (fs.existsSync(targetPath)) {
      fs.rmSync(targetPath, { recursive: true, force: true });
    }

    fs.renameSync(movedFile, targetPath);
  }

  fs.rmSync(tempDir, { recursive: true, force: true });
}

function hideFuturePosts() {
  if (showFuturePosts) {
    restoreFiles();
    return;
  }

  if (!fs.existsSync(articlesDir)) {
    return;
  }

  const futureFiles = [];

  for (const file of collectFiles(articlesDir)) {
    const content = fs.readFileSync(file, 'utf8');
    const publishDate = parseFrontmatterDate(content);

    if (!publishDate) {
      continue;
    }

    if (publishDate > new Date()) {
      futureFiles.push(file);
    }
  }

  if (futureFiles.length === 0) {
    restoreFiles();
    return;
  }

  fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir, { recursive: true });

  for (const file of futureFiles) {
    const relativePath = path.relative(articlesDir, file);
    const targetPath = path.join(tempDir, relativePath);

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.renameSync(file, targetPath);
  }

  console.log(`Hidden ${futureFiles.length} future-dated article(s) from this build.`);
}

if (mode === 'restore') {
  restoreFiles();
} else {
  hideFuturePosts();
}
