import { Task, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface TaskArgs {
  taskId: string;
  isCompleted?: boolean;
}

interface AddTaskArgs {
  taskId?: string;
  input:{
    taskText: string;
    category: string;
  }
}


const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('tasks');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('tasks');
    },
    tasks: async () => {
      return await Task.find().sort({ createdAt: -1 });
    },
    task: async (_parent: any, { taskId }: TaskArgs) => {
      return await Task.findOne({ _id: taskId });
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their tasks
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('tasks');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    addTask: async (_parent: any, { input }: AddTaskArgs, context: any) => {
      if (context.user) {
        const task = await Task.create({ ...input });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tasks: task._id } }
        );

        return "task added";
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    completeTask: async (_parent: any, { taskId, isCompleted }: TaskArgs, context: any) => {
      console.log("Complete task")
      if (context.user) {
        return Task.findOneAndUpdate(
          { _id: taskId },
          { $set:{isCompleted } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeTask: async (_parent: any, { taskId }: TaskArgs, context: any) => {
      if (context.user) {
        const task = await Task.findOneAndDelete({
          _id: taskId,
        });

        if(!task){
          throw new AuthenticationError('No Task Found!');
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tasks: task._id } }
        );

        return task;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateTask: async (_parent: any, { taskId, input }: AddTaskArgs, context: any) => {
      if (context.user) {
        return await Task.findOneAndUpdate(
          { _id: taskId },
          { $set:{...input} },
          { new: true }
        );
        
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

export default resolvers;
