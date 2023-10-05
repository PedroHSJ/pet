import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Brevo from '@getbrevo/brevo';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
    ) {}

    async sendVerificationCode(
        to: string,
        name: string,
        code: string,
        template: number,
        id?: string,
    ) {
        try {
            const brevo = require('@getbrevo/brevo');
            let defaultClient = brevo.ApiClient.instance;

            let apiKey = defaultClient.authentications['api-key'];
            // apiKey.apiKey =
            //     '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';
            apiKey.apiKey = process.env.BREVO_API_KEY;

            const apiInstance = new brevo.TransactionalEmailsApi();
            const templateId = template;
            var sendTestEmail = new brevo.SendSmtpEmail(); //

            sendTestEmail.templateId = templateId;
            sendTestEmail.to = [
                {
                    email: to,
                    name: name,
                },
            ];

            sendTestEmail.params = {
                items: [{ verification_code: code, name: name.toUpperCase() }],
            };

            const response = await apiInstance.sendTransacEmail(sendTestEmail);

            if (id) {
                await this.clientRepository.update(id, {
                    verificationCode: await hash(code, 10),
                });
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }

        //{"items":[{"verification_code":"1351"}]}
    }

    async;
}
