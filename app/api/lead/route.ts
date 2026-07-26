import { NextResponse } from 'next/server';

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  cohort?: unknown;
  comment?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+]?[\d\s()-]{10,18}$/;

function validate(payload: LeadPayload) {
  const errors: string[] = [];

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const cohort =
    typeof payload.cohort === 'string' ? payload.cohort.trim().slice(0, 120) : '';
  const comment =
    typeof payload.comment === 'string' ? payload.comment.trim() : '';

  if (name.length < 2) errors.push('Укажите имя');
  if (!PHONE_RE.test(phone)) errors.push('Укажите корректный телефон');
  if (!EMAIL_RE.test(email)) errors.push('Укажите корректный email');
  if (comment.length > 1000) errors.push('Комментарий слишком длинный');

  return { errors, lead: { name, phone, email, cohort, comment } };
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

  // ВКонтакте вместо Telegram: api.vk.com доступен с серверов в РФ,
  // где api.telegram.org заблокирован (ConnectTimeout).
  const token = process.env.VK_ACCESS_TOKEN;
  const peerId = process.env.VK_PEER_ID;
  const apiVersion = process.env.VK_API_VERSION || '5.199';

  if (!token || !peerId) {
    console.error(
      '[lead] VK_ACCESS_TOKEN или VK_PEER_ID не заданы — заявка не отправлена:',
      lead,
    );
    return NextResponse.json(
      { ok: false, error: 'Форма временно недоступна. Напишите нам напрямую.' },
      { status: 503 },
    );
  }

  // VK messages не поддерживает разметку — отправляем простым текстом.
  const text = [
    '🔨 Новая заявка с Craft School',
    '',
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Email: ${lead.email}`,
    lead.cohort ? `Поток: ${lead.cohort}` : null,
    lead.comment ? `Комментарий: ${lead.comment}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  const params = new URLSearchParams({
    access_token: token,
    peer_id: peerId,
    message: text,
    // random_id обязателен: VK использует его для дедупликации сообщений.
    random_id: String(Date.now() + Math.floor(Math.random() * 1_000_000)),
    v: apiVersion,
  });

  try {
    const response = await fetch('https://api.vk.com/method/messages.send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    // VK отвечает HTTP 200 даже при ошибке: реальная ошибка лежит в теле в поле error.
    const data = (await response.json()) as {
      response?: number;
      error?: { error_code?: number; error_msg?: string };
    };

    if (!response.ok || data.error) {
      console.error(
        '[lead] VK API вернул ошибку:',
        data.error ?? `HTTP ${response.status}`,
      );
      return NextResponse.json(
        { ok: false, error: 'Не удалось отправить заявку. Попробуйте позже.' },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error('[lead] Ошибка сети при отправке во ВКонтакте:', error);
    return NextResponse.json(
      { ok: false, error: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
