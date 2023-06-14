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

		const image1 = await fs.readFile(path.resolve(__granddir, 'assets/images', `dog.jpg`))
			.catch( err => {
				console.error(err);
			});
		const image2 = await fs.readFile(path.resolve(__granddir, 'assets/images', `cat.jpg`))
			.catch( err => {
				console.error(err);
			});
		const image3 = await fs.readFile(path.resolve(__granddir, 'assets/images', `sam.jpg`))
			.catch( err => {
				console.error(err);
			});
		const image4 = await fs.readFile(path.resolve(__granddir, 'assets/images', `hedgehog.png`))
			.catch( err => {
				console.error(err);
			});
		const image5 = await fs.readFile(path.resolve(__granddir, 'assets/images', `pup.jpg`))
			.catch( err => {
				console.error(err);
			});

		const file1 = {
			file: image1,
			filename: `dog.jpg`
		}
		const file2 = {
			file: image2,
			filename: `cat.jpg`
		}
		const file3 = {
			file: image3,
			filename: `hedgehog.png`
		}
		const file4 = {
			file: image4,
			filename: `sam.jpg`
		}
		const file5 = {
			file: image5,
			filename: `pup.jpg`
		}

		await UploadFileToMinio(file1);
		await UploadFileToMinio(file2);
		await UploadFileToMinio(file3);
		await UploadFileToMinio(file4);
		await UploadFileToMinio(file5);


		context.user1 = em.create(User, {
			name: "Jase",
			email: "email@email.com",
			skill_level: 3,
			role: UserRole.JUDGE,
			imgUri: "dog.jpg"
		});
		context.user2 = em.create(User, {
			name: "Chase",
			email: "email2@email.com",
			skill_level: 5,
			role: UserRole.USER,
			imgUri: "cat.jpg"
		});

		context.user3 = em.create(User, {
			name: "John",
			email: "email3@email.com",
			skill_level: 16,
			role: UserRole.USER,
			imgUri: "pup.jpg"
		});

		context.user4 = em.create(User, {
			name: "Elaine",
			email: "email4@email.com",
			skill_level: 10,
			role: UserRole.USER,
			imgUri: "hedgehog.png"
		});
		context.user5 = em.create(User, {
			name: "Tabitha",
			email: "email5@email.com",
			skill_level: 100,
			role: UserRole.USER,
			imgUri: "sam.jpg"
		});
	}
}
