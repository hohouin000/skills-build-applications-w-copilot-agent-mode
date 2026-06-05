import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    coachTip: { type: String, required: true }
  },
  { timestamps: true }
);

export type Workout = InferSchemaType<typeof workoutSchema>;

export const WorkoutModel = model('Workout', workoutSchema);
