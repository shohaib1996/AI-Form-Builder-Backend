export const userRoles = {
  USER: "user",
  ADMIN: "admin",
} as const;
export const defaultRole = "user";
export const userPlanTypes = {
  NORMAL: "normal",
  PREMIUM: "premium",
} as const;
export const defaultPlan = userPlanTypes.NORMAL;