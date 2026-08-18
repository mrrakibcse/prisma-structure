import { betterAuth } from "better-auth";
import { authConfig } from "./auth.config";

export const auth = betterAuth(authConfig);
export * from "./email.service";
export * from "./email-templates";
