import {
	Entity,
	Property,
	ManyToOne,
} from "@mikro-orm/core";
import type { Ref } from "@mikro-orm/core";

import { User } from "./User.js";
import { Boulder } from "./Boulder.js";

@Entity({ tableName: "attempts" })
export class Attempt {
	@ManyToOne(() => User, {
		primary: true,
	})
	climber!: Ref<User>;

	@ManyToOne(() => Boulder, {
		primary: true,
	})
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
