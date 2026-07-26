/**
 * Потоки (когорты) Craft School.
 *
 * Логика набора: новый поток стартует в первый понедельник каждого месяца (по МСК).
 * Первый поток — августовский — обкаточный и бесплатный (только для друзей и
 * знакомых). Все следующие потоки, начиная с сентября, — платные.
 *
 * Даты стартов и «ближайший поток» считаются от даты сборки/запроса, поэтому
 * прошедшие потоки автоматически уходят из расписания.
 */

/** Год запуска расписания. */
const LAUNCH_YEAR = 2026;

/** Месяцы потоков (0 — январь). Август — обкаточный, дальше — платные. */
const COHORT_MONTHS = [7, 8, 9, 10, 11]; // авг, сен, окт, ноя, дек

/** Обкаточный бесплатный поток. */
const FREE_MONTH = 7; // август

const MONTHS_NOMINATIVE = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

const MONTHS_SHORT = [
  'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
];

export type Cohort = {
  /** Идентификатор потока, напр. "2026-08". */
  id: string;
  /** Название месяца, напр. "Август". */
  monthLabel: string;
  /** ISO-дата старта YYYY-MM-DD (МСК). */
  startISO: string;
  /** Число дня старта, напр. 3. */
  day: number;
  /** Короткая читаемая дата, напр. "3 августа". */
  startLabel: string;
  /** Полная подпись для селекта. */
  selectLabel: string;
  /** Бесплатный обкаточный поток. */
  free: boolean;
  /** Пояснение для карточки календаря. */
  note: string;
  /** Даты первых занятий (вт и чт), напр. ["4 авг", "6 авг", …]. */
  sessions: string[];
  /** Курс продолжается дольше показанных дат. */
  moreSessions: boolean;
  /** Регистрация закрыта — старт уже прошёл. */
  past: boolean;
};

/**
 * Первый понедельник месяца.
 * Считаем в UTC — важна только дата, не время суток.
 */
function firstMonday(year: number, month0: number): Date {
  const d = new Date(Date.UTC(year, month0, 1));
  const day = d.getUTCDay(); // 0 — вс, 1 — пн, ... 6 — сб
  const offset = (8 - day) % 7; // сколько дней до ближайшего понедельника
  d.setUTCDate(1 + offset);
  return d;
}

function addDaysUTC(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

/** Короткая дата занятия, напр. «4 авг». */
function shortDate(date: Date): string {
  return `${date.getUTCDate()} ${MONTHS_SHORT[date.getUTCMonth()]}`;
}

/**
 * Даты первых занятий. Старт — в понедельник, занятия идут по вторникам
 * и четвергам, поэтому берём вт/чт первых двух недель.
 */
function firstSessions(monday: Date): string[] {
  const offsets = [1, 3, 8, 10]; // вт, чт, вт, чт
  return offsets.map((offset) => shortDate(addDaysUTC(monday, offset)));
}

function buildCohort(year: number, month0: number, now: Date): Cohort {
  const start = firstMonday(year, month0);
  const day = start.getUTCDate();
  const startISO = start.toISOString().slice(0, 10);
  const startLabel = `${day} ${MONTHS_GENITIVE[month0]}`;
  const monthLabel = MONTHS_NOMINATIVE[month0];
  const free = month0 === FREE_MONTH;
  // Регистрация закрывается, как только стартовая дата прошла.
  const past = startISO < now.toISOString().slice(0, 10);

  return {
    id: startISO.slice(0, 7),
    monthLabel,
    startISO,
    day,
    startLabel,
    selectLabel: free
      ? `${monthLabel} · старт ${startLabel} · бесплатный обкаточный поток`
      : `${monthLabel} · старт ${startLabel}`,
    free,
    note: free
      ? 'Обкаточный поток для друзей и знакомых. Бесплатно, мест немного.'
      : 'Платный поток, небольшая группа.',
    sessions: firstSessions(start),
    moreSessions: true,
    past,
  };
}

/** Все потоки года запуска (включая прошедшие — для календаря расписания). */
export function getAllCohorts(now: Date = new Date()): Cohort[] {
  return COHORT_MONTHS.map((month0) => buildCohort(LAUNCH_YEAR, month0, now));
}

/**
 * Открытые для записи потоки — те, старт которых ещё не прошёл.
 * Если сезон уже закончился, возвращаем полный список, чтобы форма
 * не осталась пустой.
 */
export function getCohorts(now: Date = new Date()): Cohort[] {
  const open = getAllCohorts(now).filter((c) => !c.past);
  return open.length > 0 ? open : getAllCohorts(now);
}

/** Идентификатор ближайшего открытого потока (значение селекта по умолчанию). */
export function getNearestCohortId(now: Date = new Date()): string {
  const cohorts = getCohorts(now);
  return cohorts[0]?.id ?? '';
}

/** Поиск потока по id. */
export function findCohort(id: string, now: Date = new Date()): Cohort | undefined {
  return getAllCohorts(now).find((c) => c.id === id);
}
