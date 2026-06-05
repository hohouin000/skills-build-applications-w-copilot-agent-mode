import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    weekLabel: { type: String, required: true }
  },
  { timestamps: true }
);

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>;

export const LeaderboardModel = model('LeaderboardEntry', leaderboardSchema);
