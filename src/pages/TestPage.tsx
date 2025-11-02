import LanguageSelect from "@/components/reuseComponent/LanguageSelect";
import { useTranslation } from "react-i18next";

 

export function TestPage() {
const { t,   } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <LanguageSelect/>
    </div>
  );
}