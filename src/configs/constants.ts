require('dotenv').config();
export const PORT = process.env.PORT;

export const CORS_WHITE_LIST = ['localhost'];

export const MONGOOSE_CONNECTION_STRING =
  process.env.MONGOOSE_CONNECTION_STRING;
