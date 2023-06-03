import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Boulder } from "../entities/Boulder.js";

/**
 * This class generates database entries for boulder problems
 */
export class BoulderSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		context.boulder1 = em.create(Boulder, {
			zone: 1,
			color: "red",
			score: 1000,
			grade: 6,
			note: "Climbers can't use wall features",
			imgUri: "dog.jpg"
		});
		context.boulder2 = em.create(Boulder, {
			zone: 4,
			color: "red",
			score: 1500,
			grade: 6,
			note: "Dyno move at the start",
			imgUri: "dog.jpg"
		});
		context.boulder3 = em.create(Boulder, {
			zone: 6,
			color: "red",
			score: 1000,
			grade: 6,
			note: "Bat-hang",
			imgUri: "dog.jpg"
		});
	}
}
