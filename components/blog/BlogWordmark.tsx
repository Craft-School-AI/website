/**
 * Заголовок списка статей: крупная надпись «ИИ блог».
 *
 * «ИИ» набран сплошным розовым, «блог» — белым с чёрной обводкой. Без теней,
 * заливок и анимации: минималистично.
 */
export function BlogWordmark() {
  return (
    <h1 className="select-none font-display text-6xl font-bold uppercase leading-none tracking-tight sm:text-8xl lg:text-9xl">
      <span className="text-shine">ИИ</span>{' '}
      <span className="text-outlined">блог</span>
    </h1>
  );
}
