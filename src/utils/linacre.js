const att = {
    J: 700,
}

const t_mean = (tmax, tmin) => {
    return (tmax + tmin) / 2.0;
};

const eto = (tmean, elmsl, lat, dewPoint) => {

    const temp0 = tmean + 0.006 * elmsl;
    const temp1 = 100 - lat;
    const temp2 = temp0 / temp1;
    const temp3 = att.J * temp2 + (15 * (tmean - dewPoint));
    const result = temp3 / (80 - tmean);

    return result;
}

export default ({ qg = null, qo, rhmean = null, tmax, tmin, u2 = null, elmsl, lat, dewPoint } = {}) => {
    console.log("Linacre", `${qg}, ${qo}, ${rhmean}, ${tmax}, ${tmin}, ${u2}, ${elmsl}, ${lat}, ${dewPoint}`);
    const Tmean = t_mean(tmax, tmin);

    const result = eto(Tmean, elmsl, lat, dewPoint);


    return result;

}