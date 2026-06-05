import mongoose from 'mongoose';
import { connectDatabase, mongoUri } from '../config/database';
import { ActivityModel } from '../models/activity';
import { LeaderboardModel } from '../models/leaderboard';
import { TeamModel } from '../models/team';
import { UserModel } from '../models/user';
import { WorkoutModel } from '../models/workout';

const log = (message: string) => {
  console.log(`[seed] ${message}`);
};

const seedDatabase = async () => {
  log('Seed the octofit_db database with test data');
  await connectDatabase();

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({})
  ]);

  const users = await UserModel.insertMany([
    {
      name: 'Ava Martinez',
      email: 'ava.martinez@octofit.dev',
      role: 'captain',
      teamName: 'Velocity Vipers',
      totalWorkouts: 18,
      totalPoints: 920
    },
    {
      name: 'Noah Chen',
      email: 'noah.chen@octofit.dev',
      role: 'member',
      teamName: 'Summit Sprinters',
      totalWorkouts: 14,
      totalPoints: 760
    },
    {
      name: 'Mia Johnson',
      email: 'mia.johnson@octofit.dev',
      role: 'member',
      teamName: 'Velocity Vipers',
      totalWorkouts: 20,
      totalPoints: 1010
    },
    {
      name: 'Ethan Brooks',
      email: 'ethan.brooks@octofit.dev',
      role: 'coach',
      teamName: 'Summit Sprinters',
      totalWorkouts: 11,
      totalPoints: 640
    }
  ]);

  const teams = await TeamModel.insertMany([
    {
      name: 'Velocity Vipers',
      coach: 'Ethan Brooks',
      location: 'Seattle Hub',
      members: [users[0]._id, users[2]._id],
      points: 1930
    },
    {
      name: 'Summit Sprinters',
      coach: 'Ethan Brooks',
      location: 'Austin Hub',
      members: [users[1]._id],
      points: 1400
    }
  ]);

  await ActivityModel.insertMany([
    {
      userId: users[0]._id,
      teamId: teams[0]._id,
      type: 'interval run',
      durationMinutes: 42,
      caloriesBurned: 520,
      distanceKm: 8.4,
      activityDate: new Date('2026-05-28T07:30:00.000Z')
    },
    {
      userId: users[1]._id,
      teamId: teams[1]._id,
      type: 'strength circuit',
      durationMinutes: 55,
      caloriesBurned: 610,
      distanceKm: 0,
      activityDate: new Date('2026-05-29T18:15:00.000Z')
    },
    {
      userId: users[2]._id,
      teamId: teams[0]._id,
      type: 'cycling ride',
      durationMinutes: 65,
      caloriesBurned: 740,
      distanceKm: 24.2,
      activityDate: new Date('2026-05-30T06:45:00.000Z')
    },
    {
      userId: users[3]._id,
      teamId: teams[1]._id,
      type: 'mobility flow',
      durationMinutes: 30,
      caloriesBurned: 180,
      distanceKm: 0,
      activityDate: new Date('2026-05-30T09:00:00.000Z')
    }
  ]);

  await LeaderboardModel.insertMany([
    {
      userId: users[2]._id,
      userName: users[2].name,
      teamName: teams[0].name,
      points: 1010,
      rank: 1,
      weekLabel: 'Week 22'
    },
    {
      userId: users[0]._id,
      userName: users[0].name,
      teamName: teams[0].name,
      points: 920,
      rank: 2,
      weekLabel: 'Week 22'
    },
    {
      userId: users[1]._id,
      userName: users[1].name,
      teamName: teams[1].name,
      points: 760,
      rank: 3,
      weekLabel: 'Week 22'
    },
    {
      userId: users[3]._id,
      userName: users[3].name,
      teamName: teams[1].name,
      points: 640,
      rank: 4,
      weekLabel: 'Week 22'
    }
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Sunrise Sprint Stack',
      focus: 'cardio',
      difficulty: 'medium',
      durationMinutes: 35,
      coachTip: 'Keep the first 10 minutes conversational, then build intensity.'
    },
    {
      title: 'Power Core Builder',
      focus: 'strength',
      difficulty: 'hard',
      durationMinutes: 45,
      coachTip: 'Brace your core before every repetition to protect your lower back.'
    },
    {
      title: 'Recovery Flow Reset',
      focus: 'mobility',
      difficulty: 'easy',
      durationMinutes: 25,
      coachTip: 'Move slowly through each stretch and hold your breathing steady.'
    }
  ]);

  log('Seed data inserted for users, teams, activities, leaderboard, and workouts');
};

const run = async () => {
  try {
    await seedDatabase();
    log(`Connected to ${mongoUri}`);
  } catch (error) {
    console.error('[seed] Failed to seed database', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

void run();