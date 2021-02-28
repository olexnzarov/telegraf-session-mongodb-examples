require('dotenv').config();

const { MongoClient } = require('mongodb');
const { setup } = require('./bot');

const initialize = async () => {
    const db = (await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })).db();
    const bot = setup(db);

    bot.launch();
};

initialize();
