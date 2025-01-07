import { config } from "dotenv";
config()

export const EnvironmentVariables = {
    port: process.env.PORT,
    userDB: process.env.USERDB,
    encryptedSecretKey: process.env.ENCRYPTED_SECRET_KEY,
    mongoDBUrl: process.env.MONGODB_URL,
    jwtScretKey: process.env.JWT_SECRET_KEY,
    blobStorageConnectionString: process.env.CONNECTION_STRING,
    publicPathDirectory: process.env.PATH_PUBLIC_DIRECTORY,
    cookieSecretKey: process.env.COOKIE_SECRET_KEY,
    authDBUrl:process.env.AUTH_DB_URL
}