import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const BOT_USER_AGENT_REGEX =
  /googlebot|bingbot|baiduspider|yandexbot|duckduckbot|slurp|facebot|twitterbot|linkedinbot|applebot|petalbot|bytespider/i;

export default getRequestConfig(async () => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') ?? '';

  // Force default English for crawlers to keep SEO snippets consistent.
  if (BOT_USER_AGENT_REGEX.test(userAgent)) {
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default
    };
  }

  // Try to get locale from cookie first
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;

  // Then try Accept-Language header
  const acceptLanguage = headersList.get('accept-language');
  const browserLocale = acceptLanguage?.split(',')[0]?.split('-')[0];

  // Determine locale: cookie > browser > default
  let locale: Locale = defaultLocale;

  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    locale = cookieLocale as Locale;
  } else if (browserLocale && locales.includes(browserLocale as Locale)) {
    locale = browserLocale as Locale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
