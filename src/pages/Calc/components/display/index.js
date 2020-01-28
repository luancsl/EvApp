import React from "react";
import HargreavesSamani from './hargreavesSamani';
import PenmanMonteith from './penmanMonteith';

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
        default:
            return null;
    }
} 