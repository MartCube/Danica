const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID)

exports.handler = async (event, context, callback) => {
	const form = JSON.parse(event.body)
	const data = {
		to: process.env.DOMAIN,
		from: process.env.DOMAIN,
		subject: form.action,
		html: form.emailTemplate,
	}
	let response

	try {
		response = await sgMail.send(data)
		return {
			statusCode: 200,
			body: JSON.stringify({
				result: response.message,
			}),
		}
	} catch (error) {
		return {
			statusCode: error.statusCode || 500,
			body: JSON.stringify({
				error: error.message,
			}),
		}
	}
}
