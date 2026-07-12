import Image from 'next/image';
import { Reveal } from '@/components/Reveal';

// Реальные выпускники Craft School. Фото — в public/images/reviews.
// quote — прямая речь выпускника; пока не заполнена, карточка показывает
// имя, роль и то, что человек создал. Добавьте настоящие цитаты, когда будут.
const testimonials: {
  name: string;
  role: string;
  project: string;
  photo: string;
  quote?: string;
}[] = [
  {
    name: 'Анастасия',
    role: 'Художник',
    project: 'Сайт-портфолио для своих работ',
    photo: '/images/reviews/anastasia.jpg',
    quote:
      'Раньше показывала работы ссылкой на папку в облаке — выглядело несолидно. Собрала портфолио сама за пару недель, теперь отправляю клиентам аккуратный сайт и не стесняюсь называть цену.',
  },
  {
    name: 'Антон',
    role: 'Организатор турниров',
    project: 'Чат-бот для соревнований по падел-теннису',
    photo: '/images/reviews/anton.jpg',
    quote:
      'Провожу турниры по паделу, и запись вечно тонула в переписке. Сделал чат-бота — он сам собирает участников и сетки. Перед каждым турниром экономлю кучу времени.',
  },
  {
    name: 'Евгений',
    role: 'B2B-консультант',
    project: 'Сайт-визитка для B2B-консультаций',
    photo: '/images/reviews/evgeny.jpg',
    quote:
      'Думал, для консалтинга хватит визитки в мессенджере. Оказалось, аккуратный сайт сразу поднимает доверие на переговорах — партнёры видят, что я подхожу к делу серьёзно.',
  },
  {
    name: 'Нелли',
    role: 'Мастер маникюра',
    project: 'Сайт для продажи услуг маникюра',
    photo: '/images/reviews/nelli.jpg',
    quote:
      'Записывала клиенток вручную в заметках и путалась. Теперь у меня свой сайт с услугами и записью — девушки выбирают время сами, а я просто работаю.',
  },
];

export function Testimonials() {
  return (
    <section className="section bg-surface-soft">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center">Что создали выпускники</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 120}>
              <figure className="card flex h-full flex-col items-center bg-surface text-center">
                <Image
                  src={testimonial.photo}
                  alt={`${testimonial.name} — выпускник Craft School`}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="h-20 w-20 rounded-full object-cover shadow-hover ring-2 ring-terracotta/20"
                  sizes="80px"
                />
                <figcaption className="mt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-ink-faint">{testimonial.role}</p>
                </figcaption>

                {testimonial.quote ? (
                  <blockquote className="mt-4 text-sm text-ink-soft">
                    «{testimonial.quote}»
                  </blockquote>
                ) : null}

                <p className="mt-4 flex items-start gap-2 text-sm text-ink-soft">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
                    aria-hidden
                  />
                  <span>{testimonial.project}</span>
                </p>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
