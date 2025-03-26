import { Schema, model, Document } from 'mongoose';

// Define an interface for the Task document


interface ITask extends Document {
  taskText: string;
  createdAt: Date;
  isCompleted: boolean;
  category: string;
}



// Define the schema for the Task document
const taskSchema = new Schema<ITask>(
  {
    taskText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
      enum: ['personal', 'work', 'school', 'chores', 'other'],
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Task = model<ITask>('Task', taskSchema);

export default Task;
