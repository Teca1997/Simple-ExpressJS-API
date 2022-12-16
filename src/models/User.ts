import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { Comment } from './Comment';
import { Moment } from 'moment';
import { Rating } from './Rating';
import { Role } from './Role';
import { SportClass } from './SportClass';
import { Token } from './Token';
import { UserSportClass } from './UserSportClass';
import bcrypt from 'bcryptjs';
import { userRepo } from '../db';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 25, unique: true })
	username!: string;

	@Column({ length: 50, unique: true })
	email!: string;

	@Column({ type: 'char', length: 60 })
	password!: string;

	@Column({ type: 'timestamptz', nullable: true })
	verifiedDate?: Moment;

	@Column({ type: 'number', name: 'roleId', default: 1 })
	@ManyToOne(() => Role, (role) => role.users, { nullable: false, eager: true })
	role?: Role | number;

	@OneToMany(() => Token, (token) => token.user, { nullable: false })
	tokens?: Token[];

	@OneToMany(() => UserSportClass, (userSportClass) => userSportClass.user, {
		nullable: false
	})
	classes?: SportClass[];

	@OneToMany(() => Rating, (rating) => rating.user, {
		nullable: false
	})
	ratings?: Rating[];

	@OneToMany(() => Comment, (comment) => comment.user, {
		nullable: false
	})
	comments?: Rating[];

	static async isUsernameTaken(username: string): Promise<boolean> {
		return (await userRepo.findOne({ where: { username } })) == null ? false : true;
	}

	static async isEmailTaken(email: string): Promise<boolean> {
		return (await userRepo.findOne({ where: { email } })) == null ? false : true;
	}

	public async doesPasswordMatch?(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.password);
	}
}
