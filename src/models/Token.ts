import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { TokenType } from "./TokenType";
import { User } from "./User";
import { db } from "../db";

@Entity()
export class Token extends BaseEntity {
  static repo = db.getRepository("token");
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({
    type: "timestamptz",
    default: Token.getNewExpiryDate(),
  })
  expiresOn: Date;

  @Column({ type: "text" })
  token!: string;

  @Column({ type: "boolean", default: false })
  used!: boolean;

  @Column({ type: "number", name: "tokenTypeId", default: 1 })
  @ManyToOne(() => TokenType, (tokenType) => tokenType.tokens, {
    nullable: false,
  })
  tokenType!: number;

  @Column({ type: "number", name: "userId" })
  @ManyToOne(() => User, (user) => user.tokens, { nullable: false })
  user!: number;

  static getNewExpiryDate() {
    let date = new Date();
    let expiryDate = new Date(date.setDate(date.getDate() + 1));
    return expiryDate;
  }

  static async checkIsUsed(tokenId: number): Promise<boolean | null> {
    const queryResult = await this.repo.findOne({ where: { tokenId } });
    if (!queryResult) return null;
    return queryResult.raw[0].used;
  }

  static async use(tokenId: number, userId: number) {
    console.log(
      await this.repo.update({ id: tokenId, user: userId }, { used: true })
    );
  }
}
