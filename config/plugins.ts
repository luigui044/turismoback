module.exports = {
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'luismedrano@innovasv.net',
                    pass: 'qwxhpubrzksoqmpp',
                },
            },
            settings: {
                defaultFrom: 'luismedrano@innovasv.net',
                defaultReplyTo: 'luishumberto.043@gmail.com',
            },
        },
    },
};
