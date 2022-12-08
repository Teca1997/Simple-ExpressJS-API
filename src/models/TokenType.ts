import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Token } from "./Token";

@Entity()
export class TokenType extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({ type: "varchar", length: 25 })
  type!: string;

  @OneToMany(() => Token, (token) => token.tokenType)
  tokens?: Token[] | null;
}
