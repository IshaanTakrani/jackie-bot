import { SlashCommandBuilder } from "discord.js";
import { fetchUserData, initUser, updateUser } from "../../db_services.js";
import { BalanceEmbed, GameResultEmbed } from "../../embedBuilder.js";

export const data = new SlashCommandBuilder()
  .setName("beg")
  .setDescription("Beg for money")
  .addStringOption((option) =>
    option
      .setName("begging message")
      .setDescription("Be creative!! A better beg gets you more money")
  );

export async function execute(interaction) {
  try {
    let userData = await fetchUserData(interaction.user.id);
    if (!userData) {
      await initUser(interaction.user.id, interaction.user.username);
      userData = await fetchUserData(interaction.user.id);
    }

    const beg = interaction.options.getInteger("beg");
    let embed = new GameResultEmbed(interaction)
      .addResult("House rolled:", `${emojis[`d${houseRoll}`]}`)
      .addResult(
        `${interaction.user.username} rolled:`,
        `${emojis[`d${playerRoll}`]}`
      )
      .setName("Beg");

    if (score >= 70) {
      userData.balance -= bet;
      embed
        .setStat("positive")
        .addResult("Good beg", "")
        .addBalanceSection(oldbal, userData.balance);
    } else if (30 < score < 70) {
      userData.balance += bet;
      embed
        .setStat("neutral")
        .addResult("Okay beg", "")
        .addBalanceSection(oldbal, userData.balance);
    } else {
      embed
        .setStat("negative")
        .addResult("Bad beg", "")
        .addBalanceSection(oldbal, userData.balance);
    }

    await interaction.reply({ embeds: [embed.build()] });

    updateUser(userData, interaction.user.id);
  } catch (error) {
    console.log(error);
  }
}
