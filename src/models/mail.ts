import mongoose, { Schema } from 'mongoose';

interface IMail {
  data: object;
}

const mailSchema = new Schema<IMail>(
  {},
  {
    timestamps: true,
    strict: false,
  },
);

const Mail = mongoose.model<IMail>('Mail', mailSchema);

export { Mail, IMail };
