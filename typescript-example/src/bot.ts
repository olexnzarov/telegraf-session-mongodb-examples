import { Db } from "mongodb";

import { Context, Telegraf } from 'telegraf';
import { session } from 'telegraf-session-mongodb';

export interface SessionContext extends Context {
    session: any;
};

const bot = new Telegraf<SessionContext>(process.env.BOT_TOKEN);

export const setup = (db: Db) => {
    // session middleware MUST be initialized 
    // before any commands or actions that require sessions
    bot.use(session(db));

    bot.command('/increment', async (ctx) => {
        const count = (ctx.session.count || 0) + 1;

        await ctx.reply(`Count: ${count}`);

        ctx.session.count = count;
    });

    bot.command('/callback', async (ctx) => {
        await ctx.reply('Inline keyboard with callback', { 
            reply_markup: {
                inline_keyboard: [
                    [ 
                        { text: 'Increment', callback_data: 'increment_counter' } 
                    ]
                ]
            } 
        });
    });

    bot.on('callback_query', async (ctx) => {
        const count = (ctx.session.count || 0) + 1;

        console.log(`Callback Query ${ctx.from.id}: ${count}`)

        await ctx.answerCbQuery();

        ctx.session.count = count;
    });

    return bot;
};
