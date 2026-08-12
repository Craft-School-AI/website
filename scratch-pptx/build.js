const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";
p.author = "Roman Babanov";
p.title = "Craft School — Третье занятие";

// ---------- Палитра ----------
const CREAM = "FDF8F0";
const INK = "1A1D1F";
const INK2 = "242021";
const TERRA = "C67B5A";
const TERRA_D = "A85E3F";
const GOLD = "D4A54A";
const SAGE = "88B6A2";
const MUTED = "6B655E";
const SAND = "EBE3D5";
const SANDLINE = "C9C2B8";
const WHITE = "FFFFFF";
const GOLDT = "F4E7CC";
const FONT = "Calibri";

const W = 13.333, H = 7.5, M = 0.7;

function shadow() {
  return { type: "outer", color: "9A8F7E", opacity: 0.28, blur: 7, offset: 3, angle: 90 };
}

function bg(s, color) { s.background = { color }; }

function title(s, t, opts = {}) {
  s.addText(t, {
    x: M, y: opts.y || 0.5, w: opts.w || W - 2 * M, h: 0.72,
    fontFace: FONT, fontSize: 30, bold: true, color: opts.color || INK, align: "left",
    margin: 0,
  });
}

function sub(s, t, opts = {}) {
  s.addText(t, {
    x: M, y: opts.y || 1.22, w: opts.w || W - 2 * M, h: opts.h || 0.55,
    fontFace: FONT, fontSize: 15, color: opts.color || MUTED, align: "left", margin: 0,
    lineSpacingMultiple: 1.05,
  });
}

// круг-бейдж с номером или символом
function badge(s, x, y, d, text, fill = TERRA, txtColor = WHITE, fs = 20) {
  s.addShape(p.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill } });
  s.addText(text, {
    x, y, w: d, h: d, align: "center", valign: "middle",
    fontFace: FONT, fontSize: fs, bold: true, color: txtColor, margin: 0,
  });
}

function card(s, x, y, w, h, fill = WHITE, line = SAND) {
  s.addShape(p.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.12,
    fill: { color: fill }, line: { color: line, width: 1 }, shadow: shadow(),
  });
}

function footer(s, text, dark = false) {
  s.addText(text, {
    x: M, y: H - 0.52, w: W - 2 * M, h: 0.32,
    fontFace: FONT, fontSize: 10.5, italic: true,
    color: dark ? "8C857C" : "A79D8F", align: "left", margin: 0,
  });
}

// ==========================================================
// Slide 1 — Обложка (тёмная)
// ==========================================================
let s = p.addSlide(); bg(s, INK);
s.addText("CRAFT SCHOOL", {
  x: M, y: 0.85, w: 8, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
  color: TERRA, charSpacing: 3, margin: 0,
});
s.addText("Третье занятие", {
  x: M, y: 1.35, w: 9, h: 0.5, fontFace: FONT, fontSize: 17, color: "B9B1A7", margin: 0,
});
s.addText("Git, CI/CD и публикация\nсайта в интернете", {
  x: M, y: 1.95, w: 11.2, h: 2.0, fontFace: FONT, fontSize: 48, bold: true,
  color: WHITE, lineSpacingMultiple: 1.02, margin: 0,
});
s.addText(
  "Сегодня разбираемся, как код превращается в живой сайт по адресу в интернете, и публикуем ваш проект на Vercel.",
  { x: M, y: 4.35, w: 10.4, h: 0.9, fontFace: FONT, fontSize: 16, color: "CFC8BE",
    lineSpacingMultiple: 1.15, margin: 0 }
);
// подпись автора
s.addShape(p.ShapeType.roundRect, { x: M, y: 5.85, w: 5.4, h: 0.95, rectRadius: 0.1,
  fill: { color: INK2 }, line: { color: "3A3533", width: 1 } });
