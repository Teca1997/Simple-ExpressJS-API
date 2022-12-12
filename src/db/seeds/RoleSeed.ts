import { Role } from "../../models/Role";

export const RoleSeed: Role[] = [
  {
    name: "Unverified user",
    description: "User that did not verify their email adress.",
  },
  {
    name: "Verified User",
    description: "User that verified their email adress.",
  },
  { name: "Admin", description: "System admin" },
];
