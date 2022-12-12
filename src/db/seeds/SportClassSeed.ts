import { SportClass } from "../../models/SportClass";

export const SportClassSeed: SportClass[] = [
  {
    sport: 1,
    classType: 1,
    timeOfClass: new Date(new Date().setHours(12, 30, 0)),
  },
  { sport: 2, classType: 2, timeOfClass: new Date() },
  { sport: 3, classType: 3, timeOfClass: new Date() },
  { sport: 4, classType: 4, timeOfClass: new Date() },
];
