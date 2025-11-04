import { SlashCommandBuilder } from 'discord.js';
import { fetchUserData, initUser, updateUser } from '../../db_services.js';
import { BalanceEmbed } from '../../embedBuilder.js';

export const data = new SlashCommandBuilder()
	.setName('balance')
	.setDescription('check your balance, or the balance of another user')
	.addUserOption((option) =>
		option.setName('target').setDescription('name of user you want to see')
	);

export async function execute(interaction) {
	try {
		let userData;
		let embed = new BalanceEmbed(interaction, -1).setName('Balance');

		const target = interaction.options.getMember('target');
		if (target) {
			console.log('target');
			console.log(target.user.id);
			userData = await fetchUserData(target.user.id);
			embed
				.setBalance(userData.balance)
				.setTitle(`${target.user.username}'s Balance`)
				.setThumbnail(
					target.user.displayAvatarURL({
						dynamic: true,
						size: 4096,
					})
				);
		} else {
			userData = await fetchUserData(interaction.user.id);
			embed.setBalance(userData.balance);
		}

		if (!userData) {
			await initUser(interaction.user.id, interaction.user.username);
			userData = await fetchUserData(interaction.user.id);
		}

		await interaction.reply({ embeds: [embed.build()] });
	} catch (error) {
		console.log(error);
	}
}
