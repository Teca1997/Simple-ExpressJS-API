import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SportClass } from './SportClass';

@Entity()
export class Sport {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 25 })
	name!: string;

	@OneToMany(() => SportClass, (sportClass) => sportClass.sport, {
		nullable: false
	})
	classes?: SportClass[];
}
