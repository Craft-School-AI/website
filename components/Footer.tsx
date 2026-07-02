import Link from 'next/link';
import { LogoMark } from '@/components/Logo';
import { RobotActivity } from '@/components/RobotActivity';

const navLinks = [
  { href: '/program', label: 'О программе' },
  { href: '/modules', label: 'Модули' },
  { href: '/master', label: 'О мастере' },
  { href: '/pricing', label: 'Тарифы' },
  { href: '/blog', label: 'Блог' },
  { href: '/contacts', label: 'Контакты' },
];

const socials = [
  { href: 'https://t.me/craftschool_ai', label: 'Telegram' },
  { href: 'https://www.youtube.com/@craftschool_ai', label: 'YouTube' },
  { href: 'https://vk.com/craftschool_ai', label: 'VK' },
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
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:hello@craft-school.ai"
                className="text-ink-soft transition-colors hover:text-terracotta"
              >
                hello@craft-school.ai
              </a>
            </li>
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft transition-colors hover:text-terracotta"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-line/70 py-5">
        <p className="container-page text-xs text-ink-faint">
          © {new Date().getFullYear()} Craft-School.ai — цифровая мастерская.
          Все права защищены.
        </p>
      </div>
    </footer>
  );
}
