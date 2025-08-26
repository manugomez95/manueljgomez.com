import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const getCurrentLanguageDisplay = () => {
    return i18n.language === 'en' ? 'ES' : 'EN';
  };

  return (
    <button 
      className="language-toggle" 
      onClick={toggleLanguage}
      title={`Switch to ${i18n.language === 'en' ? 'Spanish' : 'English'}`}
    >
      <span className="language-text">
        {getCurrentLanguageDisplay()}
      </span>
    </button>
  );
};

export default LanguageSwitcher;