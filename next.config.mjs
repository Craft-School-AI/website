/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Позволяет собирать прод-версию в отдельную папку, не задевая .next
  // работающего дев-сервера: NEXT_DIST_DIR=.next-build npm run build
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Страницы «Модули» и «О программе» объединены в «Программу обучения» (/program).
  // Старый адрес держим живым: на него ведут внешние ссылки и выдача поиска.
  async redirects() {
    return [{ source: '/modules', destination: '/program', permanent: true }];
  },
};

export default nextConfig;