badge(s, M + 0.25, 6.06, 0.54, "РБ", TERRA, WHITE, 15);
s.addText([
  { text: "Роман Бабанов\n", options: { fontSize: 15, bold: true, color: WHITE } },
  { text: "Мастер и наставник курса", options: { fontSize: 12, color: "9A928A" } },
], { x: M + 0.95, y: 5.92, w: 4.3, h: 0.8, fontFace: FONT, align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });

// ==========================================================
// Slide 2 — Что уже сделано (recap)
// ==========================================================
s = p.addSlide(); bg(s, CREAM);
title(s, "Что мы уже сделали");
sub(s, "Курс идёт спринтами. К третьему занятию у вас уже есть готовый проект и репозиторий на GitHub.");

const recap = [
  { n: "1", h: "Занятие 1. Рабочее место",
    b: "Развернули окружение по чеклисту, подключили ИИ-агента, запустили первые промпты. Получили базовую версию сайта на компьютере." },
  { n: "2", h: "Занятие 2. Репозиторий",
    b: "У каждого появился репозиторий на GitHub. Начали настраивать GitHub Actions, чтобы сборка запускалась на каждый push." },
  { n: "3", h: "Занятие 3. Сегодня",
    b: "Доводим публикацию до конца и разбираем, как всё устроено: Git, сервер, деплой, CI/CD. В финале сайт открыт в интернете.",
    accent: true },
];
let cy = 1.95, ch = 1.5, gap = 0.22;
recap.forEach((r, i) => {
  const y = cy + i * (ch + gap);
  card(s, M, y, W - 2 * M, ch, r.accent ? GOLDT : WHITE, r.accent ? GOLD : SAND);
  badge(s, M + 0.32, y + (ch - 0.78) / 2, 0.78, r.n, r.accent ? GOLD : TERRA, WHITE, 26);
  s.addText(r.h, { x: M + 1.4, y: y + 0.22, w: W - 2 * M - 1.8, h: 0.42,
    fontFace: FONT, fontSize: 18, bold: true, color: INK, margin: 0 });
  s.addText(r.b, { x: M + 1.4, y: y + 0.62, w: W - 2 * M - 1.8, h: 0.78,
    fontFace: FONT, fontSize: 13.5, color: MUTED, margin: 0, lineSpacingMultiple: 1.08 });
});

// ==========================================================
// Slide 3 — План занятия
// ==========================================================
s = p.addSlide(); bg(s, CREAM);
title(s, "План третьего занятия");
sub(s, "Сначала разбираемся в понятиях, потом руками публикуем сайт.");

const plan = [
  { n: "1", h: "Понятия", b: "Git, сервер, деплой и CI/CD простыми словами." },
  { n: "2", h: "Публикация на Vercel", b: "Бесплатно, прямо из вашего репозитория на GitHub." },
  { n: "3", h: "Альтернатива для России", b: "Timeweb: готовая интеграция с GitHub, оплата картой РФ." },
  { n: "4", h: "Итог", b: "У каждого рабочая ссылка на сайт, которая сама обновляется." },
];
const pw = (W - 2 * M - 0.4) / 2, phc = 1.9;
plan.forEach((r, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = M + col * (pw + 0.4), y = 2.0 + row * (phc + 0.3);
  card(s, x, y, pw, phc);
  badge(s, x + 0.32, y + 0.32, 0.68, r.n, TERRA, WHITE, 22);
  s.addText(r.h, { x: x + 1.22, y: y + 0.34, w: pw - 1.5, h: 0.5,
    fontFace: FONT, fontSize: 18, bold: true, color: INK, margin: 0 });
  s.addText(r.b, { x: x + 0.34, y: y + 1.05, w: pw - 0.68, h: 0.7,
    fontFace: FONT, fontSize: 14, color: MUTED, margin: 0, lineSpacingMultiple: 1.1 });
});
footer(s, "Итог занятия: сайт опубликован и доступен по ссылке любому в интернете.");

// ==========================================================
// Slide 4 — Git
// ==========================================================
s = p.addSlide(); bg(s, CREAM);
title(s, "Git. Машина времени проекта");
sub(s, "Git хранит историю всех изменений кода. В любой момент можно вернуться к рабочей версии.");

