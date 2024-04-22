import { IMail, Mail } from '@/models/mail';
import BaseService from './Base';
import { Document, Model } from 'mongoose';

class MailService extends BaseService<IMail & Document> {
  constructor() {
    super(Mail as Model<IMail & Document>);
  }
}

export default new MailService();
