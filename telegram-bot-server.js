require('dotenv').config()
const {Orders, Categories, TelegramBotStatistics}  = require('./models')
const fs = require('fs')
const { Telegraf } = require('telegraf')
const port = process.env.INFOCARD_TELEGRAM_BOT_PORT
const bot = new Telegraf(process.env.INFOCARD_TELEGRAM_BOT_TOKEN)
const Sequelize = require("sequelize")
const sequelize = require('./utils/database')
const env = process.env.NODE_ENV || 'development'

let url
let tlsOptions
if (env !== 'development') {
    url = 'https://infocardbot.dreamcode.kz'
    tlsOptions = {
        key: fs.readFileSync('infocardbot.dreamcode.kz_key.key'),
        cert: fs.readFileSync('infocardbot.dreamcode_kz.crt')
    }
} else {
    url = 'https://e82ae3253fcd.ngrok.io'
    tlsOptions = null
}

bot.telegram.setWebhook(`${url}/hook`)
bot.startWebhook('/hook', tlsOptions, port)

bot.start(async (ctx) => {

    await TelegramBotStatistics.create({
        name: ctx.message.from.first_name,
        telegramID: ctx.message.from.username,
        method: 'start'
    })
    await ctx.reply('Отправьте Ваш ИИН ...')
})

sequelize.sync()

bot.on('text', async ctx => {

    const text = ctx.message.text.trim()

    if (!isNaN(+text) && text.length === 12) {

        await TelegramBotStatistics.create({
            name: ctx.message.from.first_name,
            telegramID: ctx.message.from.username,
            method: 'info',
            iin: text
        })

        const o = await Orders.findOne({
            attributes: ['name','lastname', 'iin', 'status', 'numeration'],
            include: [{model: Categories, attributes: ['name'] }],
            where: {
                iin: text,
                status: {
                    [Sequelize.Op.in]: [10,20,30,35,40,45,50]
                }
            }
        })

        let st
        let ans
        if (o) {
            if (o.status !== 50) {
                let s
                switch (o.status) {
                    case 10:
                        s = 1
                        break
                    case 20:
                        s = 2
                        break
                    case 30:
                        s = 3
                        break
                    case 35:
                        s = 4
                        break
                    case 40:
                        s = 5
                        break
                    case 45:
                        s = 6
                        break
                    case 50:
                        s = 7
                        break
                }
                st = `Не готово (Этап ${s} из 7)`
            } else {
                st = `Готова к выдаче`
            }

            const numeration = o.numeration ? `\nНомер карты: ${o.numeration.toString().substring(0, 3) + ' ' + o.numeration.toString().substring(3, 6) + ' ' + o.numeration.toString().substring(6)}` : ''
            ans = `${o.lastname} ${o.name}\nИИН: ${o.iin}${numeration}\nСтатус карты: ${st}`
        } else {
            ans = 'Нет активной заявки'
        }

        await ctx.reply(ans)
    } else {
        await ctx.reply('Пожалуйста, введите правильный ИИН: 12 цифр без пробелов')
    }


})




