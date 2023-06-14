import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import type { Ref } from "@mikro-orm/core";

import { User } from "./User.js";
import { Boulder } from "./Boulder.js";

@Entity({ tableName: "queue" })
export class Registration {
	@ManyToOne(() => User, {
		primary: true,
	})
	climber!: Ref<User>;

	@ManyToOne(() => Boulder, {
		primary: true,
	})
	boulder!: Ref<Boulder>;

	@Property()
	created_at = new Date();

	@Property()
	updated_at: Date = new Date();
}
