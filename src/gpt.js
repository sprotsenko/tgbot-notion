import openai from 'openai'
import config from 'config'

const CHATGPT_MODEL = 'gpt-3.5-turbo'
const ROLES = {
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    USER: 'user'
}
const openaigpt = new openai({
    apiKey: config.get('OPENAI_KEY')
})

const getMessage = (m) => 'Translate the following text from Ukr to Eng: ${m}'

export async function chatGPT (message = '') {
    const messages = [{
        role: ROLES.SYSTEM,
        content: 'You are an experienced copywriter that translates from Ukrainian to English'
    },
    {role: ROLES.USER, conrent: getMessage(message)}
]
    try {
        const completion = await openaigpt.chat.completions.create({
            messages,
            model: CHATGPT_MODEL
        })
        return completion.choices[0].message
    } catch (error) {
        console.error('Error while chat completion', error.message)
    }
}