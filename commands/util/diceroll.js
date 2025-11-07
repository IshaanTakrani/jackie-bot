import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { fetchUserData, initUser, updateUser } from '../../db_services.js';
import { Die } from '../../game-classes/Die.js';
import { GameResultEmbed } from '../../embedBuilder.js';
import emojis from '../../emojis.json' with { type: 'json' };

export const data = new SlashCommandBuilder()
	.setName('diceroll')
	.setDescription('Roll a die against the house, highest roll wins')
	.addIntegerOption((option) =>
		option.setName('bet').setDescription('amount to bet').setRequired(true)
	);

export async function execute(interaction) {
	try {
		let userData = await fetchUserData(interaction.user.id);
		if (!userData) {
			await initUser(interaction.user.id, interaction.user.username);
			userData = await fetchUserData(interaction.user.id);
		}

		const bet = interaction.options.getInteger('bet');

		if (bet > userData.balance) {
			await interaction.reply(
				"You don't have that much money brokie :rofl: :broken_heart:\n"
			);
			return;
		}

		let d6 = new Die(6);
		let houseRoll = d6.roll();

		let playerRoll = d6.roll();

		let oldbal = userData.balance;

		let embed = new GameResultEmbed(interaction)
			.addResult('House rolled:', `${emojis[`d${houseRoll}`]}`)
			.addResult(`${interaction.user.username} rolled:`, `${emojis[`d${playerRoll}`]}`)
			.setName('Diceroll');

		if (houseRoll > playerRoll) {
			userData.balance -= bet;
			embed
				.setStat('negative')
				.addResult("Loss:", `${-bet} :coin:`)
				.addBalanceSection(oldbal, userData.balance);
		} else if (playerRoll > houseRoll) {
			userData.balance += bet;
			embed
				.setStat('positive')
				.addResult("Gain:", `+${bet} :coin:`)
				.addBalanceSection(oldbal, userData.balance);
		} else {
			embed
				.setStat('neutral')
				.addResult('Results of Diceroll', 'Tie!')				
				.addBalanceSection(oldbal, userData.balance);
		}

		await interaction.reply({ embeds: [embed.build()] });

		updateUser(userData, interaction.user.id);
	} catch (error) {
		console.log(error);
	}
}
