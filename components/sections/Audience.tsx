import { Reveal } from '@/components/Reveal';
import { AudienceSlider } from '@/components/AudienceSlider';

export function Audience() {
  return (
    <section id="audience" className="section scroll-mt-24">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center">Для кого эта мастерская</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
            Для тех, кто ведёт своё дело и устал зависеть от подрядчиков.
            Опыт в IT не нужен, нужен ваш бизнес и 3 часа в неделю.
          </p>
        </Reveal>
      </div>

      {/* Слайдер вертикальных фото-карточек: свайп на мобилке, drag + стрелки на десктопе */}
      <div className="container-page mt-10">
        <AudienceSlider />
      </div>
    </section>
  );
}
