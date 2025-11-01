import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const entries = fs.readdirSync(commandsPath, { withFileTypes: true });

for (const entry of entries) {
	if (entry.isDirectory()) {
		const folderPath = path.join(commandsPath, entry.name);
		const files = fs.readdirSync(folderPath).filter((f) => f.endsWith('.js'));

		for (const file of files) {
			const filePath = path.join(folderPath, file);
			await loadCommand(filePath);
		}
	} else if (entry.isFile() && entry.name.endsWith('.js')) {
		const filePath = path.join(commandsPath, entry.name);
		await loadCommand(filePath);
	}
}

async function loadCommand(filePath) {
	try {
		const module = await import(`file://${filePath}`);
		const command = module.default ?? module;

		if (command && 'data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
			console.log(`Loaded command: ${command.data.name}`);
		} else {
			console.warn(`[WARNING] Invalid command file: ${filePath}`);
		}
	} catch (err) {
		console.error(`Failed to load command at ${filePath}`, err);
	}
}

const rest = new REST().setToken(process.env.TOKEN);

try {
	console.log(
		`Started refreshing ${commands.length} application (/) commands.`
	);

	const data = await rest.put(
		Routes.applicationCommands(process.env.CLIENTID, process.env.GUILDID),
		{ body: commands }
	);

	console.log(
		`Successfully reloaded ${data.length} GLOBAL application (/) commands.`
	);
} catch (error) {
	console.error(error);
}
