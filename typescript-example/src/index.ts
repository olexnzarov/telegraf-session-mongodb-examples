import * as dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';
import { setup } from './bot';

const initialize = async () => {
    const db = (await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })).db();
    const bot = setup(db);

    bot.launch();
};

initialize();
