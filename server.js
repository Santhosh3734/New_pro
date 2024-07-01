const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-invitation', (req, res) => {
    const { email } = req.body;
    console.log('Received request with email:', email);

    sendMeetingLink(email)
        .then(() => res.json({ success: true }))
        .catch((error) => {
            console.error('Error sending email:', error);
            res.json({ success: false });
        });
});

const sendMeetingLink = (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Meeting Invitation',
        text: 'Please join the meeting using the following link: https://meet.google.com/your-meeting-link'
    };

    return transporter.sendMail(mailOptions);
};

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
