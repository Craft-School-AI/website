import Link from 'next/link';
import { LogoMark } from '@/components/Logo';
import { RobotActivity } from '@/components/RobotActivity';
import { InstagramIcon, TelegramIcon, VkIcon } from '@/components/SocialIcons';

const navLinks = [
  { href: '/program', label: 'О программе' },
  { href: '/modules', label: 'Модули' },
  { href: '/master', label: 'О мастере' },
  { href: '/pricing', label: 'Тарифы' },
  { href: '/blog', label: 'Блог' },
  { href: '/contacts', label: 'Контакты' },
];

const socials = [
  { href: 'https://t.me/craft_school_ai_bot', label: 'Telegram', Icon: TelegramIcon },
  { href: 'https://www.instagram.com/craft_school_ai', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://vk.ru/club240091437', label: 'VK', Icon: VkIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface-soft">
      {/* Роботы заглядывают и в подвал — сцена случайная на каждой странице */}
      {/* Полосы движения — над линией копирайта, она служит «полом» */}
      <RobotActivity laneMin={58} laneMax={74} withDrone={false} withFloor={false} />

      <div className="container-page relative z-10 grid gap-10 py-12 pb-24 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="flex items-center gap-2 font-display text-2xl font-bold">
            <LogoMark className="h-9 w-auto" />
            <span>
              Craft-School<span className="text-amber">.ai</span>
            </span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-ink-soft">
            Цифровая мастерская для предпринимателей. Учим делать сайты своими
            руками с помощью ИИ-агентов — без подрядчиков и переплат.
          </p>
        </div>

        <nav aria-label="Навигация в подвале">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-faint">
            Разделы
          </p>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-soft transition-colors hover:text-terracotta"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-faint">
            Связаться
          </p>
          <a
            href="mailto:craft-school-ai@yandex.ru"
            className="text-sm text-ink-soft transition-colors hover:text-terracotta"
          >
            craft-school-ai@yandex.ru
          </a>
          <ul className="mt-4 flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-terracotta hover:text-terracotta"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-line/70 py-5">
        <div className="container-page flex flex-col gap-2 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Craft-School.ai — цифровая мастерская.
            Все права защищены.
          </p>
          <Link
            href="/privacy"
            className="transition-colors hover:text-terracotta"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
