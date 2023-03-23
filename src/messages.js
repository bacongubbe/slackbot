const messages = [
    (user, lang) => `That looks like ${lang} to me <@${user}>. Keep it English here!`,
    (user, lang) => `Oi oi oi, no ${lang} in here <@${user}>. This is an English channel!`,
    (user, lang) => `<@${user}>, you're under arrest for speaking ${lang} and not English in this channel.`,
    (user, lang) => `I'm sure there are ${lang} channels out there <@${user}>. But in this one, we keep it English.`,
    (user, lang) => `<@${user}>, what did the bot say to the ${lang}-speaker?. Please speak English!`,
    (user, lang) => `<@${user}>, do you have a licence for that ${lang}?`,
    (user, lang) => `<@${user}>, if you want to practice your Spanish, French, ${lang} or Klingon, there's an app for that. This channel is for English speakers only.`,
    (user, lang) => `If we all spoke ${lang}, we'd probably still find something to argue about. But at least we'd understand each other. <@${user}>`,
    (user, lang) => `Don't worry <@${user}>, we won't judge your English skills. As long as you're not writing in Wingdings. Stop the ${lang} please`,
    (user, _) => `English may not be your first language <@${user}>, but with practice, it could be your second, third, or even fourth language! The possibilities are endless.`,
    (user, _) => `I don't always speak English <@${user}>, but when I do, I prefer to do it in this channel.`,
    (user, lang) => `Alas, dear <@${user}>, if ye seek to engage in discourse with us, pray thee use the noble tongue of English not ${lang}, lest ye be cast out like a wayward peasant!`,
    (user, _) => `To speak or not to speak English, that is the question <@${user}>. But let's make it simple, shall we? If thou wouldst converse in this channel, thou shalt do so in English. The end.`,
    (user, _) => `Hark, good <@${user}>! I beseech thee to heed this humble request - speaketh only in English! Forsooth, 'tis a rule most simple, yet most necessary.`,
    (user, _) => `Excuse me, kind <@${user}>!, but this channel is reserved for the use of English. 'Tis a language most supreme and fit for kings and queens. So, let's keep it that way, eh?`,
    (user, lang) => `Ahoy there, ye scurvy dog! I see ye be blabbering in ${lang} If ye seek to partake in the conversation, ye must do so in English. 'Tis a language most befitting for the likes of us, savvy <@${user}>?`,
    (user, _) => `Listen, <@${user}>, we're speaking English in this channel. It's the language of winners, and we want to win. So, let's use English and make this channel great again.`,
    (user, _) => `I'm sorry <@${user}>, but we're not speaking any other language here. It's just English. English is the language of business, and we mean business in this channel.`,
    (user, lang) => `No disrespect to ${lang}, but we're only speaking English in this channel <@${user}>. It's a beautiful language, tremendous language, and we want everyone to use it. It's non-negotiable.`,
    (user, lang) => `Hey <@${user}>, we're speaking English in this channel, m'kay? So let's all get on board and speak the same language, m'kay?, no ${lang}, m'kay?`,
    (user, lang) => `<@${user}>. You shall not pass... without speaking English in this channel. It is the language we have chosen, and we shall not be swayed. So let us all speak English and not give in to the darkness of ${lang}.`,
    (user, _) => `I am Gandalf, and I come to you now at the turn of the tide. Let us turn the tide of confusion and speak only English in this channel. So let us all speak English and move forward together. <@${user}>`,
    (user, _) => `Join me <@${user}>, and together we can rule the channel with the power of English. We will speak English, and nothing else. So let us all speak English and bring order to the galaxy.`,
]

export const getRandomMessage = (user, lang) => {
    const template = messages[Math.floor(Math.random() * messages.length)];
    return template(user, lang);
}