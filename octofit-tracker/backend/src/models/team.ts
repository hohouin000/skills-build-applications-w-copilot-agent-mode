import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    coach: { type: String, required: true },
    location: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, required: true }
  },
  { timestamps: true }
);

export type Team = InferSchemaType<typeof teamSchema>;

export const TeamModel = model('Team', teamSchema);