const gitrows = [
  { k: "commit", d: "Сохранённая точка в истории. Как фотография проекта в конкретный момент." },
  { k: "push", d: "Отправка ваших коммитов в облако, на GitHub. Код перестаёт жить только на ноутбуке." },
  { k: "GitHub", d: "Облачное хранилище кода. Отсюда сервисы публикации забирают проект и выкладывают сайт." },
];
let gy = 2.05;
gitrows.forEach((r, i) => {
  const y = gy + i * 1.32;
  card(s, M, y, W - 2 * M, 1.12);
  s.addShape(p.ShapeType.roundRect, { x: M + 0.3, y: y + 0.28, w: 2.1, h: 0.56, rectRadius: 0.08,
    fill: { color: INK } });
  s.addText(r.k, { x: M + 0.3, y: y + 0.28, w: 2.1, h: 0.56, align: "center", valign: "middle",
    fontFace: "Consolas", fontSize: 16, bold: true, color: GOLD, margin: 0 });
  s.addText(r.d, { x: M + 2.7, y: y + 0.16, w: W - 2 * M - 3.0, h: 0.82,
    fontFace: FONT, fontSize: 15, color: INK, margin: 0, valign: "middle", lineSpacingMultiple: 1.08 });
});
footer(s, "Агент делает коммиты и push за вас. Ваша задача: понимать, что происходит, и проверять результат.");

// ==========================================================
// Slide 5 — Что такое сервер
// ==========================================================
s = p.addSlide(); bg(s, CREAM);
title(s, "Что такое сервер");
sub(s, "Сервер это чужой компьютер, который всегда включён и отдаёт ваш сайт каждому, кто открыл адрес.");

// две колонки сравнения
const colw = (W - 2 * M - 0.5) / 2;
// левая: ноутбук
card(s, M, 2.05, colw, 3.4, WHITE, SANDLINE);
badge(s, M + 0.35, 2.35, 0.7, "1", MUTED, WHITE, 22);
s.addText("Ваш ноутбук", { x: M + 1.25, y: 2.4, w: colw - 1.5, h: 0.5,
  fontFace: FONT, fontSize: 19, bold: true, color: INK, margin: 0 });
s.addText([
  { text: "Сайт запущен командой на вашем компьютере.\n", options: { breakLine: true } },
  { text: "Адрес localhost виден только вам.\n", options: { breakLine: true } },
  { text: "Выключили ноутбук, сайт пропал.", options: {} },
], { x: M + 0.4, y: 3.25, w: colw - 0.8, h: 2.0, fontFace: FONT, fontSize: 15,
  color: MUTED, margin: 0, lineSpacingMultiple: 1.35, bullet: { code: "2022", indent: 18 } });

// правая: сервер
card(s, M + colw + 0.5, 2.05, colw, 3.4, GOLDT, GOLD);
const rx = M + colw + 0.5;
badge(s, rx + 0.35, 2.35, 0.7, "2", TERRA, WHITE, 22);
s.addText("Сервер в интернете", { x: rx + 1.25, y: 2.4, w: colw - 1.5, h: 0.5,
  fontFace: FONT, fontSize: 19, bold: true, color: INK, margin: 0 });
s.addText([
  { text: "Работает круглосуточно, без вашего ноутбука.\n", options: { breakLine: true } },
  { text: "Публичный адрес открывается у любого.\n", options: { breakLine: true } },
  { text: "Это и есть цель: чтобы сайт видели клиенты.", options: {} },
], { x: rx + 0.4, y: 3.25, w: colw - 0.8, h: 2.0, fontFace: FONT, fontSize: 15,
  color: INK2, margin: 0, lineSpacingMultiple: 1.35, bullet: { code: "2022", indent: 18 } });

footer(s, "Vercel и Timeweb дают вам такой сервер с публичным адресом. Свой компьютер держать включённым не нужно.");

