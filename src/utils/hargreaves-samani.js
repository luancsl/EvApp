const att = {

}


export default ({ qg = null, qo, rhmean = null, tmax, tmin, u2 = null, elmsl = null } = {}) => {
    console.log("hargreaves-samani", `${qg}, ${qo}, ${rhmean}, ${tmax}, ${tmin}, ${u2}, ${elmsl}`);
    const tmed = (tmax + tmin) / 2;
    const result = 0.0023 * 0.408 * (tmed + 17.8) * Math.pow((tmax - tmin), 0.5) * qo;

    return result;
}


