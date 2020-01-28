

const sia = {
    climate: async (lat, long, dataInicial, dataFinal, distancia) => {

        const request = await fetch(`http://ec2-52-67-22-198.sa-east-1.compute.amazonaws.com:3000/service/eto?lat=${lat}&lon=${long}&distance=${distancia}&startDate=${dataInicial}&endDate=${dataFinal}`)
        const resposta = await request.json();

        return resposta;
    },
    eto: (lat, long, dataInicial, dataFinal, distance = 100, service = 'inmet', type = 'station', equation = 'penman-monteith') => {

        const request = fetch(`http://ec2-18-228-5-158.sa-east-1.compute.amazonaws.com:3000/service/eto?lat=${lat}&lon=${long}&distance=${distance}&startDate=${dataInicial}&endDate=${dataFinal}&service=${service}&type=${type}&equation=${equation}`).then((value) => (value.json()))

        return request;
    },
    kc: async () => {

        const request = await fetch(`http://ec2-52-67-22-198.sa-east-1.compute.amazonaws.com:3000/kc?`)
        const resposta = await request.json();

        return resposta;
    },
    etc: async (lat, long, dataInicial, dataFinal, distancia, kc) => {

        const request = await fetch(`http://ec2-52-67-22-198.sa-east-1.compute.amazonaws.com:3000/service/etc?lat=${lat}&lon=${long}&distance=${distancia}&startDate=${dataInicial}&endDate=${dataFinal}&kc=${kc}`)
        const resposta = await request.json();

        return resposta;
    }
}

const requestElevation = async (lat, long) => {

    const request = await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${long}&key=AIzaSyA4qk-2c3Maa4iVFa3in9yg7MK5LBV5pfE`);
    const resposta = await request.json();
    const elevacao = resposta.results[0].elevation;

    return Math.round(elevacao);
}


module.exports = { sia, requestElevation };