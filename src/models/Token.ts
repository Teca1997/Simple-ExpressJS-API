import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { TokenType } from "./TokenType";
import { User } from "./User";

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({
    type: "timestamptz",
    default: Token.getExpiryDate(),
  })
  expiresOn: Date;

  @Column({ type: "text" })
  token!: string;

  @Column({ type: "number", name: "tokenTypeId", default: 1 })
  @ManyToOne(() => TokenType, (tokenType) => tokenType.tokens, {
    nullable: false,
  })
  tokenType!: number;

  @Column({ type: "number", name: "userId" })
  @ManyToOne(() => User, (user) => user.tokens, { nullable: false })
  user!: number;

  static getExpiryDate() {
    let date = new Date();
    let expiryDate = new Date(date.setDate(date.getDate() + 1));
    console.log(expiryDate);
    return expiryDate;
  }
}
