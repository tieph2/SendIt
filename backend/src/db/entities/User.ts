import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { SenditBaseEntity } from "./SenditBaseEntity.js";
import { Attempt } from "./Attempt.js";

import { Enum } from "@mikro-orm/core";
export enum UserRole {
	ADMIN = "Admin",
	USER = "User",
	JUDGE = "Judge",
	CLIMBER = "Climber",
}

@SoftDeletable(() => User, "deleted_at", () => new Date())
@Entity({ tableName: "users" })
export class User extends SenditBaseEntity {
	@Property()
	@Unique()
	email!: string;

	@Property()
	name: string;

	@Property()
	skill_level: number;

	@Property()
	password: string = "password";

	@Enum(() => UserRole)
	role!: UserRole; // string enum

	@Property({fieldName: 'img_uri'})
	imgUri!: string;


	//Attempts
	@OneToMany(() => Attempt, (attempt) => attempt.climber, {
		cascade: [Cascade.PERSIST, Cascade.REMOVE],
	})
	attempts!: Collection<Attempt>;
}
