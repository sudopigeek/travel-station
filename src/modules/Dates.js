//const toNumbers = arr => { return arr.map((i) => Number(i)) }
export const validateDate = (dateFromString, dateToString, dateFromString1, dateToString1) => {
    let datefrom1 = dateFromString.split('T')[0];
    let dateto1 = dateToString.split('T')[0];
    let datefrom2 = dateFromString1.split('T')[0];
    let dateto2 = dateToString1.split('T')[0];
    if (datefrom2 > dateto1 && dateto1 < datefrom2) {
        //console.log(datefrom2 + " is greater than " + dateto1);
        return true;
    } else {
        if (datefrom1 > dateto2 && dateto2 < datefrom1) {
            //console.log(datefrom2 + " is greater than " + dateto1);
            return true;
        } else {
            return false;
        }
    }
}