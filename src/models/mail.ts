import mongoose, { Schema } from 'mongoose';

interface IMail {
  userId?: string;
  sessionId?: string;
  address?: string;
  remoteAddress?: string;
  remotePort?: number;
  clientHostname?: string;
  data?: Record<string, any>;
  metaData?: unknown;
  createdAt?: Date;
  updatedAt?: Date;
}

const mailSchema = new Schema<IMail>(
  {
    userId: {
      type: String,
    },
    sessionId: {
      type: String,
    },
    address: {
      type: String,
    },
    remoteAddress: {
      type: String,
    },
    remotePort: {
      type: Number,
    },
    clientHostname: {
      type: String,
    },
    data: {
      type: Object,
    },
    metaData: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

const Mail = mongoose.model<IMail>('Mail', mailSchema);

export { Mail, IMail };
