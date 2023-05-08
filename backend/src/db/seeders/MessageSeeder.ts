import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Message } from "../entities/Message.js";
import { User } from "../entities/User.js";

export class MessageSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		em.create(Message, {
			sender: context.user1,
			receiver: context.user2,
			message: "What's up!",
		});
		em.create(Message, {
			sender: context.user2,
			receiver: context.user1,
			message: "Wattup!",
		});
		em.create(Message, {
			sender: context.user2,
			receiver: context.user1,
			message: "Heyyo!",
		});
	}
}
