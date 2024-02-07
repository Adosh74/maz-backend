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

const sendMail = async (options: IEmailOptions): Promise<void> => {
	const transporter: Transporter = nodemailer.createTransport({
		host: `${config.smtpHost}`,
		port: config.smtpPort,
		pool: true,
		service: `${config.smtpService}`,
		auth: {
			user: `${config.smtpUser}`,
			pass: `${config.smtpPass}`,
		},
	});

	const { email, subject, template, data } = options;

	const templateFile = path.join(__dirname, `./../mails/${template}`);

	const html: string = await ejs.renderFile(templateFile, data);

	const mailOptions = {
		from: process.env.MAIL_USER,
		to: email,
		subject,
		html,
	};
	await transporter.sendMail(mailOptions);
};

export default sendMail;
