import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Brevo from '@getbrevo/brevo';
import axios from 'axios';
@Injectable()
export class EmailService {
    // async sendVerificationCode(
    //     to: string,
    //     code: string,
    // ): Promise<SMTPTransport.SentMessageInfo> {
    //     try {
    //         const transport = nodemailer.createTransport({
    //             host: 'smtp-relay.brevo.com',
    //             port: 587,
    //             secure: false, // true for 465, false for other ports
    //             auth: {
    //                 user: process.env.EMAIL_USER,
    //                 pass: process.env.EMAIL_PASS,
    //             },
    //         });

    //         const mailOptions = {
    //             from: process.env.EMAIL_USER,
    //             to: to,
    //             subject: 'Código de verificação',
    //             text: `Seu código de verificação é: ${code}`,
    //         };

    //         return transport.sendMail(mailOptions);
    //     } catch (error) {
    //         throw new BadRequestException(error.message);
    //     }
    // }

    async sendVerificationCode(to: string, name: string, code: string) {
        try {
            const brevo = require('@getbrevo/brevo');
            let defaultClient = brevo.ApiClient.instance;

            let apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = process.env.BREVO_API_KEY;

            const apiInstance = new brevo.TransactionalEmailsApi();
            const templateId = 1;
            var sendTestEmail = new brevo.SendTestEmail(); // SendTestEmail |

            sendTestEmail.emailTo = [to];
            sendTestEmail.params = {
                items: [{ verification_code: code, name: name.toUpperCase() }],
            };

            apiInstance.sendTestTemplate(templateId, sendTestEmail).then(
                function (data) {
                    console.log(
                        'API called successfully. Returned data: ' + code,
                    );
                    console.log(data);
                },
                function (error) {
                    console.error(code, error);
                },
            );
        } catch (error) {
            throw new BadRequestException(error.message);
        }

        //{"items":[{"verification_code":"1351"}]}
    }
}
