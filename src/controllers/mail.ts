import { IMail } from '@/models/mail';
import mailService from '@/services/mail';
import mailLogService from '@/services/mailLog';
import { logger } from '@/utils/logger';
import { parseEmailData } from '@/utils/mailparser';

import { Request, Response } from 'express';
import { SMTPServerAddress, SMTPServerSession } from 'smtp-server';
import { Readable } from 'winston-daily-rotate-file';

class MailController {
  public getMail(req: Request, res: Response) {
    const data = req.body.data;
    res.send(parseEmailData(data));
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
      .create({ address, session })
      .then(() => {
        logger.info('Mail saved');
      })
      .catch(err => {
        logger.error(err);
      });
    callback();
  }

  public onRcptTo(address: SMTPServerAddress, session: SMTPServerSession, callback: () => void): void {
    callback();
  }

  public onData(stream: Readable, session: SMTPServerSession, callback: () => void): void {
    let data = '';

    stream.on('data', chunk => {
      data += chunk.toString();
    });

    stream.once('end', () => {
      const parsedData = parseEmailData(data);
      mailService
        .create({ data: parsedData, session })
        .then(() => {
          logger.info('Mail data saved');
        })
        .catch(err => {
          logger.error(err);
        });
      callback();
    });
  }
}

export default new MailController();
