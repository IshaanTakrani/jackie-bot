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

		// const bet = interaction.options.getInteger('bet');
		// let embed = {
		// 	color: 0x46ba2a,
		// 	title: `${interaction.user.username}`,
		// 	fields: [
		// 		{
		// 			name: `${interaction.user.username}'s balance:`,
		// 			value: `${userData.balance} :coin:`,
		// 		},
		// 	],
		// 	thumbnail: {
		// 		url: interaction.user.displayAvatarURL({
		// 			dynamic: true,
		// 			size: 4096,
		// 		}),
		// 	},
		// };
		await interaction.reply({ embeds: [embed.build()] });

		updateUser(userData, interaction.user.id);
	} catch (error) {
		console.log(error);
	}
}
