import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { ClassType } from "./ClassType";
import { Sport } from "./Sport";

@Entity()
export class SportClass extends BaseEntity {
  @PrimaryColumn({ type: "int8", name: "sportId" })
  @ManyToOne(() => Sport, (sport) => sport.classes, { eager: true })
  @JoinColumn()
  sport!: Sport | number;

  @PrimaryColumn({ type: "int8", name: "classTypeId" })
  @ManyToOne(() => ClassType, (classType) => classType.classes, { eager: true })
  @JoinColumn()
  classType!: ClassType | number;

  @PrimaryColumn({ type: "time" })
  timeOfClass: Date;
}
