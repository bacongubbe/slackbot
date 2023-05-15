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
    if (event && event.type === 'message' && event.subtype !== 'bot_message' && event.subtype !== 'message_replied'){
        illegalWordCheck(event);
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
            react(event.channel, event.ts, 'wrong_language_arrest')
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

const react = async (channel, post, reaction) => {
    await web.reactions.add({
        timestamp: post,
        channel: channel,
        name: reaction
    })
}

const illegalWordCheck = async (event) => {
    console.log(event);
    if (event.text.toLowerCase().includes("the bench") || event.text.toLowerCase().includes("bänken")) {
        respondInThread(event.channel, event.thread_ts, 'We don\'t want to hear none of that language in here. Please call the PGP the PGP and nothing else.');
        react(event.channel, event.ts, 'no-benches-arrest');
    }
}