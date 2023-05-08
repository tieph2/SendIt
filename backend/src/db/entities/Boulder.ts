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

@Entity({ tableName: "boulders" })
export class Boulder extends BaseEntity {
    @Property()
    color!: string;

    @Property()
    score!: number;

    @Property()
    grade!: number;

    @Property()
    note: string;
}
