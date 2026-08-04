# Промпт для генерации сайта

Главный промпт ученика: по нему агент собирает первую версию сайта на нашей
базовой Next.js-заготовке (уже разбита на компоненты).

**Как пользоваться:**

1. Заполни **PART 1 — YOUR SITE** своими словами (между маркерами
   `▼ WRITE YOUR WISHES BELOW ▼` и `▲ END OF YOUR WISHES ▲`). Пиши на русском,
   как есть, без технических терминов — просто расскажи, что хочешь.
2. **PART 2 не трогай** — это инструкция для агента.
3. Скопируй **всё, что ниже строки «COPY EVERYTHING BELOW THIS LINE»**
   (обе части сразу) и вставь агенту.

> Сначала — «хотелки», потом агент по ним построит сайт. Чем подробнее
> заполнишь PART 1, тем меньше придётся переделывать.

---

============ COPY EVERYTHING BELOW THIS LINE ============

# PART 1 — YOUR SITE (fill this in — this is the only part you edit)

▼▼▼ WRITE YOUR WISHES BELOW ▼▼▼ (replace the examples in [ ] with your own)

**What my business is / what I sell:**
[e.g. I'm a manicure master, I sell nail services and want clients to book me]

**Who my clients are:**
[e.g. women 20–40 in my city who care about neat, lasting manicure]

**The ONE action I want a visitor to take:**
[e.g. leave a booking request / call me / see prices and choose a service]

**Pages I want:**
[e.g. Home, Services & Prices, About me, Reviews, Contacts]

**What should be on the HOME page (top to bottom):**
[e.g. big headline + a "Book" button, my 3 advantages, list of services with
prices, a few photos of my work, reviews, a contact form]

**Tone & personality:**
[e.g. warm and cozy, friendly, not corporate]

**Colors / mood:**
[e.g. soft beige and gold, or "surprise me — pick something that fits"]

**Must-have content (services, prices, contacts, socials):**
[e.g. services: classic 1500₽, gel 2500₽; phone …; Telegram/VK …; address …]

**Sites I like (as a reference):**
[paste 1–3 links, or describe what you liked]

**Anything to avoid / anything else:**
[e.g. no stock-photo vibe; must look great on a phone]

▲▲▲ END OF YOUR WISHES ▲▲▲


# PART 2 — BUILD INSTRUCTIONS (do NOT edit this part)

You are a senior fullstack developer (Next.js 15 App Router + TypeScript +
Tailwind CSS). Build the website described in PART 1.

**Setup (do this first).**
- Work in the **current git repository** — the folder that is already open.
  Do NOT create a new nested project folder, and keep the existing git history
  and remote. Make a first git commit once the project runs.
- If the folder already contains our Next.js + Tailwind + TypeScript starter
  (already split into a Header, Footer, page sections, a `Button` UI component
  and light/dark theme support), reuse and adapt it — rename, add and remove
  sections to match PART 1.
- If the starter is NOT present, scaffold a clean **Next.js 15 app (App Router)
  with TypeScript and Tailwind CSS** into the current directory, e.g.
  `npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir=false`,
  then build on it.
- Organise the code for **future maintainability**: one component per section
  under `components/`, shared UI (like `Button`) under `components/ui/`, pages
  and layout under `app/`. Everything typed (TypeScript), no dead code.

**Scope — build ONLY the website. Do NOT add any of the following:**
- ❌ No analytics or counters (Yandex.Metrika, Google Analytics, etc.)
- ❌ No cookie-consent banner
- ❌ No privacy policy, terms, or public offer pages
- ❌ No backend/integration for the contact form — the form is **UI only**
  (fields + client-side validation + a friendly "thank you" state). It must
  NOT send data anywhere (no Telegram, no VK, no email, no API route).
- ❌ No payment, no login/accounts, no CMS, no database.

Keep it to a clean, static marketing website. We add those other things later,
in a separate lesson.

**How to build:**
- Turn PART 1 into real pages and sections. Use the visitor's ONE action as the
  main call-to-action, repeated where it makes sense.
- Write ALL visible text in the language I used in PART 1 (Russian by default),
  short and free of technical jargon — my audience is not technical. If PART 1
  gives real content (services, prices), use it; otherwise write realistic
  placeholder copy I can edit.
- Clean component architecture: one component per section, a shared `Button`,
  reusable pieces. Everything typed (TypeScript). No dead code.
- Fully responsive (looks great on a phone first), with working light and dark
  theme, and subtle, tasteful animations.
- Basic per-page SEO metadata only (page `title` + `description`). Nothing more.
- If a colour/style wasn't specified, choose a cohesive palette that fits the
  business — avoid generic "AI" looks (no Inter font, no purple-on-white
  gradients, no cookie-cutter layout).

**Process:**
1. Read PART 1. If something critical is missing or unclear, ask me at most
   1–2 short questions — otherwise start building.
2. Build a first version of the whole site.
3. Show me how to run it on my computer and give me the local link to open.
4. Briefly explain what you built, in plain language for a non-technical person.

After the first version, I will review it in the browser and ask you for
changes in plain words.
