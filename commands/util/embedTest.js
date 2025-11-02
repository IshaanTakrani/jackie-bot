import { SlashCommandBuilder } from 'discord.js';
import { GameResultEmbed } from '../../embedBuilder.js';

export const data = new SlashCommandBuilder()
	.setName('tembed')
	.setDescription('Test embeds');

export async function execute(interaction) {
	console.log(interaction.user);

	const exampleEmbed = {
		color: 0x0099ff,
		title: 'Some title',
		url: 'https://discord.js.org',
		author: {
			name: 'Some name',
			icon_url: 'https://i.imgur.com/AfFp7pu.png',
			url: 'https://discord.js.org',
		},
		description: 'Some description here',
		thumbnail: {
			url: 'https://i.imgur.com/AfFp7pu.png',
		},
		fields: [
			{
				name: 'Regular field title',
				value: 'Some value here',
			},
			{
				name: '\u200b',
				value: '\u200b',
				inline: false,
			},
			{
				name: 'Inline field title',
				value: 'Some value here',
				inline: true,
			},
			{
				name: 'Inline field title',
				value: 'Some value here',
				inline: true,
			},
			{
				name: 'Inline field title',
				value: 'Some value here',
				inline: true,
			},
		],
		image: {
			url: 'https://i.imgur.com/AfFp7pu.png',
		},
		timestamp: new Date().toISOString(),
		footer: {
			text: 'Some footer text here',
			icon_url: 'https://i.imgur.com/AfFp7pu.png',
		},
	};

	await interaction.reply({ embeds: [exampleEmbed] });

	// await interaction.reply('gurt: yo');
}
