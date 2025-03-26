import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
  addUser(input: $input) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_TASK = gql`
 mutation AddTask($input: TaskInput!) {
  addTask(input: $input)
}
`;

export const REMOVE_TASK = gql`
 mutation RemoveTask($taskId: ID!) {
  removeTask(taskId: $taskId) {
    _id
  }
}
`;

export const COMPLETE_TASK = gql`
 mutation CompleteTask($taskId: ID!, $isCompleted: Boolean!) {
  completeTask(taskId: $taskId, isCompleted: $isCompleted) {
    _id
    isCompleted
  }
}
`;

export const UPDATE_TASK = gql`
 mutation UpdateTask($taskId: ID!, $input: TaskInput!) {
  updateTask(taskId: $taskId, input: $input) {
    _id
    taskText
    category
  }
}
`;