// ==========================================================
// Slide 6 — Что такое деплой (диаграмма)
// ==========================================================
s = p.addSlide(); bg(s, CREAM);
title(s, "Что такое деплой");
sub(s, "Деплой это публикация. Взять код из GitHub, собрать рабочую версию и выложить её на сервер.");

const steps = [
  { t: "Код на GitHub", d: "исходный проект" },
  { t: "Сборка (build)", d: "готовая версия" },
  { t: "Сервер", d: "всегда онлайн" },
  { t: "Адрес в сети", d: "открыт всем" },
];
const bw = 2.55, bh = 1.55, tot = bw * 4, gapx = (W - 2 * M - tot) / 3, sy = 2.65;
steps.forEach((st, i) => {
  const x = M + i * (bw + gapx);
  card(s, x, sy, bw, bh, i === 3 ? GOLDT : WHITE, i === 3 ? GOLD : SAND);
  badge(s, x + bw / 2 - 0.29, sy + 0.22, 0.58, String(i + 1), i === 3 ? GOLD : TERRA, WHITE, 18);
  s.addText(st.t, { x: x + 0.1, y: sy + 0.85, w: bw - 0.2, h: 0.4, align: "center",
    fontFace: FONT, fontSize: 15, bold: true, color: INK, margin: 0 });
  s.addText(st.d, { x: x + 0.1, y: sy + 1.2, w: bw - 0.2, h: 0.3, align: "center",
    fontFace: FONT, fontSize: 11.5, color: MUTED, margin: 0 });
  if (i < 3) {
    s.addText("→", { x: x + bw, y: sy, w: gapx, h: bh, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 30, bold: true, color: TERRA, margin: 0 });
  }
});
s.addText("Раньше это делали руками: собрать, скопировать файлы на сервер, настроить. Сегодня всё делает сервис за вас.",
  { x: M, y: 4.85, w: W - 2 * M, h: 0.8, fontFace: FONT, fontSize: 15, color: INK,
    align: "center", margin: 0, lineSpacingMultiple: 1.1 });

// ==========================================================
// Slide 7 — CI/CD
// ==========================================================
s = p.addSlide(); bg(s, CREAM);
title(s, "CI/CD. Конвейер вместо ручной работы");
sub(s, "Как только вы или агент сделали push, конвейер сам собирает и публикует новую версию сайта.");

// определения
card(s, M, 2.0, colw, 1.5, WHITE, SAND);
s.addText([
  { text: "CI  ", options: { bold: true, color: TERRA, fontSize: 20 } },
  { text: "непрерывная сборка", options: { color: INK, fontSize: 17, bold: true } },
], { x: M + 0.35, y: 2.2, w: colw - 0.6, h: 0.5, fontFace: FONT, margin: 0 });
s.addText("Каждое изменение автоматически проверяется и собирается в рабочую версию.",
  { x: M + 0.35, y: 2.72, w: colw - 0.7, h: 0.7, fontFace: FONT, fontSize: 13.5, color: MUTED,
    margin: 0, lineSpacingMultiple: 1.1 });

card(s, M + colw + 0.5, 2.0, colw, 1.5, WHITE, SAND);
s.addText([
  { text: "CD  ", options: { bold: true, color: TERRA, fontSize: 20 } },
  { text: "непрерывная публикация", options: { color: INK, fontSize: 17, bold: true } },
], { x: rx + 0.35, y: 2.2, w: colw - 0.6, h: 0.5, fontFace: FONT, margin: 0 });
s.addText("Собранная версия сама выкладывается на сервер. Ничего копировать не нужно.",
  { x: rx + 0.35, y: 2.72, w: colw - 0.7, h: 0.7, fontFace: FONT, fontSize: 13.5, color: MUTED,
    margin: 0, lineSpacingMultiple: 1.1 });

