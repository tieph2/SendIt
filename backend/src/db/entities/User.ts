import {
	Collection,
	Entity,
	EntitySchema,
	OneToMany,
	PrimaryKey,
	Property,
	Unique,
	Cascade,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { Match } from "./Match.js";
import { Message } from "./Message.js";

@Entity({ tableName: "users" })
export class User extends BaseEntity {
	@Property()
	@Unique()
	email!: string;

	@Property()
	name: string;

	@Property()
	petType!: string;

	@Property()
	password: string = "password";

	// Note that these DO NOT EXIST in the database itself!
	@OneToMany(() => Match, (match) => match.owner, { cascade: [Cascade.PERSIST, Cascade.REMOVE] })
	matches!: Collection<Match>;

	@OneToMany(() => Match, (match) => match.matchee, { cascade: [Cascade.PERSIST, Cascade.REMOVE] })
	matched_by!: Collection<Match>;

	@OneToMany(() => Message, (message) => message.sender, {
		cascade: [Cascade.PERSIST, Cascade.REMOVE],
	})
	sent_messages!: Collection<Message>;

	@OneToMany(() => Message, (message) => message.receiver, {
		cascade: [Cascade.PERSIST, Cascade.REMOVE],
	})
	received_messages!: Collection<Message>;
}
// export const schema = new EntitySchema({
//     class: User,
//     extends: "BaseEntity",
//     properties: {
//         email: { type: "string" },
//     },
// });
