const mongoose = require('mongoose');

const dbConnectionString = 'mongodb+srv://htr:htr@cluster0.rnma1.mongodb.net/testimonalDB?retryWrites=true&w=majority'

const mongoDBConnect = async () => {
    try {
        await mongoose.connect(dbConnectionString, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        console.log('Connection to db successful');
    } catch (err) {
        console.log('Connection to db failed');
        console.log(err);
        console.log('Teminating the application');
        process.exit(1);
    }
}

module.exports = mongoDBConnect;