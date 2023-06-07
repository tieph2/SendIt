import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User } from "../entities/User.js";
import { Boulder } from "../entities/Boulder.js";
import { Registration } from "../entities/Registration.js";

/**
 * This class generates database entries for boulder problem sign up
 */
export class RegistrationSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const attemptRepo = em.getRepository(Registration);

    attemptRepo.create({
      climber: context.user1,
      boulder: context.boulder1
    });
    attemptRepo.create({
      climber: context.user1,
      boulder: context.boulder2
    });
    attemptRepo.create({
      climber: context.user2,
      boulder: context.boulder3
    });
  }
}
