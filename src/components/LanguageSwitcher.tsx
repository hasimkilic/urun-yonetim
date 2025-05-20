'use client';
import i18n from '@/i18n';

export default function LanguageSwitcher() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lng;
    }
  };
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button onClick={() => changeLanguage('tr')}>TR</button>
      <button onClick={() => changeLanguage('en')}>EN</button>
    </div>
  );
}
