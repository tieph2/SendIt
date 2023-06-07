import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import { UploadFileToMinio } from "../../plugins/minio.js";

/**
 * This class generates database entires for users
 */
export class UserSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const __parentdir = path.dirname(__dirname);
		const __granddir = path.dirname(__parentdir);

		const image = await fs.readFile(path.resolve(__granddir, 'assets/images', `dog.jpg`))
			.catch( err => {
				console.error(err);
			});

		const file = {
			file: image,
			filename: `dog.jpg`
		}

		await UploadFileToMinio(file);

		context.user1 = em.create(User, {
			name: "Jase",
			email: "email@email.com",
			skill_level: 3,
			role: UserRole.JUDGE,
			password: "admin",
			imgUri: "dog.jpg"
		});
		context.user2 = em.create(User, {
			name: "Chase",
			email: "email2@email.com",
			skill_level: 5,
			role: UserRole.USER,
			imgUri: "dog.jpg"
		});

		context.user3 = em.create(User, {
			name: "John",
			email: "email3@email.com",
			skill_level: 16,
			role: UserRole.USER,
			imgUri: "dog.jpg"
		});

		context.user4 = em.create(User, {
			name: "Elaine",
			email: "email4@email.com",
			skill_level: 10,
			role: UserRole.USER,
			imgUri: "dog.jpg"
		});
	}
}
