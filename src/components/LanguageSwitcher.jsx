import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' }
  ];

  return (
    <select
  value={i18n.language}
  onChange={(e) => i18n.changeLanguage(e.target.value)}
  className="
    px-3 py-1 
    rounded-full 
    text-sm 
    bg-white/10 
    text-white/80 
    backdrop-filter 
    backdrop-blur-sm
    appearance-none
    cursor-pointer
    outline-none
    border border-white/20
    hover:bg-white/20
    transition-colors
    [&>option]:bg-white/80
    [&>option]:backdrop-blur-sm
    [&>option]:text-black/80
  "
>
  {languages.map((lang) => (
    <option 
      key={lang.code} 
      value={lang.code}
      className="bg-white/80 backdrop-blur-sm text-black/80"
    >
      {lang.label}  
    </option>
  ))}
</select>
  );
};

export default LanguageSwitcher;
