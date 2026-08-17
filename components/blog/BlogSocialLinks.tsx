import { TelegramIcon, VkIcon } from '@/components/SocialIcons';
import { MASTER_TELEGRAM_CHANNEL_URL, VK_GROUP_URL } from '@/lib/site';

const links = [
  { href: MASTER_TELEGRAM_CHANNEL_URL, label: 'Telegram', Icon: TelegramIcon },
  { href: VK_GROUP_URL, label: 'ВКонтакте', Icon: VkIcon },
];

/**
 * Соцсети под шапкой блога: те же материалы выходят в Telegram-канале
 * преподавателя и в группе ВКонтакте.
 */
export function BlogSocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-ink-faint">Нас также можно читать:</span>

      <div className="flex flex-wrap gap-2">
        {links.map(({ href, label, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-none border-[3px] border-ink bg-surface px-3 py-1.5 text-sm font-semibold text-ink-soft transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-amber hover:text-graphite hover:shadow-[3px_3px_0_0_rgb(var(--brand-terracotta))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
