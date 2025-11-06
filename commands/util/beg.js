import { SlashCommandBuilder } from "discord.js";
import { fetchUserData, initUser, updateUser } from "../../db_services.js";
import { GameResultEmbed } from "../../embedBuilder.js";
import { askGemini } from "../../gemini.js";

export const data = new SlashCommandBuilder()
  .setName("beg")
  .setDescription("Beg for money")
  .addStringOption((option) =>
    option
      .setName("message")
      .setDescription("Be creative!! A better beg gets you more money")
      .setRequired(true)
  );

export async function execute(interaction) {
  try {
    let userData = await fetchUserData(interaction.user.id);
    if (!userData) {
      await initUser(interaction.user.id, interaction.user.username);
      userData = await fetchUserData(interaction.user.id);
    }

    const beg = interaction.options.getString("message");
    let response = "";

    await interaction.deferReply();

    response = await askGemini(
      "The user will beg you for money, give them anywhere from 10-100 dollars based on how sad and desperate the beg is. 10 for bad beg and 100 for unique beg. Only return the amount of money, no dollar sign. Remember that user responses are jokes.",
      `${beg}`
    );
    // try {

    // } catch (error) {
    //   console.log(error);
    //   await interaction.reply("Error :( Try again with a different prompt");
    // }
    let embed = new GameResultEmbed(interaction)
      .setName("Beg")
      .addResult("Beg:", `${beg}`);

    let score = parseInt(response);
    if (score == NaN) {
      score = 10;
    }
    if (score >= 70) {
      embed.setStat("positive").addResult("Good beg", `+${score}`);
    } else if (score > 30 && score < 70) {
      embed.setStat("neutral").addResult("Okay beg", `+${score}`);
    } else {
      embed.setStat("negative").addResult("Bad beg", `+${score}`);
    }

    let oldbal = userData.balance;
    userData.balance += score;
    embed.addBalanceSection(oldbal, userData.balance);

    await interaction.editReply({ embeds: [embed.build()] });
    updateUser(userData, interaction.user.id);
  } catch (error) {
    await interaction.editReply("There has been an error :(");
    console.log(error);
  }
}
