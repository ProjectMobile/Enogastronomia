
var praca = [];
var hotels = [];
var circuito = [];

export function getPraca() {
    return praca;
}
export function getHotels() {
    return hotels;
}
export function getCircuito() {
    return circuito;
}

export const setPartners = (partnerss) => {

   const partners = partnerss;

    partners.forEach((element) => {
        if (String(element.type).toLowerCase() === 'hotel') {
            hotels.push(element)
        }
        else if (String(element.type).toLowerCase() === 'circuito') {
            circuito.push(element)
        }
        else if (String(element.type).toLowerCase() === 'praça') {
            praca.push(element)
        }

    });





}