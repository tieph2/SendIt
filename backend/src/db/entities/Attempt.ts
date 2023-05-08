import {
    Collection,
    Entity,
    EntitySchema,
    OneToMany,
    PrimaryKey,
    Property,
    Unique,
    Cascade, ManyToOne,
} from "@mikro-orm/core";
import {User} from "./User.js";
import {Boulder} from "./Boulder.js";


@Entity({ tableName: "attempts" })
export class Attempt {
    @ManyToOne({ primary: true })
    athlete!: User;

    @ManyToOne({ primary: true })
    boulder!: Boulder;

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
