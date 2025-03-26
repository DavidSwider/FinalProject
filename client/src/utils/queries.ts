import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      tasks {
        _id
        taskText
        createdAt
      }
    }
  }
`;

export const QUERY_TASKS = gql`
  query getTasks {
    tasks {
      _id
      taskText
      taskAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_TASK = gql`
  query getSingleTask($taskId: ID!) {
    task(taskId: $taskId) {
      _id
      taskText
      taskAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      tasks {
        _id
        taskText
        taskAuthor
        createdAt
      }
    }
  }
`;
