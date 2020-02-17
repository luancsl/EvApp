import { LanguageDevice } from "@common";
import I18n from 'i18n-js'
import en from './en-US' // importa o objeto de traduções para o idioma inglês
import pt from './pt-BR' // importa o objeto de traduções para o idioma português


// Função que irá nos auxiliar a normalizar as traduções que serão recebidas pela função getLanguageByDevice
// Isso é necessário pois no android e no iOS o retorno do mesmo idioma pode ser diferente
// Exemplo: no iOS podemos receber pt_US e no android pt_BR para o idioma português Brasil.
const normalizeTranslate = {
    'en_US': 'en_US',
    'pt_BR': 'pt_BR',
    'en': 'en_US',
    'pt_US': 'pt_BR',
    'pt_PT': 'pt_BR',
}

// Aqui setamos os idiomas que o I18N irá dar suporte
I18n.translations = {
    'en_US': en,
    'pt_BR': pt,
}

// Função responsável por verificar se o idioma atual do divice está sendo suportado, caso não ele irá setar como 'en_US'
const setLanguageToI18n = () => {
    const language = LanguageDevice()
    const translateNormalize = normalizeTranslate[language]
    const iHaveThisLanguage = I18n.translations.hasOwnProperty(translateNormalize)
    iHaveThisLanguage
        ? I18n.locale = translateNormalize
        : I18n.locale = 'en_US'
}

setLanguageToI18n()

export const string = key => I18n.t(key)