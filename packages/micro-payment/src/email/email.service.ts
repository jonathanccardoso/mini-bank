import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from 'src/core/configuration/configuration.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private configApp;

  constructor(private readonly configurationService: ConfigurationService) {
    this.configApp = this.configurationService.get('app');

    this.transporter = nodemailer.createTransport({
      host: this.configApp.host,
      port: this.configApp.portMail,
      auth: {
        user: this.configApp.authUser,
        pass: this.configApp.authPass,
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configApp.mailFrom,
      to,
      subject,
      text: body,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
