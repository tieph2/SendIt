import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";

export class UserSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		context.user1 = em.create(User, {
			name: "Jase",
			email: "email@email.com",
			skill_level: 3,
			role: UserRole.JUDGE,
			password: "admin",
		});
		context.user2 = em.create(User, {
			name: "Chase",
			email: "email2@email.com",
			skill_level: 5,
			role: UserRole.USER,

		});

		context.user3 = em.create(User, {
			name: "John",
			email: "email3@email.com",
			skill_level: 16,
			role: UserRole.USER,

		});

		context.user4 = em.create(User, {
			name: "Elaine",
			email: "email4@email.com",
			skill_level: 10,
			role: UserRole.USER,

		});
	}
}
