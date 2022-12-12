import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { ClassType } from "./ClassType";
import { Sport } from "./Sport";
import { User } from "./User";

@Entity()
export class SportClass extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @ManyToOne(() => Sport, (sport) => sport.classes, { eager: true })
  @JoinColumn()
  sport?: Sport | number;

  @ManyToOne(() => ClassType, (classType) => classType.classes, { eager: true })
  @JoinColumn()
  classType?: ClassType | number;

  @Column({ type: "time" })
  duration: Date;

  @Column({ type: "time" })
  timeOfClass: Date;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text", array: true })
  weekScheadule: string[];

  @OneToMany(() => User, (user) => user.classes, {
    nullable: false,
  })
  users?: User[];
}
