import { LanguageDevice } from "@common";
import { format, formatRelative, subDays, parseISO } from 'date-fns';
import { enUS, ptBR, pt } from 'date-fns/locale';

const locales = { enUS, ptBR, pt };

const normalizeTranslate = {
  'en_US': 'enUS',
  'pt_BR': 'ptBR',
  'en': 'enUS',
  'pt_US': 'ptBR',
  'pt_PT': 'pt',
}


const getLanguage = () => {
  let language = 'enUS';
  const languageDevice = LanguageDevice();
  const iHaveThisLanguage = normalizeTranslate.hasOwnProperty(languageDevice);
  if (iHaveThisLanguage) {
    return (normalizeTranslate[languageDevice]);
  }
  return language;

}


class DateFns {

  constructor() {

  }

  static mFormatRelative(date) {
    return formatRelative(parseISO(date), new Date(), {
      locale: locales[getLanguage()]
    });
  }

  static mFormat(date, formatStr = 'PP') {
    return format(date, formatStr, {
      locale: locales[getLanguage()]
    })
  }

  static mSubDays(date, value) {
    return subDays(date, value);
  }
}


export default DateFns;