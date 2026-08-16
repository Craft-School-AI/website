import { TelegramIcon } from '@/components/SocialIcons';
import { PERSONAL_TELEGRAM_URL, WRITE_MASTER_LABEL } from '@/lib/site';

type AskMasterProps = {
  className?: string;
};

/**
 * Кнопка-ссылка «Написать мастеру» на личный Telegram.
 * Ставится там, где у пользователя могут возникнуть вопросы (страницы
 * программы, тарифов, о мастере, рядом с формами). Ник не показываем.
 */
export function AskMaster({ className = '' }: AskMasterProps) {
  return (
    <a
      href={PERSONAL_TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-none border-[3px] border-ink bg-surface px-4 py-2 text-sm font-semibold text-ink transition-all duration-150 shadow-[3px_3px_0_0_rgb(var(--text-primary))] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-ink hover:text-surface hover:shadow-[5px_5px_0_0_rgb(var(--text-primary))] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0_0_rgb(var(--text-primary))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`}
    >
      <TelegramIcon className="h-4 w-4" />
      {WRITE_MASTER_LABEL}
    </a>
  );
}