// конвейер
const flow = ["push", "проверка", "сборка", "публикация", "сайт обновлён"];
const fw = 2.0, ftot = fw * 5, fgap = (W - 2 * M - ftot) / 4, fy = 4.15;
flow.forEach((f, i) => {
  const x = M + i * (fw + fgap);
  s.addShape(p.ShapeType.roundRect, { x, y: fy, w: fw, h: 0.85, rectRadius: 0.1,
    fill: { color: i === 4 ? INK : SAND }, line: { color: i === 4 ? INK : SANDLINE, width: 1 } });
  s.addText(f, { x, y: fy, w: fw, h: 0.85, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 13.5, bold: i === 4, color: i === 4 ? GOLD : INK, margin: 0 });
  if (i < 4) s.addText("›", { x: x + fw, y: fy, w: fgap, h: 0.85, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 24, bold: true, color: TERRA, margin: 0 });
});
footer(s, "Именно это вы начали настраивать на прошлом занятии через GitHub Actions. Vercel даёт то же самое из коробки.");

// ==========================================================
// Slide 8 — Три способа опубликовать
// ==========================================================
s = p.addSlide(); bg(s, CREAM);
title(s, "Три способа опубликовать сайт");
sub(s, "У всех общая идея: забрать код из GitHub и выложить на сервер. Отличается удобство и цена.");

const ways = [
  { h: "GitHub Actions", tag: "прошлое занятие", tagc: SAGE,
    pts: ["Гибко и бесплатно", "Настраивать нужно руками", "Хорошо для обучения"] },
  { h: "Vercel", tag: "сегодня", tagc: TERRA,
    pts: ["Бесплатно для наших задач", "Сам подхватывает GitHub", "Деплой за пару кликов"], accent: true },
  { h: "Timeweb", tag: "для России", tagc: GOLD,
    pts: ["Оплата картой РФ", "Готовая интеграция с GitHub", "Платно, от простого тарифа"] },
];
const ww = (W - 2 * M - 0.6) / 3, wh = 3.5, wsy = 2.05;
ways.forEach((w, i) => {
  const x = M + i * (ww + 0.3);
  card(s, x, wsy, ww, wh, w.accent ? GOLDT : WHITE, w.accent ? GOLD : SAND);
  s.addShape(p.ShapeType.roundRect, { x: x + 0.3, y: wsy + 0.3, w: 1.9, h: 0.4, rectRadius: 0.2,
    fill: { color: w.tagc } });
  s.addText(w.tag, { x: x + 0.3, y: wsy + 0.3, w: 1.9, h: 0.4, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 10.5, bold: true, color: WHITE, margin: 0 });
  s.addText(w.h, { x: x + 0.3, y: wsy + 0.85, w: ww - 0.6, h: 0.55,
    fontFace: FONT, fontSize: 22, bold: true, color: INK, margin: 0 });
  s.addText(w.pts.map((t, j) => ({ text: t, options: { breakLine: j < w.pts.length - 1 } })),
    { x: x + 0.32, y: wsy + 1.55, w: ww - 0.6, h: 1.7, fontFace: FONT, fontSize: 13.5,
      color: MUTED, margin: 0, lineSpacingMultiple: 1.25, bullet: { code: "2022", indent: 16 } });
});

// ==========================================================
// Slide 9 — Публикуем на Vercel (шаги)
// ==========================================================
s = p.addSlide(); bg(s, CREAM);
title(s, "Публикуем на Vercel");
sub(s, "Главная практика занятия. Делаем вместе, шаг за шагом.");

