import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { SportClass } from "./SportClass";
import { User } from "./User";
import { UserSportClass } from "./UserSportClass";

@Entity()
export class Rating extends BaseEntity {
  @PrimaryColumn({ type: "int", name: "userId" })
  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn()
  user?: User | number;

  @PrimaryColumn({ type: "int", name: "sportClassId" })
  @ManyToOne(() => SportClass, (sportClass) => sportClass.ratings, {
    eager: true,
  })
  @JoinColumn()
  sportClass?: UserSportClass | number;

  @Column({ type: "int" })
  rating!: number;
}
