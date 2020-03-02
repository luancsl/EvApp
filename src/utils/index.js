import _penmanMonteith from './penman-monteith';
import _hargreavesSamani from './hargreaves-samani';
import _priestleyTaylor from './priestley-taylor';
import _camargo71 from './camargo-71';
import _linacre from './linacre';


export default (equation) => {
    switch (equation) {
        case 'penman-monteith':
            return [_penmanMonteith, equation];
        case 'hargreaves-samani':
            return [_hargreavesSamani, equation];
        case 'priestley-taylor':
            return [_priestleyTaylor, equation];
        case 'camargo-71':
            return [_camargo71, equation];
        case 'linacre':
            return [_linacre, equation];
        default:
            return [_penmanMonteith, 'penman-monteith'];
    }
} 