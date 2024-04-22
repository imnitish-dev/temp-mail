import { SMTPServer, SMTPServerOptions } from 'smtp-server';
import MailController from '@controllers/mail';
import { SMTP_PORT } from '@config';
import { logger } from './utils/logger';
class MySmtpServer {
  private server: SMTPServer;

  constructor() {
    const options: SMTPServerOptions = {
      onConnect: MailController.onConnect,
      onMailFrom: MailController.onMailFrom,
      onRcptTo: MailController.onRcptTo,
      onData: MailController.onData,
      allowInsecureAuth: true,
      authOptional: true,
    };

    this.server = new SMTPServer(options);
  }

  public start() {
    this.server.listen(SMTP_PORT, () => {
      logger.info(`SMTP server is running on port ${SMTP_PORT}`);
    });
  }
}

export default MySmtpServer;
