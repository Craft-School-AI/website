import {
  Car,
  Dumbbell,
  Gem,
  Palette,
  Scissors,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type AudienceItem = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const audience: AudienceItem[] = [
  {
    icon: Dumbbell,
    title: 'Фитнес-тренеры',
    text: 'Страница с расписанием, ценами и записью на тренировку',
  },
  {
    icon: Scissors,
    title: 'Салоны красоты',
    text: 'Витрина услуг, портфолио мастеров и онлайн-запись',
  },
  {
    icon: Palette,
    title: 'Фрилансеры',
    text: 'Портфолио, которое продаёт ваши услуги без вашего участия',
  },
  {
    icon: ShoppingBag,
    title: 'Интернет-магазины',
    text: 'Каталог товаров с корзиной и приёмом заявок',
  },
  {
    icon: Car,
    title: 'Продавцы авто',
    text: 'Витрина автомобилей с фильтрами и формой обратной связи',
  },
  {
    icon: Gem,
    title: 'Ювелиры',
    text: 'Каталог украшений, который передаёт красоту изделий',
  },
];

export function Audience() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center">Для кого эта мастерская</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
            Для тех, кто ведёт своё дело и устал зависеть от подрядчиков.
            Опыт в IT не нужен — нужен ваш бизнес и 5–7 часов в неделю.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <article className="card flex h-full items-start gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber/15 text-amber"
                  aria-hidden
                >
                  <item.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
