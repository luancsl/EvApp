import React from "react";
import HargreavesSamani from './hargreavesSamani';
import PenmanMonteith from './penmanMonteith';
import PriestleyTaylor from './priestleyTaylor';
import Linacre from './linacre';
import Camargo71 from './camargo71';

export default (equation) => {

    switch (equation) {
        case 'penman-monteith':
            return ((props) => (<PenmanMonteith
                equation={props.equation}
                onCalculateValue={props.onCalculateValue}
            />));
        case 'hargreaves-samani':
            return ((props) => (<HargreavesSamani
                equation={props.equation}
                onCalculateValue={props.onCalculateValue}
            />));
        case 'priestley-taylor':
            return ((props) => (<PriestleyTaylor
                equation={props.equation}
                onCalculateValue={props.onCalculateValue}
            />));
        case 'linacre':
            return ((props) => (<Linacre
                equation={props.equation}
                onCalculateValue={props.onCalculateValue}
            />));
        case 'camargo-71':
            return ((props) => (<Camargo71
                equation={props.equation}
                onCalculateValue={props.onCalculateValue}
            />));
        default:
            return null;
    }
} 