// eslint-disable-next-line max-len
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
import type { Rel } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { User } from "./User.js";

@Entity()
export class Message extends BaseEntity {
	@ManyToOne()
	sender!: Rel<User>;

	@ManyToOne()
	receiver!: Rel<User>;

	@Property()
	message!: string;
}
