import {
	Entity,
	Property
} from "@mikro-orm/core";
import { SenditBaseEntity } from "./SenditBaseEntity.js";

@Entity({ tableName: "boulders" })
export class Boulder extends SenditBaseEntity {
	@Property()
	zone!: number;

	@Property()
	color!: string;

	@Property()
	score!: number;

	@Property()
	grade!: number;

	@Property()
	note: string;

	@Property({ fieldName: "imgURI" })
	imgUri!: string;
}
