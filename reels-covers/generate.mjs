#!/usr/bin/env node
/**
 * Серийная генерация обложек рилзов Craft School.
 *
 * Читает covers.json, конвертирует HEIC-фото в JPEG (через sips, macOS),
 * рендерит template.html в headless Chrome и сохраняет PNG 1080×1920.
 *
 * Запуск:  node generate.mjs            — все обложки
 *          node generate.mjs IMG_2281   — только указанные фото
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PHOTOS_DIR = path.join(ROOT, 'photos'); // кеш конвертированных JPEG
const OUT_DIR = path.join(ROOT, 'out');

const config = JSON.parse(readFileSync(path.join(ROOT, 'covers.json'), 'utf8'));
const sourceDir = config.photoSourceDir.replace(/^~/, homedir());
const only = process.argv.slice(2);

mkdirSync(PHOTOS_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

/** Находит исходник фото (HEIC/JPG в любом регистре) и отдаёт путь к JPEG. */
function preparePhoto(name) {
  const cached = path.join(PHOTOS_DIR, `${name}.jpg`);
  if (existsSync(cached)) return cached;

  const source = readdirSync(sourceDir).find(
    (f) => f.replace(/\.[^.]+$/, '').toLowerCase() === name.toLowerCase(),
  );
  if (!source) throw new Error(`Не нашёл фото «${name}» в ${sourceDir}`);

  execFileSync('sips', [
    '-s', 'format', 'jpeg',
    '-s', 'formatOptions', '90',
    path.join(sourceDir, source),
    '--out', cached,
  ], { stdio: 'pipe' });
  return cached;
}

const covers = config.covers.filter((c) => !only.length || only.includes(c.photo));
if (!covers.length) {
  console.error('Ничего не выбрано. Доступные фото:', config.covers.map((c) => c.photo).join(', '));
  process.exit(1);
}

for (const cover of covers) {
  const photoPath = preparePhoto(cover.photo);
  const params = new URLSearchParams({
    photo: pathToFileURL(photoPath).href,
    l1: cover.l1,
    l2: cover.l2,
  });
  if (cover.pos) params.set('pos', cover.pos);
  if (cover.ty != null) params.set('ty', String(cover.ty));

  const url = `${pathToFileURL(path.join(ROOT, 'template.html')).href}?${params}`;
  const out = path.join(OUT_DIR, `${cover.photo}.png`);

  execFileSync(CHROME, [
    '--headless=new',
    '--force-device-scale-factor=1',
    '--hide-scrollbars',
    '--window-size=1080,1920',
    '--virtual-time-budget=4000', // ждём загрузку шрифтов и фото
    `--screenshot=${out}`,
    url,
  ], { stdio: 'pipe' });

  console.log(`✓ ${cover.photo}.png — «${cover.l1} / ${cover.l2}»`);
}

console.log(`\nГотово: ${covers.length} обложек в ${OUT_DIR}`);
