import { SlashCommandBuilder } from 'discord.js';
import { initUser } from '../../db_services.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');

export async function execute(interaction) {
	console.log(interaction.user);

	initUser(interaction.user.id, interaction.user.username);
	await interaction.reply('Pong!');
}
