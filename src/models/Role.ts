import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Role {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 25 })
	name!: string;

	@Column({ type: 'text' })
	description!: string;

	@OneToMany(() => User, (user) => user.role)
	users?: User[] | null;
}
