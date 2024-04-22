import { IMail } from '@/models/mail';
import mailService from '@/services/mail';
import mailLogService from '@/services/mailLog';
import { logger } from '@/utils/logger';
import { parseEmailData } from '@/utils/mailparser';

import { Request, Response } from 'express';
import { SMTPServerAddress, SMTPServerSession } from 'smtp-server';
import { Readable } from 'winston-daily-rotate-file';

class MailController {
  public async getMail(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const { page, limit } = req.query;
      const data = await mailService.getAll({ userId }, { page: Number(page), limit: Number(limit) });

      if (data.length === 0) {
        return res.status(404).json({ message: 'Mail not found' });
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
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
      .create({
        sessionId: session.id,
        address: address.address,
        remoteAddress: session.remoteAddress,
        remotePort: session.remotePort,
        clientHostname: session.clientHostname,
      })
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
        .update({ sessionId: session.id }, {
          data: parsedData,
          userId: parsedData.to.split('@')[0]
        })
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
