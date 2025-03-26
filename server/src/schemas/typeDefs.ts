const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    tasks: [Task]!
  }

  type Task {
    _id: ID
    taskText: String
    createdAt: String
    isCompleted: Boolean
    category: String
  }


  input TaskInput {
    taskText: String!
    category: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    tasks: [Task]!
    task(taskId: ID!): Task
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addTask(input: TaskInput!): String
    removeTask(taskId: ID!): Task
    completeTask(taskId: ID!, isCompleted: Boolean!): Task
    updateTask(taskId: ID!, input: TaskInput!): Task
  }
`;

export default typeDefs;
