import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { BoulderSeeder } from "./BoulderSeeder.js";
import { UserSeeder } from "./UserSeeder.js";
import { AttemptSeeder } from "./AttempSeeder.js";
import { RegistrationSeeder } from "./RegistrationSeeder.js";

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		return this.call(em, [UserSeeder, BoulderSeeder, AttemptSeeder, RegistrationSeeder]);
	}
}
