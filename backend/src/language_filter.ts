import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function LanguageFilter() {
	const badWordFile = await fs
		.readFile(path.resolve(__dirname, "..", "public", "badwords.txt"), "utf-8")
		.catch((err) => {
			console.error(err);
		});

	let badWords;
	if (typeof badWordFile == "string") {
		badWords = badWordFile.split("\r\n");
	}

	function filter(message: string) {
		for (const badWord of badWords) {
			for (const word of message.split(" ")) {
				if (word == badWord) {
					throw new Error(`${word} is a bad word. Naughty!!!`);
				}
			}
		}
	}
	return { filter };
}
