import mongoose, { Schema } from 'mongoose';

interface IMailLogs {
  logs: object;
}

const mailLogsSchema = new Schema<IMailLogs>(
  {
    logs: { type: Object, required: true },
  },
  {
    timestamps: true,
    strict: false,
  },
);

const MailLogs = mongoose.model<IMailLogs>('MailLogs', mailLogsSchema);

export { MailLogs, IMailLogs };
