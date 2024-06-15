import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("secrets failed");
}

export default { PORT };
