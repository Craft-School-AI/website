import {
  BookOpen,
  CalendarDays,
  Coins,
  GraduationCap,
  MessageCircle,
  Newspaper,
  type LucideIcon,
} from 'lucide-react';

/**
 * Разделы сайта — один источник правды для хедера и футера.
 * У каждого раздела своя иконка (узнаётся быстрее текста) и короткая
 * подпись: в мобильном меню она объясняет, что человек найдёт внутри.
 */
export type NavSection = {
  href: string;
  label: string;
  hint: string;
  Icon: LucideIcon;
};

export const NAV_SECTIONS: Record<string, NavSection> = {
  program: {
    href: '/program',
    label: 'Программа',
    hint: '8 недель, модули и что получится на выходе',
    Icon: BookOpen,
  },
  master: {
    href: '/master',
    label: 'Преподаватель',
    hint: 'Кто ведёт занятия и какой у него опыт',
    Icon: GraduationCap,
  },
  pricing: {
    href: '/pricing',
    label: 'Тарифы',
    hint: 'Цены, что входит и как оплатить',
    Icon: Coins,
  },
  schedule: {
    href: '/schedule',
    label: 'Расписание',
    hint: 'Даты потоков и время занятий',
    Icon: CalendarDays,
  },
  blog: {
    href: '/blog',
    label: 'Блог',
    hint: 'Разборы и заметки о сайтах на ИИ',
    Icon: Newspaper,
  },
  contacts: {
    href: '/contacts',
    label: 'Контакты',
    hint: 'Как задать вопрос до старта',
    Icon: MessageCircle,
  },
};

/** Навигация хедера. «Контакты» намеренно только в футере. */
export const HEADER_NAV: NavSection[] = [
  NAV_SECTIONS.program,
  NAV_SECTIONS.master,
  NAV_SECTIONS.pricing,
  NAV_SECTIONS.schedule,
  NAV_SECTIONS.blog,
];

/** Навигация футера: без расписания, зато с контактами. */
export const FOOTER_NAV: NavSection[] = [
  NAV_SECTIONS.program,
  NAV_SECTIONS.master,
  NAV_SECTIONS.pricing,
  NAV_SECTIONS.blog,
  NAV_SECTIONS.contacts,
];
