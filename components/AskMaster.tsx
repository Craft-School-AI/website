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
      className={`inline-flex items-center gap-2 rounded-full border border-terracotta/50 bg-terracotta/10 px-4 py-2 text-sm font-semibold text-terracotta transition-colors hover:bg-terracotta/20 ${className}`}
    >
      <TelegramIcon className="h-4 w-4" />
      {WRITE_MASTER_LABEL}
    </a>
  );
}
