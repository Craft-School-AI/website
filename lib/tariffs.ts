/**
 * Тарифы Craft School для формы записи.
 *
 * Названия и цены зеркалят страницу «Тарифы» (app/pricing/page.tsx) — цена
 * первого потока. Держите значения в синхроне при изменении цен.
 *
 * Тариф обязателен в форме записи (все потоки платные).
 */

export type Tariff = {
  /** Технический id тарифа. */
  id: string;
  /** Название, напр. «Стандарт». */
  name: string;
  /** Цена первого потока в рублях, напр. 49000. */
  amount: number;
  /** Рекомендуемый тариф — подставляется по умолчанию. */
  recommended?: boolean;
};

export const TARIFFS: Tariff[] = [
  { id: 'podmasterye', name: 'Базовый', amount: 19900 },
  { id: 'master', name: 'Стандарт', amount: 49000, recommended: true },
  { id: 'ceh', name: 'Индивидуальный', amount: 99000 },
];

/** Промокод для друзей: даёт скидку на любой тариф. */
export const PROMO_CODE = 'CRAFTFRIENDS';
/** Размер скидки по промокоду (доля от цены). */
export const PROMO_DISCOUNT = 0.3;
/** Подпись скидки, напр. «−30%». */
export const PROMO_LABEL = `−${Math.round(PROMO_DISCOUNT * 100)}%`;

/** Проверка промокода: без учёта регистра и пробелов. */
export function isPromoValid(input: string): boolean {
  return input.trim().toUpperCase() === PROMO_CODE;
}

/** Форматирует сумму как «49 000 ₽» (неразрывной группировки не используем). */
export function formatRub(amount: number): string {
  return `${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`;
}

/** Цена тарифа со скидкой по промокоду, округлённая до рубля. */
export function discountedAmount(tariff: Tariff): number {
  return Math.round(tariff.amount * (1 - PROMO_DISCOUNT));
}

/** Подпись тарифа для селекта и заявки, напр. «Стандарт · 49 000 ₽». */
export function tariffLabel(tariff: Tariff): string {
  return `${tariff.name} · ${formatRub(tariff.amount)}`;
}

/** Подпись тарифа со скидкой, напр. «Стандарт · 34 300 ₽ (−30%)». */
export function tariffLabelDiscounted(tariff: Tariff): string {
  return `${tariff.name} · ${formatRub(discountedAmount(tariff))} (${PROMO_LABEL})`;
}

export function findTariff(id: string): Tariff | undefined {
  return TARIFFS.find((tariff) => tariff.id === id);
}

/** Тариф по умолчанию — рекомендуемый, иначе первый в списке. */
export const DEFAULT_TARIFF_ID =
  TARIFFS.find((tariff) => tariff.recommended)?.id ?? TARIFFS[0]?.id ?? '';
