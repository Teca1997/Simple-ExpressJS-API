import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { SportClass } from './SportClass';
import { User } from './User';

@Entity()
export class Comment extends BaseEntity {
	@PrimaryColumn({ type: 'int', name: 'userId' })
	@ManyToOne(() => User, (user) => user.comments)
	@JoinColumn()
	user!: User | number;

	@PrimaryColumn({ type: 'int', name: 'sportClassId' })
	@JoinColumn()
	@ManyToOne(() => SportClass, (sportClass) => sportClass.comments, {
		eager: true
	})
	@JoinColumn()
	sportClass!: SportClass | number;

	@Column({ type: 'text' })
	comment!: string;
}
