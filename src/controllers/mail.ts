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
    console.log('onRcptTo', address, session);
    callback();
  }

  public onData(stream: Readable, session: SMTPServerSession, callback: () => void): void {
    console.log('onData', session);
    stream.pipe(process.stdout);
    stream.on('end', callback);
  }
}

export default new MailController();
