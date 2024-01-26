import ejs from 'ejs';
import nodemailer, { Transporter } from 'nodemailer';
import path from 'path';
import config from '../config/keys.config';

interface IEmailOptions {
	email: string;
	subject: string;
	template: string;
	data: { [key: string]: any };
}

// send email function using nodemailer and sendinblue smtp
const sendEmail = async ({ email, subject, template, data }: IEmailOptions) => {
	// +[1] create transporter
	const transporter: Transporter = nodemailer.createTransport({
		service: 'mandrillapp',
		host: config.sendInBlueHost,
		port: config.sendInBluePort,
		auth: {
			user: config.sendInBlueUsername,
			pass: config.sendInBluePassword,
		},
	});

	// +[2] get email template path
	const templatePath = path.join(__dirname, `../mails/${template}`);

	// +[3] render email template with ejs
	const html = await ejs.renderFile(templatePath, data);

	// +[4] email options
	const emailOptions = {
		from: `Maz Realty Team <${config.sendInBlueEmail}>`,
		to: email,
		subject,
		html,
	};

	// +[5] send email
	await transporter.sendMail(emailOptions);
};

export default sendEmail;
