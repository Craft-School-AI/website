import { Reveal } from '@/components/Reveal';

// Заглушки — заменить на реальные отзывы выпускников
const testimonials = [
  {
    name: 'Анна',
    role: 'Владелица салона красоты',
    text: 'Три года платила за «поддержку сайта», которой не было. Теперь меняю акции и цены сама за пять минут. Жалею только, что не научилась раньше.',
  },
  {
    name: 'Дмитрий',
    role: 'Фитнес-тренер',
    text: 'Думал, без программиста не разберусь. На второй неделе у меня уже была страница с записью на тренировки. Клиенты записываются, пока я веду занятия.',
  },
  {
    name: 'Марина',
    role: 'Продаёт украшения ручной работы',
    text: 'Студия просила 200 тысяч за каталог. Я собрала его сама за спринт — и он выглядит именно так, как я хотела, а не как «видит дизайнер».',
  },
];

export function Testimonials() {
  return (
    <section className="section bg-surface-soft">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center">Что говорят выпускники</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 120}>
              <figure className="card h-full bg-surface">
                <blockquote className="text-ink-soft">
                  «{testimonial.text}»
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/15 font-display text-lg font-bold text-terracotta"
                    aria-hidden
                  >
                    {testimonial.name[0]}
                  </span>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-ink-faint">
                      {testimonial.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
