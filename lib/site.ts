/** Общие контакты и константы сайта. Один источник правды для ссылок. */

/** Базовый адрес сайта (для канонических ссылок и structured data). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://craft-school.ru';

/** Название бренда. */
export const SITE_NAME = 'Craft School';

/** Личный Telegram преподавателя — для прямых вопросов от учеников.
 *  Ник в интерфейсе не показываем: только ссылка/кнопка «Написать преподавателю». */
export const PERSONAL_TELEGRAM_URL = 'https://t.me/c_o_o_n';

/** Подпись для ссылки/кнопки на личный Telegram преподавателя. */
export const WRITE_MASTER_LABEL = 'Написать преподавателю';
