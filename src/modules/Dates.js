const toNumbers = arr => { return arr.map((i) => Number(i)) }

export const validateDate = (dateFromString, dateToString, dateFromString1, dateToString1) => {
    let datefrom1 = dateFromString.split('T')[0];
    let dateto1 = dateToString.split('T')[0];
    let datefrom2 = dateFromString1.split('T')[0];
    let dateto2 = dateToString1.split('T')[0];
    if (datefrom2 > dateto1 && dateto1 < datefrom2) {
        return true;
    } else {
        if (datefrom1 > dateto2 && dateto2 < datefrom1) {
            return true;
        } else {
            return false;
        }
    }
}

export const GetCurrentDate = () => {
    const cDate = new Date()
    return ConvertDate(cDate.toISOString().split('T')[0])
}

// dateString must be formatted as YYYY-MM-DD
export const ConvertDate = (dateString) => {
    let elements = dateString.split("-")
    let output = ""
    if (elements[1].charAt(0) === '0') {
        output += Month[elements[1].substring(1) - 1] + " "
    } else {
        output += Month[elements[1] - 1] + " "
    }  
    if (elements[2].charAt(0) === '0') {
        output += elements[2].substring(1) + ", " + elements[0]
    } else {
        output += elements[2] + ", " + elements[0]
    }
    return output
}

export const ConvertTimeTo12Hr = (timeString) => {
    let content = toNumbers(timeString.split(':'));
    let output = "";
    if (content[0] > 12) {
        output += (content[0] - 12);
    }
    output += ":" + content[1];
    if (content[0] > 12) {
        output += " PM";
    } else {
        output += " AM";
    }
    return output;
}

export const GetDateDuration = (dateFromString, dateToString) => {
    let datefrom = toNumbers(dateFromString.split('T')[0].split('-'));
    let dateto = toNumbers(dateToString.split('T')[0].split('-'));
    let duration = 0;
    for (let i = datefrom[1]; i < (dateto[1] - datefrom[1]); i++) {
        if (i < dateto[1]) {
            duration += MonthDays[i];
        } else {
            duration += dateto[1];
            break;
        }
    }
    console.log(duration)
    //return duration; NOT WORKING
}

export const ConvertDateTime = (objString, use12HrFormat) => {
    let content = objString.split('T');
    if (use12HrFormat) {
        return ConvertDate(content[0]) + " " + ConvertTimeTo12Hr(content[1]);
    } else {
        return ConvertDate(content[0]) + " " + content[1];
    }  
}
const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
const MonthDays = [
    null,
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
]