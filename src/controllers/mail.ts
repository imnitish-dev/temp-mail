import { IMail } from '@/models/mail';
import mailService from '@/services/mail';
import mailLogService from '@/services/mailLog';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { SMTPServerAddress, SMTPServerSession } from 'smtp-server';
import { Readable } from 'winston-daily-rotate-file';

class MailController {
  public getMail(req: Request, res: Response) {
    res.send('Mail received');
  }

  public onConnect(session: SMTPServerSession, callback: () => void): void {
    mailLogService
      .create({ logs: session as unknown as IMail })
      .then(() => {
        logger.info('Mail log saved');
      })
      .catch(err => {
        logger.error(err);
      });
    callback();
  }

  public onMailFrom(address: SMTPServerAddress, session: SMTPServerSession, callback: () => void): void {
    mailService
      .create({ data: { address, session } as unknown as IMail })
      .then(() => {
        logger.info('Mail saved');
      })
      .catch(err => {
        logger.error(err);
      });
    callback();
  }

  public onRcptTo(address: SMTPServerAddress, session: SMTPServerSession, callback: () => void): void {
    /**
     * onRcptTo { address: 'nitish@test-mail.imnitish.dev', args: false } {
  id: 'xakpgvgasqno3oux',
  secure: true,
  localAddress: '172.31.4.122',
  localPort: 25,
  remoteAddress: '209.85.208.45',
  remotePort: 57378,
  clientHostname: 'mail-ed1-f45.google.com',
  openingCommand: 'EHLO',
  hostNameAppearsAs: 'mail-ed1-f45.google.com',
  xClient: Map(0) {},
  xForward: Map(0) {},
  transmissionType: 'ESMTPS',
  tlsOptions: {
    name: 'TLS_AES_256_GCM_SHA384',
    standardName: 'TLS_AES_256_GCM_SHA384',
    version: 'TLSv1.3'
  },
  envelope: {
    mailFrom: { address: 'nitish8040@gmail.com', args: false },
    rcptTo: []
  },
  transaction: 1,
  servername: 'test-mail.imnitish.dev'
}
     */
    callback();
  }

  public onData(stream: Readable, session: SMTPServerSession, callback: () => void): void {
    console.log('stream- onData=>', stream);
   console.log(' session -onData=>', session);
   stream.pipe(process.stdout);
   stream.on('end', callback);
  }
}

export default new MailController();
