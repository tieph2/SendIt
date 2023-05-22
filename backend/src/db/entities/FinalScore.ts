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
import {User} from "./User.js";

@Entity({ tableName: "scores" })
export class FinalScore {
    @Property({primary: true})
    athlete!: User;

    @Property()
    score: number = 0;
}
