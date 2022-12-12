export const getEnv = (name: string): string => {
  if (!process.env[name]) {
    throw console.error("Token key not defined!!!!!");
  }
  return process.env[name] || "";
};
