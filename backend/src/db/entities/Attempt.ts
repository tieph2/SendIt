import {
	Collection,
	Entity,
	EntitySchema,
	OneToMany,
	PrimaryKey,
	Property,
	Unique,
	Cascade,
	ManyToOne,
} from "@mikro-orm/core";
import type { Ref, Rel } from "@mikro-orm/core";

import { User } from "./User.js";
import { Boulder } from "./Boulder.js";

@Entity({ tableName: "attempts" })
export class Attempt {
	@ManyToOne(
		() => User,
		{
			primary: true,
			cascade: [Cascade.PERSIST, Cascade.REMOVE]
		}
	)
	climber!: Ref<User>;

	@ManyToOne(
		() => User,
		{
			primary: true,
			cascade: [Cascade.PERSIST, Cascade.REMOVE]
		}
	)
	boulder!: Ref<Boulder>;

	@Property()
	count: number = 0;

	@Property()
	successful: boolean = false;

	@Property()
	note: string = "";

	@Property()
	created_at = new Date();

	@Property()
	updated_at: Date = new Date();
}
