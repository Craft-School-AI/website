/**
 * Тарифы Craft School для формы записи.
 *
 * Названия и цены зеркалят страницу «Тарифы» (app/pricing/page.tsx) — цена
 * первого потока (со скидкой). Держите значения в синхроне при изменении цен.
 *
 * Тариф выбирается только для платных потоков. Первый (августовский)
 * обкаточный поток бесплатный — тариф для него не показывается и не отправляется.
 */

export type Tariff = {
  /** Технический id тарифа. */
  id: string;
  /** Название, напр. «Мастер». */
  name: string;
  /** Цена первого потока, напр. «49 000 ₽». */
  price: string;
  /** Рекомендуемый тариф — подставляется по умолчанию. */
  recommended?: boolean;
};

export const TARIFFS: Tariff[] = [
  { id: 'podmasterye', name: 'Подмастерье', price: '19 900 ₽' },
  { id: 'master', name: 'Мастер', price: '49 000 ₽', recommended: true },
  { id: 'ceh', name: 'Цех', price: '99 000 ₽' },
];

/** Подпись тарифа для селекта и заявки, напр. «Мастер · 49 000 ₽». */
export function tariffLabel(tariff: Tariff): string {
  return `${tariff.name} · ${tariff.price}`;
}

export function findTariff(id: string): Tariff | undefined {
  return TARIFFS.find((tariff) => tariff.id === id);
}

/** Тариф по умолчанию — рекомендуемый, иначе первый в списке. */
export const DEFAULT_TARIFF_ID =
  TARIFFS.find((tariff) => tariff.recommended)?.id ?? TARIFFS[0]?.id ?? '';
