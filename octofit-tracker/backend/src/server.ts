import express from 'express';
import { connectDatabase, mongoUri } from './config/database';
import { ActivityModel } from './models/activity';
import { LeaderboardModel } from './models/leaderboard';
import { TeamModel } from './models/team';
import { UserModel } from './models/user';
import { WorkoutModel } from './models/workout';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', async (_req, res) => {
  const users = await UserModel.find().sort({ createdAt: 1 }).lean();
  res.json({ resource: 'users', count: users.length, items: users, baseUrl });
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await TeamModel.find().sort({ points: -1 }).lean();
  res.json({ resource: 'teams', count: teams.length, items: teams, baseUrl });
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await ActivityModel.find().sort({ activityDate: -1 }).lean();
  res.json({ resource: 'activities', count: activities.length, items: activities, baseUrl });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
  res.json({ resource: 'leaderboard', count: leaderboard.length, items: leaderboard, baseUrl });
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await WorkoutModel.find().sort({ createdAt: 1 }).lean();
  res.json({ resource: 'workouts', count: workouts.length, items: workouts, baseUrl });
});

app.get('/api', (_req, res) => {
  res.json({
    baseUrl,
    routes: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/'
    ]
  });
});

const start = async () => {
  try {
    await connectDatabase();
    console.log(`Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    console.error('MongoDB connection failed.', error);
    throw error;
  }

  app.listen(port, () => {
    console.log(`Octofit backend listening on port ${port}`);
    console.log(`Octofit API base URL: ${baseUrl}`);
  });
};

void start();
