

import fs from 'fs';
import fetch from 'node-fetch';
import minimist from 'minimist'
import chalk from 'chalk';

//const OPENAI_API_KEY = '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'
const args = minimist(process.argv.slice(2));


const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};
const doRequestToChatGPT = async (url, content, locale) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": `Translate to ${locale} the content "${content}"`}]
        })
      });
  
      const data = await response.json();
      return data.choices[0].message.content;
  
    } catch (err) {
      console.log(err);
    }
  };
const requestLocaleToChatGPT = async (data, locale) => {
    return await doRequestToChatGPT('https://api.openai.com/v1/chat/completions', data, locale)
}
const createNewJson = (json, locale) => {
  let jsonString = JSON.stringify(json);
  fs.writeFileSync(`${locale}.json`, jsonString);
}

const fileDir = args.dir || 'locale.json'
const token = args.token
let locale = args.locale
locale = locale.split(',')

if(!args.token)
  console.error(chalk.red("You need to add the property --token with a valid token."))
else {
console.log(chalk.white(`We are using the source file dire ${fileDir}`))
console.log(chalk.white(`We will go to generate the files for the locales ${locale}`))

, locale, token

const jsonFile = await readJsonFile('locale.json')
let translatedObject = {}

/*await Promise.all(Object.keys(jsonFile).map(async item => {
    const translateData = await requestLocaleToChatGPT(jsonFile[item], locale)
    translatedObject[item] = translateData

}))*/
//createNewJson(translatedObject, locale)
}