import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
    async sendVerificationCode(
        to: string,
        code: string,
    ): Promise<SMTPTransport.SentMessageInfo> {
        try {
            const transport = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: to,
                subject: 'Código de verificação',
                text: `Seu código de verificação é: ${code}`,
            };

            return transport.sendMail(mailOptions);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
