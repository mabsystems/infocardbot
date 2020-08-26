require('dotenv').config()
const {Orders, Categories}  = require('./models')
const fs = require('fs')
const { Telegraf } = require('telegraf')
const port = process.env.INFOCARD_TELEGRAM_BOT_PORT
const bot = new Telegraf(process.env.INFOCARD_TELEGRAM_BOT_TOKEN)
const url = 'https://infocardbot.dreamcode.kz'
const Sequelize = require("sequelize")
const sequelize = require('./utils/database')

sequelize.sync()

bot.start((ctx) => {
    console.log(555)
    ctx.reply('Отправьте Ваш ИИН ...')
})

const tlsOptions = {
    key: fs.readFileSync('infocardbot.dreamcode.kz_key.key'),
    cert: fs.readFileSync('infocardbot.dreamcode_kz.crt')
}

setInterval(() => {
    console.log('work')
}, 1000)

bot.on('text', async ctx => {

    const text = ctx.message.text.trim()

    if (!isNaN(text) && text.length === 12) {

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

bot.telegram.setWebhook(`${url}/hook`)
bot.startWebhook('/hook', tlsOptions, port)


