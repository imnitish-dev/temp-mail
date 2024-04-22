import mongoose, { Schema } from 'mongoose';
import { SMTPServerAddress, SMTPServerSession } from 'smtp-server';

interface IMail {
  id?: string;
  address?: SMTPServerAddress;
  session?: SMTPServerSession;
  data?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

const mailSchema = new Schema<IMail>(
  {
    address: {
      type: Object,
    },
    session: {
      type: Object,
    },
    data: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

const Mail = mongoose.model<IMail>('Mail', mailSchema);

export { Mail, IMail };
