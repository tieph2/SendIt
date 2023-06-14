import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Attempt } from "../entities/Attempt.js";

/**
 * This class generates database entries for attempts
 */
export class AttemptSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		const attemptRepo = em.getRepository(Attempt);

		// https://mikro-orm.io/docs/seeding#shared-context

		// attemptRepo.create({
		// 	climber: context.user1,
		// 	boulder: context.boulder1,
		// 	count: 1,
		// 	successful: true,
		// 	note: "Good!",
		// });
		// attemptRepo.create({
		// 	climber: context.user1,
		// 	boulder: context.boulder2,
		// 	count: 1,
		// 	successful: true,
		// 	note: "Good!",
		// });
		// attemptRepo.create({
		// 	climber: context.user2,
		// 	boulder: context.boulder3,
		// 	count: 2,
		// 	successful: true,
		// 	note: "Nice send",
		// });
		// attemptRepo.create({
		// 	climber: context.user2,
		// 	boulder: context.boulder1,
		// 	count: 2,
		// 	successful: true,
		// 	note: "Nice send",
		// });
		// attemptRepo.create({
		// 	climber: context.user1,
		// 	boulder: context.boulder3,
		// 	count: 2,
		// 	successful: true,
		// 	note: "Nice send",
		// });
		// attemptRepo.create({
		// 	climber: context.user3,
		// 	boulder: context.boulder1,
		// 	count: 2,
		// 	successful: true,
		// 	note: "Nice send",
		// });
	}
}
