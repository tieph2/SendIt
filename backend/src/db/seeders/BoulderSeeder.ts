import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Boulder } from "../entities/Boulder.js";

export class BoulderSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {
        em.create(Boulder, {
            zone: 1,
            color: 'red',
            score: 1000,
            grade: 6,
            note: 'This is a note for boulder 1'
        });
        em.create(Boulder, {
            zone: 4,
            color: 'red',
            score: 1500,
            grade: 6,
            note: 'Dyno move at the start'
        });
        em.create(Boulder, {
            zone: 6,
            color: 'red',
            score: 1000,
            grade: 6,
            note: 'Bat-hang'
        });
    }
}
