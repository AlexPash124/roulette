import {randomInteger} from "./helperFunction";

let instance = null;
export class Proxy { //для даних
    constructor() {
    }

    static getInstance() {
        if (instance == null) {
            instance = new Proxy();
        }
        return instance;
    }

    getRandomSector() {
        return randomInteger(0, 35);
    }

    getTextByBet(bet) {
        const map = {
            "0": "0 green",
            "1": "1 red",
            "2": "2 black",
            "3": "3 red",
            "4": "4 black",
            "5": "5 red",
            "6": "6 black",
            "7": "7 red",
            "8": "8 black",
            "9": "9 red",
            "10": "10 black",
            "11": "11 black",
            "12": "12 red",
            "13": "13 black",
            "14": "14 red",
            "15": "15 black",
            "16": "16 red",
            "17": "17 black",
            "18": "18 red",
            "19": "19 red",
            "20": "20 black",
            "21": "21 red",
            "22": "22 black",
            "23": "23 red",
            "24": "24 black",
            "25": "25 red",
            "26": "26 black",
            "27": "27 red",
            "28": "28 black",
            "29": "29 black",
            "30": "30 red",
            "31": "31 black",
            "32": "32 red",
            "33": "33 black",
            "34": "34 red",
            "35": "35 black",
            "36": "36 red"
        };

        return map[bet]
    }
}

