import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({ length: 25 })
  name!: string;

  @Column({ length: 255 })
  description!: string;

  @OneToMany(() => User, (user) => user.role)
  users?: User[] | null;
}
