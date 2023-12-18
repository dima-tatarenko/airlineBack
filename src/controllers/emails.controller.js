// External imps
const nodemailer = require('nodemailer')

// Internal imps
const EmailModel = require('../models/email.model')

// const transporter = nodemailer.createTransport({
//     service: 'mail.trespiweb.com',
//     auth: {
//         user: 'flightifyconfirmation@trespiweb.com',
//         pass: 'DIAPhtiwmndzd4Nw'
//     }
// });

const transporter = nodemailer.createTransport({
    host: "host.trespiweb.com",
    port: 465,
    secure: false,
    auth: {
        user: "flightifyconfirmation@trespiweb.com",
        pass: "DIAPhtiwmndzd4Nw"
    },
    tls: {
        rejectUnauthorized: false // Accept self-signed certificates
    }
});


const notifyFlightUpdates = async (req, res) => {
    try {

        // Logic to check database for changes
        // If changes detected, compose the email


        const mailOptions = {
            from: 'flightifyconfirmation@trespiweb.com',
            to: 'dmitriy.tatarenko@gmail.com', // CAMBIA POR TU MAIL
            subject: 'Data Modification Alert',
            text: 'Hello, data has been modified in the database.'
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent successfully');
            }
        });
    } catch (error) {
        console.error(error);
    }
}


module.exports = { notifyFlightUpdates }


// Example function
// const getReservations = async (req, res) => {
//     try {
//         const { userId } = req.body;

//         const [userCheck] = await UserModel.selectById(Number(userId))
//         if (userCheck.length === 0) return res.json({ error: "This user doesn't exist." })

//         const [result] = await UserModel.selectReservations(Number(userId))

//         console.log(result)
//         res.json(result)

//     } catch (error) {
//         res.json({ error: error.message })
//     }
// }