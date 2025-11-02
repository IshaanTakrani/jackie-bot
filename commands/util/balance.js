import { SlashCommandBuilder } from 'discord.js';
import { fetchUserData, initUser, updateUser } from '../../db_services.js';
import { BalanceEmbed } from '../../embedBuilder.js';

export const data = new SlashCommandBuilder()
	.setName('balance')
	.setDescription('check your balance, or the balance of another user');

export async function execute(interaction) {
	try {
		let userData = await fetchUserData(interaction.user.id);
		if (!userData) {
			await initUser(interaction.user.id, interaction.user.username);
			userData = await fetchUserData(interaction.user.id);
		}

		let embed = new BalanceEmbed(interaction, userData.balance).setName(
			'Balance'
		);

		await interaction.reply({ embeds: [embed.build()] });

		updateUser(userData, interaction.user.id);
	} catch (error) {
		console.log(error);
	}
}
