import db from '../config/connection.js';
import { Task, User } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' with { type: 'json'};
import taskData from './taskData.json' with { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await Task.insertMany(taskData);
    await User.create(userData);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
