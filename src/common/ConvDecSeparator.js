import { LanguageDevice } from '@common';


export default (value) => {
    const language = LanguageDevice();
    let result = parseFloat(value).toFixed(2);

    if (language == 'pt_BR') {
        result = result.replace('.', ',');
    } else if (language == 'pt_PT') {
        result = result.replace('.', ',');
    }

    return result;
}