const vsteps = [
  "Заходим на vercel.com и входим через аккаунт GitHub.",
  "Add New → Project и выбираем свой репозиторий с сайтом.",
  "Vercel сам определяет Next.js. Настройки не трогаем.",
  "Нажимаем Deploy и ждём, пока пройдёт сборка.",
  "Готово: сайт открыт по адресу вида ваш-проект.vercel.app.",
  "Каждый следующий push обновляет сайт сам. Это и есть CI/CD.",
];
const vw = (W - 2 * M - 0.4) / 2;
vsteps.forEach((t, i) => {
  const col = Math.floor(i / 3), row = i % 3;
  const x = M + col * (vw + 0.4), y = 2.0 + row * 1.15;
  s.addShape(p.ShapeType.roundRect, { x, y, w: vw, h: 1.0, rectRadius: 0.1,
    fill: { color: i === 5 ? GOLDT : WHITE }, line: { color: i === 5 ? GOLD : SAND, width: 1 },
    shadow: shadow() });
  badge(s, x + 0.28, y + 0.24, 0.52, String(i + 1), i === 5 ? GOLD : TERRA, WHITE, 16);
  s.addText(t, { x: x + 1.0, y: y + 0.1, w: vw - 1.2, h: 0.8, valign: "middle",
    fontFace: FONT, fontSize: 13.5, color: INK, margin: 0, lineSpacingMultiple: 1.08 });
});

// ==========================================================
// Slide 10 — Промпты для агента
// ==========================================================
s = p.addSlide(); bg(s, INK);
title(s, "Промпты для агента", { color: WHITE });
sub(s, "Готовим проект к публикации и разбираем ошибки руками агента.", { color: "B9B1A7" });

const prompts = [
  "Проверь, что проект собирается командой npm run build. Если есть ошибки сборки, исправь их и объясни, что было не так.",
  "Объясни простыми словами, что произойдёт, когда я нажму Deploy на Vercel.",
  "У меня ошибка при деплое на Vercel: [вставить текст ошибки]. Объясни причину и предложи исправление.",
];
let py = 2.05;
prompts.forEach((t, i) => {
  s.addShape(p.ShapeType.roundRect, { x: M, y: py, w: W - 2 * M, h: 1.1, rectRadius: 0.1,
    fill: { color: INK2 }, line: { color: "3A3533", width: 1 } });
  badge(s, M + 0.3, py + 0.29, 0.52, String(i + 1), TERRA, WHITE, 16);
  s.addText(t, { x: M + 1.05, y: py + 0.14, w: W - 2 * M - 1.35, h: 0.82, valign: "middle",
    fontFace: "Consolas", fontSize: 13.5, color: "E8E1D6", margin: 0, lineSpacingMultiple: 1.1 });
  py += 1.3;
});
footer(s, "Правило прежнее: не нравится результат, говорите словами. Смотрите сайт в браузере после каждого шага.", true);

// ==========================================================
// Slide 11 — Timeweb
// ==========================================================
s = p.addSlide(); bg(s, CREAM);
title(s, "Timeweb. Альтернатива для России");
sub(s, "Российский хостинг с готовой интеграцией с GitHub. Работает без VPN, оплата картой РФ.");

// левый блок — как работает
card(s, M, 2.05, colw, 3.35, WHITE, SAND);
s.addText("Как это работает", { x: M + 0.35, y: 2.25, w: colw - 0.7, h: 0.45,
  fontFace: FONT, fontSize: 17, bold: true, color: INK, margin: 0 });
s.addText([
  { text: "Подключаете репозиторий с GitHub.", options: { breakLine: true } },
  { text: "При каждом push проект собирается сам.", options: { breakLine: true } },
  { text: "Сайт обновляется автоматически.", options: { breakLine: true } },
  { text: "Тот же CI/CD, что и на Vercel.", options: {} },
], { x: M + 0.4, y: 2.8, w: colw - 0.8, h: 2.4, fontFace: FONT, fontSize: 14.5, color: MUTED,
  margin: 0, lineSpacingMultiple: 1.4, bullet: { code: "2022", indent: 16 } });

// правый блок — когда пригодится
card(s, rx, 2.05, colw, 3.35, GOLDT, GOLD);
s.addText("Когда пригодится", { x: rx + 0.35, y: 2.25, w: colw - 0.7, h: 0.45,
  fontFace: FONT, fontSize: 17, bold: true, color: INK, margin: 0 });
