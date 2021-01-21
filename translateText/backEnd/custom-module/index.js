//my api key: 38b946014b1f095853bff0e67a9f347b
let DetectLanguage = require('detectlanguage');

let detectLanguage = new DetectLanguage('38b946014b1f095853bff0e67a9f347b');

/*
detectTextLanguase method will return two things from every entry of a map. The detected language and a value determining
if the language is reliable
*/
const detectTextLanguage = (text) => {
    return new Promise((resolve, reject) => {
        detectLanguage.languages().then((result) => {
            let codeMap = new Map();
            result.forEach(element => {
                codeMap.set(`${element.code}`, {
                    language: `${element.name}`
                });
            });
            if (codeMap.size === 0) {
                reject('Error');
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
        });
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