import { BaseEntity, PrimaryKey, Property } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";

@SoftDeletable(() => SenditBaseEntity, "deletedAt", () => new Date())
//https://mikro-orm.io/docs/defining-entities/#using-mikroorms-baseentity-previously-wrappedentity
export class SenditBaseEntity extends BaseEntity<SenditBaseEntity, "id"> {
	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt = new Date();

	@Property({ nullable: true })
	deletedAt?: Date;
}
