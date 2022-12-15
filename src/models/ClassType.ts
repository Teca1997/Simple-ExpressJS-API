import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SportClass } from './SportClass';

@Entity()
export class ClassType {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 25 })
	name!: string;

	@Column({ type: 'text' })
	description!: string;

	@OneToMany(() => SportClass, (sportClass) => sportClass.sport, {
		nullable: false
	})
	classes?: number[];
}
