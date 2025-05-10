const Subscriber = require('../models/Subscriber');
const { sendConfirmationEmail } = require('../utils/mailer');

exports.subscribeUser = async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: 'Email already subscribed' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        try {
            await sendConfirmationEmail(email);
        } catch (err) {
            console.error("Failed to send email:", err.message);
        }

        res.status(200).json({ message: 'Successfully subscribed!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Try again later.' });
    }
};

exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().select('email subscribedAt -_id');
        res.status(200).json({ subscribers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch subscribers' });
    }
};