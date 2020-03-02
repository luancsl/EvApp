const att = {

}

const t_mean = (tmax, tmin) => {
    return (tmax + tmin) / 2.0;
};

const adjustment_factor = (tmean) => {
    if (tmean <= 23.5) {
        return 0.01;
    } else if ((tmean >= 23.6) && (tmean <= 24.5)) {
        return 0.0105;
    } else if ((tmean >= 24.6) && (tmean <= 25.5)) {
        return 0.011;
    } else if ((tmean >= 25.6) && (tmean <= 26.5)) {
        return 0.0115;
    } else if ((tmean >= 26.6) && (tmean <= 27.5)) {
        return 0.012;
    } else {
        return 0.013;
    }
}

export default ({ qg = null, qo, rhmean = null, tmax, tmin, u2 = null, elmsl = null, period = 1 } = {}) => {

    console.log("Camargo", `${qg}, ${qo}, ${rhmean}, ${tmax}, ${tmin}, ${u2}, ${elmsl}, ${period}`);

    const Tmean = t_mean(tmax, tmin);
    const K = adjustment_factor(Tmean);
    const D = period;

    const result = qo * Tmean * K * D;

    return result;

}