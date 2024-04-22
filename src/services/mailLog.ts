import { IMailLogs, MailLogs } from '@/models/mailLogs';
import BaseService from './Base';
import { Document, Model } from 'mongoose';

class MailLogService extends BaseService<IMailLogs & Document> {
  constructor() {
    super(MailLogs as Model<IMailLogs & Document>);
  }
}

export default new MailLogService();
