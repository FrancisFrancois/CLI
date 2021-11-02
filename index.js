#!/usr/bin/env node 

import fetch from "node-fetch";
import readlineSync from "readline-sync";
import countries from "country-list";


const currentYear = new Date().getFullYear();
let user = readlineSync.question('Enter a country :')

const URL = "https://date.nager.at/api/v3/PublicHolidays/";

if (countries.getCode(user) == undefined) {
    do {
        user = readlineSync.question('No valid country found. : ')
    } while (countries.getCode(user) == undefined);
}

const countryCode = countries.getCode(user)
const countryName = countries.getName(countryCode)


const api = async (year, countryCode) => {
    const response = await fetch(URL + `${year}/${countryCode}`)
    const output = await response.json()

    return output

}

const showItem = async () => {
    const allHolidays = await api(currentYear, countryCode)
    console.log('\x1b[33m%s\x1b[0m',"Holiday for " + countryName+'\n')
    allHolidays.forEach(holiday => {

        if (holidayFix(holiday)) {
            console.log('\x1b[32m%s\x1b[0m', `${holiday.name}  : ${holiday.date}`)
        }
        else {
            console.log('\x1b[35m%s\x1b[0m', `${holiday.name}  : ${holiday.date}`)
        }

        
    });
    console.log('\x1b[35m%s\x1b[0m','\nColor purple is the unfixed holiday')
    console.log('\x1b[32m%s\x1b[0m','Color green is the fixed holiday')

}

const holidayFix = (holiday) => {

    if (holiday.fixed == true) {
        return true
    }

}

console.clear()
showItem()


