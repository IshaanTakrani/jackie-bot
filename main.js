import fs from 'node:fs';
import path from 'node:path';
import {
	Client,
	Collection,
	Events,
	GatewayIntentBits,
	MessageFlags,
} from 'discord.js';
import 'dotenv/config';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');

const entries = fs.readdirSync(commandsPath, { withFileTypes: true });

for (const entry of entries) {
	// If the entry is a directory, go one level deeper
	if (entry.isDirectory()) {
		const folderPath = path.join(commandsPath, entry.name);
		const files = fs.readdirSync(folderPath).filter((f) => f.endsWith('.js'));

		for (const file of files) {
			const filePath = path.join(folderPath, file);
			await loadCommand(filePath);
		}
	}
	// If it’s just a .js file directly in /commands
	else if (entry.isFile() && entry.name.endsWith('.js')) {
		const filePath = path.join(commandsPath, entry.name);
		await loadCommand(filePath);
	}
}

async function loadCommand(filePath) {
	try {
		const { default: maybeDefault, ...module } = await import(
			`file://${filePath}`
		);
		const command = maybeDefault ?? module;

		if (command && 'data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			// console.log(`📦 Loaded command: ${command.data.name}`);
		} else {
			console.warn(`Invalid command file (missing data/execute): ${filePath}`);
		}
	} catch (err) {
		console.error(`Failed to load command at ${filePath}\n`, err);
	}
}

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});

client.login(process.env.TOKEN);
