import { runGraphQLServer } from "./infrastructure/controllers/graphql/config";
import * as dotenv from "dotenv";
import * as path from "path";

const envFilePath = path.resolve(
  `${__dirname}/config`,
  `${process.env.ENV}.env`
);

dotenv.config({
  path: envFilePath,
});

runGraphQLServer();
