require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendConfirmationEmail = async (toEmail) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: '🚀 Start Building Real Projects – Learn Smarter with OneStack!',
        text: `Hi [Student/Developer],

Thanks for being a part of the OneStack community!
We’re here to help you build real-world projects, stay on track, and grow your skills in the tech domain you're passionate about.

🌟 What’s New This Month:
🔥 New Project Ideas: Try out “Build a Weather App” and “Portfolio Site with Tailwind”.

🧭 Updated Roadmaps: Clearer paths for Web Dev, Python, and DSA learners.

📊 Progress Tracking: Your dashboard now highlights milestones—see how far you’ve come!

📚 Handpicked Resources: Best YouTube tutorials + free eBooks added weekly.

💡 Featured Tip:
Start Small, Stay Consistent.
Even 30 mins a day can build something big.

`,
};

    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
