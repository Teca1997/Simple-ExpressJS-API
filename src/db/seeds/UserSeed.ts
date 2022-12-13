import { User } from "../../models/User";
import moment from "moment";

export const UserSeed: User[] = [
  {
    username: "teca",
    password: "$2a$12$NmJzp5tddnvBvNdftn2/EudmNKBk/LkC3eUK4opPai3OPyzGTpy1G",
    email: "domagoj.ppp@gmail.com",
    role: 2,
    verifiedDate: moment(),
  },
  {
    username: "teca1",
    password: "$2a$12$NmJzp5tddnvBvNdftn2/EudmNKBk/LkC3eUK4opPai3OPyzGTpy1G",
    email: "domagoj.ppp1@gmail.com",
  },
];
