import { config } from "dotenv";

config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const SERVICE_KEY = process.env.SERVICE_KEY;
export const TEMPLATE_KEY = process.env.TEMPLATE_KEY;
export const PUBLIC_KEY = process.env.PUBLIC_KEY;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