s.addText([
  { text: "Нужен свой домен и оплата рублями.", options: { breakLine: true } },
  { text: "Аудитория в России, важна скорость.", options: { breakLine: true } },
  { text: "Не хотите зависеть от VPN.", options: { breakLine: true } },
  { text: "Сервис платный, от простого тарифа.", options: {} },
], { x: rx + 0.4, y: 2.8, w: colw - 0.8, h: 2.4, fontFace: FONT, fontSize: 14.5, color: INK2,
  margin: 0, lineSpacingMultiple: 1.4, bullet: { code: "2022", indent: 16 } });

footer(s, "Vercel для быстрого бесплатного старта. Timeweb, когда нужен домен, рубли и российская аудитория.");

// ==========================================================
// Slide 12 — Итог + домашка (тёмная)
// ==========================================================
s = p.addSlide(); bg(s, INK);
s.addText("CRAFT SCHOOL", { x: M, y: 0.75, w: 8, h: 0.4, fontFace: FONT, fontSize: 14, bold: true,
  color: TERRA, charSpacing: 3, margin: 0 });
s.addText("Итог занятия", { x: M, y: 1.35, w: 11, h: 0.9, fontFace: FONT, fontSize: 40, bold: true,
  color: WHITE, margin: 0 });
s.addText("Сайт опубликован, ссылка работает и обновляется автоматически на каждый push.",
  { x: M, y: 2.35, w: 11.5, h: 0.7, fontFace: FONT, fontSize: 17, color: "CFC8BE",
    margin: 0, lineSpacingMultiple: 1.15 });

// домашка карточка
s.addShape(p.ShapeType.roundRect, { x: M, y: 3.35, w: 7.6, h: 2.75, rectRadius: 0.12,
  fill: { color: INK2 }, line: { color: "3A3533", width: 1 } });
s.addText("Домашнее задание", { x: M + 0.4, y: 3.6, w: 6.8, h: 0.5,
  fontFace: FONT, fontSize: 19, bold: true, color: GOLD, margin: 0 });
s.addText([
  { text: "Сделайте 2-3 правки на сайте через агента.", options: { breakLine: true } },
  { text: "Запушите изменения в GitHub.", options: { breakLine: true } },
  { text: "Проверьте, что Vercel сам обновил сайт.", options: { breakLine: true } },
  { text: "Пришлите мастеру рабочую ссылку.", options: {} },
], { x: M + 0.45, y: 4.15, w: 6.8, h: 1.8, fontFace: FONT, fontSize: 15, color: "E8E1D6",
  margin: 0, lineSpacingMultiple: 1.4, bullet: { code: "2022", indent: 16 } });

// контакты
s.addShape(p.ShapeType.roundRect, { x: M + 8.0, y: 3.35, w: W - 2 * M - 8.0, h: 2.75, rectRadius: 0.12,
  fill: { color: TERRA } });
s.addText("Вопросы мастеру", { x: M + 8.35, y: 3.6, w: 3.4, h: 0.5,
  fontFace: FONT, fontSize: 17, bold: true, color: WHITE, margin: 0 });
s.addText([
  { text: "Telegram\n", options: { fontSize: 13, color: "FBEAE0", breakLine: true } },
  { text: "t.me/c_o_o_n\n\n", options: { fontSize: 18, bold: true, color: WHITE, breakLine: true } },
  { text: "Сайт курса\n", options: { fontSize: 13, color: "FBEAE0", breakLine: true } },
  { text: "craft-school.ru", options: { fontSize: 18, bold: true, color: WHITE } },
], { x: M + 8.35, y: 4.2, w: 3.5, h: 1.8, fontFace: FONT, margin: 0, lineSpacingMultiple: 1.0 });

s.addText("Спринт 2 завершён: у вас есть готовая ссылка на сайт в интернете.",
  { x: M, y: 6.55, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 13, italic: true, color: "8C857C", margin: 0 });

p.writeFile({ fileName: "/Users/coonjs/craft-school/website/scratch-pptx/craft-school-third-lesson.pptx" })
  .then(f => console.log("OK:", f));
