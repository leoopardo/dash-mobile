import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translations.json";
import translationPTBR from "./locales/pt-BR/translations.json";

const resources = {
  en: { transtion: translationEN },
  "pt-BR": { translation: translationPTBR },
};

i18n.use(initReactI18next).init({
  resources,
  //language to use if translations in user language are not available
  fallbackLng: "pt-BR",
  saveMissing: true,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  
});

export default i18n;
