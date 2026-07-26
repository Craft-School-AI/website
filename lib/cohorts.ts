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

function buildCohort(year: number, month0: number): Cohort {
  const start = firstMonday(year, month0);
  const day = start.getUTCDate();
  const startISO = start.toISOString().slice(0, 10);
  const startLabel = `${day} ${MONTHS_GENITIVE[month0]}`;
  const monthLabel = MONTHS_NOMINATIVE[month0];
  const free = month0 === FREE_MONTH;

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
      : 'Платный поток. Занятия по будням вечером, небольшая группа.',
  };
}

/** Все потоки года запуска. */
export function getAllCohorts(): Cohort[] {
  return COHORT_MONTHS.map((month0) => buildCohort(LAUNCH_YEAR, month0));
}

/**
 * Актуальные потоки — те, старт которых ещё не прошёл.
 * Если сезон уже закончился, возвращаем полный список, чтобы форма и
 * расписание не остались пустыми.
 */
export function getCohorts(now: Date = new Date()): Cohort[] {
  const all = getAllCohorts();
  const today = now.toISOString().slice(0, 10);
  const upcoming = all.filter((c) => c.startISO >= today);
  return upcoming.length > 0 ? upcoming : all;
}

/** Идентификатор ближайшего потока (для значения селекта по умолчанию). */
export function getNearestCohortId(now: Date = new Date()): string {
  const cohorts = getCohorts(now);
  return cohorts[0]?.id ?? '';
}

/** Поиск потока по id. */
export function findCohort(id: string, now: Date = new Date()): Cohort | undefined {
  return getCohorts(now).find((c) => c.id === id);
}
