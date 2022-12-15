import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity()
export class Token extends BaseEntity {
	@PrimaryColumn({ type: 'text' })
	token!: string;

	@Column({ type: 'number', name: 'userId' })
	@ManyToOne(() => User, (user) => user.tokens, { nullable: false })
	user!: number;
}
