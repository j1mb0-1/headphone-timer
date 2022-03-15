import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { en } from "./supportedLanguages";

i18n.translations = {
  en: en,
  ["en-US"]: en,
};
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;
