import { NextResponse } from 'next/server';

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  comment?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+]?[\d\s()-]{10,18}$/;

function validate(payload: LeadPayload) {
  const errors: string[] = [];

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const comment =
    typeof payload.comment === 'string' ? payload.comment.trim() : '';

  if (name.length < 2) errors.push('Укажите имя');
  if (!PHONE_RE.test(phone)) errors.push('Укажите корректный телефон');
  if (!EMAIL_RE.test(email)) errors.push('Укажите корректный email');
  if (comment.length > 1000) errors.push('Комментарий слишком длинный');

  return { errors, lead: { name, phone, email, comment } };
}

// Telegram parse_mode=HTML: экранируем пользовательский ввод
function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Некорректный запрос' },
      { status: 400 },
    );
  }

  const { errors, lead } = validate(payload);
  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: errors.join('. ') },
      { status: 400 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error(
      '[lead] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы — заявка не отправлена:',
      lead,
    );
    return NextResponse.json(
      { ok: false, error: 'Форма временно недоступна. Напишите нам напрямую.' },
      { status: 503 },
    );
  }

  const text = [
    '🔨 <b>Новая заявка с Craft School</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Телефон:</b> ${escapeHtml(lead.phone)}`,
    `<b>Email:</b> ${escapeHtml(lead.email)}`,
    lead.comment ? `<b>Комментарий:</b> ${escapeHtml(lead.comment)}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      },
    );

    if (!response.ok) {
      const details = await response.text();
      console.error('[lead] Telegram API вернул ошибку:', details);
      return NextResponse.json(
        { ok: false, error: 'Не удалось отправить заявку. Попробуйте позже.' },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error('[lead] Ошибка сети при отправке в Telegram:', error);
    return NextResponse.json(
      { ok: false, error: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
