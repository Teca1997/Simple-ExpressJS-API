import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { SportClass } from './SportClass';
import { User } from './User';

@Entity()
export class UserSportClass extends BaseEntity {
	@PrimaryColumn({ type: 'int', name: 'userId' })
	@ManyToOne(() => User, (user) => user.classes, { eager: true })
	@JoinColumn()
	user?: User | number;

	@PrimaryColumn({ type: 'int', name: 'sportClassId' })
	@ManyToOne(() => SportClass, (sportClass) => sportClass.users, {
		eager: true
	})
	@JoinColumn()
	sportClass?: SportClass | number;
}
