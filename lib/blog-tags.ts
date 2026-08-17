/**
 * Теги блога: словарь и работа с адресной строкой.
 *
 * Слаг латиницей — он попадает в ссылку и должен оставаться читаемым при
 * копировании. Подпись кириллицей, в интерфейсе выводится с решёткой.
 * Порядок ключей задаёт порядок чипсов в фильтре и порядок тегов в URL,
 * поэтому одно состояние фильтра всегда даёт ровно одну ссылку.
 */
export const BLOG_TAGS = {
  'ii-agenty': 'ИИ-агенты',
  'svoimi-rukami': 'Своими руками',
  'sajt-dlya-biznesa': 'Сайт для бизнеса',
  oshibki: 'Ошибки',
  dengi: 'Деньги',
  instrukcii: 'Инструкции',
  's-chego-nachat': 'С чего начать',
} as const;

export type BlogTagSlug = keyof typeof BLOG_TAGS;

/** Все слаги в порядке словаря — он же порядок вывода. */
export const BLOG_TAG_ORDER = Object.keys(BLOG_TAGS) as BlogTagSlug[];

/** Название параметра в строке запроса: /blog?tags=ii-agenty,dengi */
export const TAGS_PARAM = 'tags';

export function isBlogTag(value: string): value is BlogTagSlug {
  return value in BLOG_TAGS;
}

/** Подпись тега с решёткой — единый вид во всех местах интерфейса. */
export function tagLabel(slug: BlogTagSlug): string {
  return `#${BLOG_TAGS[slug]}`;
}

/**
 * Разбирает значение параметра tags: отбрасывает мусор и дубликаты,
 * приводит порядок к порядку словаря. Пустой результат означает «все статьи».
 */
export function parseTagsParam(
  value: string | string[] | undefined,
): BlogTagSlug[] {
  if (!value) return [];

  const raw = (Array.isArray(value) ? value : [value])
    .flatMap((part) => part.split(','))
    .map((part) => part.trim().toLowerCase())
    .filter(isBlogTag);

  const selected = new Set<BlogTagSlug>(raw);
  return BLOG_TAG_ORDER.filter((slug) => selected.has(slug));
}

/**
 * Выбор всех доступных тегов означает то же самое, что и пустой выбор: показаны
 * все статьи. Приводим такой набор к пустому, чтобы состояние фильтра и адрес
 * не расходились, если полный набор тегов пришёл из вручную набранной ссылки.
 */
export function normalizeSelection(
  tags: BlogTagSlug[],
  availableCount: number,
): BlogTagSlug[] {
  return tags.length >= availableCount ? [] : tags;
}

/**
 * Ссылка на список статей с выбранным набором тегов.
 * Пустой набор и полный набор дают чистый /blog: обе ситуации означают
 * «показаны все статьи», и держать для них разные адреса незачем.
 */
export function blogHref(tags: BlogTagSlug[], availableCount: number): string {
  if (tags.length === 0 || tags.length >= availableCount) return '/blog';
  return `/blog?${TAGS_PARAM}=${tags.join(',')}`;
}

/** Набор тегов после нажатия на чипс: выбранный тег добавляется или снимается. */
export function toggleTag(
  tags: BlogTagSlug[],
  slug: BlogTagSlug,
): BlogTagSlug[] {
  const next = tags.includes(slug)
    ? tags.filter((tag) => tag !== slug)
    : [...tags, slug];

  return BLOG_TAG_ORDER.filter((tag) => next.includes(tag));
}
