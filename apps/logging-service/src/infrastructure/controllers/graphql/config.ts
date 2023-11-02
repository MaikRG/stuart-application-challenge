import { ApolloServer, gql } from "apollo-server";
import { v4 as uuidv4 } from "uuid";
import { CreateLogUseCase } from "../../../application/use-cases/create-log";
import { MongoDBLogRepository } from "../../mongodb-log-repository";
import { Log } from "../../../domain/models/log";
import { GetLogsUseCase } from "../../../application/use-cases/get-logs";
import { connect } from "mongoose";

const typeDefs = gql`
  type Log {
    id: String
    job_id: Int!
    message: String!
    status: String!
    created_at: String
  }
  type Query {
    getAll: [Log]!
  }

  type Mutation {
    addLog(job_id: Int!, status: String!, message: String!): Log!
  }
`;

const resolvers = {
  Mutation: {
    addLog: async (root: any, args: any) => {
      const usecase = new CreateLogUseCase(new MongoDBLogRepository());
      const log = new Log(args.job_id, args.status, args.message);
      const createdLog = await usecase.execute(log);
      return createdLog.toPrimitives();
    },
  },

  Query: {
    getAll: async () => {
      const usecase = new GetLogsUseCase(new MongoDBLogRepository());
      const logs = await usecase.execute();
      return logs.map((log) => log.toPrimitives());
    },
  },
};

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export const runGraphQLServer = async () => {
  const dabataseHost = process.env.MONGODB_HOST;
  const databasePort = process.env.MONGODB_PORT;
  const databaseName = process.env.MONGODB_DATABASE;
  const databaseUser = process.env.MONGODB_USER;
  const databasePassword = process.env.MONGODB_PASSWORD;

  const databaseURI: string = `mongodb://${databaseUser}:${databasePassword}@${dabataseHost}:${databasePort}`;
  connect(databaseURI, { dbName: databaseName })
    .then(() => {
      console.log(`[*] MongoDB Connected to ${dabataseHost}:${databasePort}`);
    })
    .catch((error) => {
      console.log(
        `[*] Error to connect MongoDB to ${dabataseHost}:${databasePort}`
      );
      console.log(error);
    });

  graphqlServer.listen(process.env.APP_PORT).then(({ url }) => {
    console.log(`[*] GraphQL Server ready at ${url}`);
  });
};
