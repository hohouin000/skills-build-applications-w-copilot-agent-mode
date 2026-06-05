import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: false },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    activityDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export type Activity = InferSchemaType<typeof activitySchema>;

export const ActivityModel = model('Activity', activitySchema);
