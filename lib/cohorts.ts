/**
 * Потоки (когорты) Craft School.
 *
 * Логика набора: новый поток стартует в первый вторник каждого месяца (по МСК) —
 * это же день первого занятия. Занятия идут по вторникам и четвергам.
 * Все потоки платные. Августовский обкаточный поток уже набран — его регистрация
 * закрыта вручную (см. CLOSED_COHORT_IDS).
 *
 * Даты стартов и «ближайший поток» считаются от даты сборки/запроса, поэтому
 * прошедшие потоки автоматически уходят из расписания.
 */

/** Год запуска расписания. */
const LAUNCH_YEAR = 2026;

/** Месяцы потоков (0 — январь). Август — обкаточный, дальше — платные. */
const COHORT_MONTHS = [7, 8, 9, 10, 11]; // авг, сен, окт, ноя, дек

/**
 * Потоки с вручную закрытой регистрацией (группа уже набрана), независимо
 * от даты старта. Августовский обкаточный поток набран — запись закрыта.
 */
const CLOSED_COHORT_IDS = new Set<string>(['2026-08']);

/**
 * Ручные переопределения даты старта (число месяца), если поток стартует
 * не в первый вторник. Сентябрь 2026 стартует 4 сентября, а не с 1-го.
 */
const START_DAY_OVERRIDES: Record<string, number> = {
  '2026-09': 4,
};

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
  /** Пояснение для карточки календаря. */
  note: string;
  /** Даты первых занятий (вт и чт), напр. ["4 авг", "6 авг", …]. */
  sessions: string[];
  /** Курс продолжается дольше показанных дат. */
  moreSessions: boolean;
  /** Регистрация закрыта — старт уже прошёл. */
  past: boolean;
  /** Набор закрыт вручную — группа набрана (независимо от даты). */
  closed: boolean;
};

/**
 * Первый вторник месяца — день старта потока и первого занятия.
 * Считаем в UTC — важна только дата, не время суток.
 */
function firstTuesday(year: number, month0: number): Date {
  const d = new Date(Date.UTC(year, month0, 1));
  const day = d.getUTCDay(); // 0 — вс, 1 — пн, 2 — вт, ... 6 — сб
  const offset = (2 - day + 7) % 7; // сколько дней до ближайшего вторника
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
 * Даты первых занятий. Старт — во вторник, занятия идут по вторникам
 * и четвергам, поэтому берём вт/чт первых двух недель.
 */
function firstSessions(start: Date): string[] {
  const offsets = [0, 2, 7, 9]; // вт, чт, вт, чт
  return offsets.map((offset) => shortDate(addDaysUTC(start, offset)));
}

function buildCohort(year: number, month0: number, now: Date): Cohort {
  const idPre = `${year}-${String(month0 + 1).padStart(2, '0')}`;
  const override = START_DAY_OVERRIDES[idPre];
  const start = override
    ? new Date(Date.UTC(year, month0, override))
    : firstTuesday(year, month0);
  const day = start.getUTCDate();
  const startISO = start.toISOString().slice(0, 10);
  const startLabel = `${day} ${MONTHS_GENITIVE[month0]}`;
  const monthLabel = MONTHS_NOMINATIVE[month0];
  const id = startISO.slice(0, 7);
  // Регистрация закрывается, как только стартовая дата прошла.
  const past = startISO < now.toISOString().slice(0, 10);
  // Набор закрыт вручную — группа набрана.
  const closed = CLOSED_COHORT_IDS.has(id);

  return {
    id,
    monthLabel,
    startISO,
    day,
    startLabel,
    selectLabel: `${monthLabel} · старт ${startLabel}`,
    note: closed
      ? 'Группа набрана — регистрация закрыта. Спасибо за интерес!'
      : 'Платный поток, небольшая группа.',
    sessions: firstSessions(start),
    moreSessions: true,
    past,
    closed,
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
  const open = getAllCohorts(now).filter((c) => !c.past && !c.closed);
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
