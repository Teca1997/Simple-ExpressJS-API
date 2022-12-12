import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { tokenRepo } from "../db";

@Entity()
export class Token extends BaseEntity {
  @PrimaryColumn({ type: "text" })
  token!: string;

  @Column({ type: "boolean", default: false })
  used!: boolean;

  @Column({ type: "number", name: "userId" })
  @ManyToOne(() => User, (user) => user.tokens, { nullable: false })
  user!: number;

  static async checkIsUsed(token: string): Promise<boolean | null> {
    const queryResult = await tokenRepo.findOne({ where: { token } });
    if (!queryResult) return null;
    return queryResult.raw[0].used;
  }

  static async use(token: string, userId: number) {
    console.log(
      await tokenRepo.update({ token: token, user: userId }, { used: true })
    );
  }
}
