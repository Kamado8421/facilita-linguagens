let hora = 1000000 // segundos

hora = hora / 3600
const resto = hora % 3600

const minuto = resto / 60
const segundo = resto % 60

//console.log(`${hora} : ${minutos} : ${segundos}`)
console.log(`${Math.floor(hora)}:${Math.floor(minuto)}:${Math.floor(segundo)}`)
console.log(`${Math.floor(hora)}h ${Math.floor(minuto)}m`)