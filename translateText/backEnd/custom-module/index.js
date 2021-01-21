//my api key: 38b946014b1f095853bff0e67a9f347b
let DetectLanguage = require('detectlanguage');

let detectLanguage = new DetectLanguage('38b946014b1f095853bff0e67a9f347b');

/*
Method to return list of detections 
Method will have two parameter of boolean type. Determing if key will short phrase or actual word of the language
*/
const getDetections = (shortPhrase, longPhrase) => {
    return new Promise((resolve, reject) => {
        let codeMap = new Map();
        detectLanguage.languages().then((result) => {
            result.forEach(element => {
                if (shortPhrase) {
                    codeMap.set(`${element.code}`, {name: `${element.name}`});
                }
                else if (longPhrase) {
                    codeMap.set(`${element.name}`, {code: `${element.code}`});
                }
            });
            if (codeMap.size === 0) {
                reject('err');
            }
            else {
                resolve(codeMap);
            }
        });
    });
};

/*
detectTextLanguase method will return two things from every entry of a map. The detected language and a value determining
if the language is reliable
*/
const detectTextLanguage = (text, shortPhrase, longPhrase) => {
    return new Promise((resolve, reject) => {
        getDetections(shortPhrase, longPhrase).then((result) => {
        let codeMap = result;
        if (codeMap.size === 0) {
            reject('err');
        } else {
            detectLanguage.detect(text).then((result) => {
                let languagesDetected = new Map();
                result.forEach(element => {
                    element.forEach(current => {
                        let code = codeMap.get(current.language);
                        languagesDetected.set(code, {isReliable: `${current.isReliable}`, code: `${current.language}`});
                        });
                    });
                    resolve(languagesDetected);
                });
            }    
        }).catch((err) => {
            console.log(err);
        }) ;
    });
};

/* 
Based on the API it is much faster when taking in 
an array of text and returns a list of detections than doing
a request for each text individually
*/

//Sample Run
let text = ['My', 'name', 'is', 'Rafael', 'Mendoza'];

/*
Method to tranlate text to another language
*/
const translateText = ((text, language) => {
    let stringTxt = convertToString(text);
    getDetections(false, true).then((result) => {
        let codeMap = result;
        if (codeMap.size === 0) {
            reject('err');
        } else {
            let toLanguage = codeMap.get(language).code; 
            //translate 
            detectTextLanguage(text, true, false).then((message) => {
            let fromLanguage = [...message][0][1].code;
            translate(text, {from: fromLanguage, to: toLanguage}).then(text => {
                console.log(text);
            });
            }).catch((err) => {
            console.log(`err: ${err}`)
            });
        }
        }).catch((err) => {
            console.log(err);
        }) ;
});

//method to convert text array to a single string
const convertToString = (textArr) => {
    let stringText = '';
    textArr.forEach((element,index) => {
        if (!(index + 1 === text.size)) {
            stringText += element + ' ';
        }
        else {
            stringText += element;
        }
    });
    return stringText;
};

translateText(text, 'SPANISH');