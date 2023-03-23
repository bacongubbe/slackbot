require('dotenv').config();
import { RTMClient } from "@slack/rtm-api";
import { WebClient } from "@slack/web-api";
import { getRandomMessage } from "./messages";
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();

const token = process.env.TOKEN;
const rtm = new RTMClient(token);
const web = new WebClient(token);

rtm.start().catch(console.error)

rtm.on('ready', async () => {
    console.log('I am alive')
});

rtm.on('slack_event', async (_, event) => {
    if (event && event.type === 'message' && event.subtype !== 'bot_message'){
        console.log(event)
        const languages = lngDetector.detect(event.text)
        const swedish = languages.find(lang => lang[0] === 'swedish')
        const dutch = languages.find(lang => lang[0] === 'dutch')
        let lang = null;
        if(swedish && dutch){
            lang = swedish[1] > dutch[1] ? swedish : dutch;
        }
        if(swedish && !dutch){
            lang = swedish
        }
        if(dutch && !swedish){
            lang = dutch
        }

        if(lang && lang[1] > 0.3){
            react(event.channel, event.ts)
            if (event.thread_ts){
                respondInThread(event.channel, event.thread_ts, getRandomMessage(event.user, lang[0]));
                return;
            }
        respondInThread(event.channel, event.ts, getRandomMessage(event.user, lang[0]))
        }
    }
})

const respondInThread = async (channel, timestamp, message) => {
    await web.chat.postMessage({
        channel: channel,
        text: message,
        thread_ts: timestamp
    })
}

const react = async (channel, post) => {
    await web.reactions.add({
        timestamp: post,
        channel: channel,
        name: 'wrong_language_arrest'
    })
}