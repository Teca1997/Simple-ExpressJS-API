import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Role } from "./Role";
import { Token } from "./Token";
import { userRepo } from "../db";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({ length: 25, unique: true })
  username!: string;

  @Column({ length: 50, unique: true })
  email!: string;

  @Column({ type: "char", length: 60 })
  password!: string;

  @Column({ type: "timestamptz", nullable: true })
  verifiedDate!: Date;

  @Column({ type: "number", name: "roleId", default: 1 })
  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  role!: number;

  @OneToMany(() => Token, (token) => token.user, { nullable: false })
  tokens?: Token[];

  static async isUsernameTaken(username: string): Promise<boolean> {
    return (await userRepo.findOne({ where: { username } })) == null
      ? false
      : true;
  }

  static async isEmailTaken(email: string): Promise<boolean> {
    return (await userRepo.findOne({ where: { email } })) == null
      ? false
      : true;
  }
}
