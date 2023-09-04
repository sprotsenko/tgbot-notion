import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import config from 'config'
import { chatGPT } from './gpt.js'
import { create } from './notion.js'


const bot = new Telegraf(config.get('TG_TOKEN'), {
    handlerTimeout: Infinity
})

bot.command('start', context => {
    context.reply('Glory to Ukraine')
})

bot.on(message('text'), async (context) => {
    // await chatGPT(context.message.text)
    // context.reply

    try {
        const text = context.message.text
        if (!text.trim()) context.reply('Text can not be empty')

        const response = await chatGPT(text)

        if (!response) return context.reply('Error with API', response)

        const notionResponse = await create(text, response.content)

        context.reply(`Your page is: ${notionResponse.url}`)



    } catch (error) {
        console.log('Error while processing text: ', error.message)
    }

})

bot.launch()