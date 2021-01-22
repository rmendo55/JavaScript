//my api key: 38b946014b1f095853bff0e67a9f347b
const DetectLanguage = require('detectlanguage');

const detectLanguage = new DetectLanguage('38b946014b1f095853bff0e67a9f347b');
const projectId = 'need-translation';
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
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
                reject('error');
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
            console.log(`error: ${err}`);
        }) ;
    });
};

const results = new Map();
//testing
let transText = ['My', 'name', 'is', 'Rafael', 'Mendoza'];
detectTextLanguage(transText, true, false).then((message) =>{
    let languageDetected = [...message][0][0].name;
    console.log(languageDetected);
}).catch((err) => {
    console.log(`error: ${err}`)
});

//Instantiate a client with credentials
const translate = new Translate({credentials: CREDENTIALS, projectId: CREDENTIALS.project_id});


//sample run to translate text
const quickStart = async () => {
    //text to translate
    const text = 'Hello World';
    
    //the target language
    const target = 'es';

    //Translate text to spanish
    try {
        const [translation] = await translate.translate(text,target);
        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
    } catch(err) {
        console.log(`err: ${err}`);
    }
    
} ;

quickStart();