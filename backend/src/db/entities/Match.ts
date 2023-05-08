import {
	Collection,
	Entity,
	EntitySchema,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
	Unique,
} from "@mikro-orm/core";

import type {Rel} from "@mikro-orm/core";

import { User } from "./User.js";

@Entity()
export class Match {
	@ManyToOne({ primary: true })
	owner!: Rel<User>;

	@ManyToOne({ primary: true })
	matchee!: Rel<User>;

	@Property()
	created_at = new Date();
}
