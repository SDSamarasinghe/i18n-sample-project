import React, { useEffect } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    const languages = ["en", "nl"];
    languages.forEach((lang) => {
      fetch(`http://localhost:4001/api/labels/download/${lang}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          i18n.addResourceBundle(lang, "translation", data, true, true);
        });
    });
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h2>{t("Welcome to React")}</h2>
      <button onClick={() => changeLanguage("nl")}>Switch to Dutch</button>
      <button onClick={() => changeLanguage("en")}>Switch to English</button>

    </div>
  );
}

export default App;
