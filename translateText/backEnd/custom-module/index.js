//my api key: 38b946014b1f095853bff0e67a9f347b
let DetectLanguage = require('detectlanguage');
let translate = require('translate');

let detectLanguage = new DetectLanguage('38b946014b1f095853bff0e67a9f347b');

/*
Method to return list of detections 
*/
const getDetections = () => {
    return new Promise((resolve, reject) => {
        let codeMap = new Map();
        detectLanguage.languages().then((result) => {
            result.forEach(element => {
                codeMap.set(`${element.code}`, {language: `${element.name}`});
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
const detectTextLanguage = (text) => {
    return new Promise((resolve, reject) => {
        getDetections().then((result) => {
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
detectTextLanguage(text).then((message) => {
    console.log(message);
}).catch((err) => {
    console.log(`err: ${err}`)
});

/*
Method to tranlate text to another language
*/

const translate = ((text, language) => {

});