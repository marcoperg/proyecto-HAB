const sgMail = require("@sendgrid/mail");
const { randomString } = require("./");
const { getConnection } = require("./db");
// Send email
async function sendEmail({ email, title, content }) {
	sgMail.setApiKey(process.env.SENDGRID_KEY);

	const msg = {
		to: email,
		from: "hipniusF@protonmail.com",
		subject: title,
		text: content,
		html: `<div>
      <h1>Validate your email</h1>
      <p>${content}</p>  
    </div>`,
	};

	await sgMail.send(msg);
}

async function sendConfirmationEmail(email, id) {
	let connection;
	try {
		const registrationCode = randomString(40);
		const validationURL = `http://${process.env.PUBLIC_HOST}/users/validate?code=${registrationCode}`;

		try {
			await sendEmail({
				email: email,
				title: "Validate your email",
				content: `For validating your email please entering in this url: <a href=${validationURL}>${validationURL}</a>`,
			});
		} catch (error) {
			console.error(error);
			throw new Error("Error sending the email. Please retry later.");
		}

		connection = await getConnection();

		connection.query(`UPDATE users SET confirmation_code=? WHERE id=?`, [
			registrationCode,
			id,
		]);
		connection.release();
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
}
module.exports = { sendConfirmationEmail };
