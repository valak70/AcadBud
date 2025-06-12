const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

exports.sendVerificationEmail = async (to, name, url) => {
    try {
        const { token } = await oauth2Client.getAccessToken();
        if (!token) throw new Error("Failed to fetch access token.");


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                accessToken: token,
            },
        });

        await transporter.sendMail({
            from: `"AcadBud" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Verify your email address',
            text: `
                Hello ${name},

                Thank you for registering with AcadBud!

                Please verify your email address by clicking the link below:

                ${url}

                If you did not sign up for this account, you can ignore this email.

                - The AcadBud Team
                `
            });

    } catch (error) {
        throw new Error("Failed to send verification email.");
    }
};
