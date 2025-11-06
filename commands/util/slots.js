import { SlashCommandBuilder } from "discord.js";
import { SlotMachine } from "../../game-classes/SlotMachine.js";
import { fetchUserData, updateUser } from "../../db_services.js";
import { GameResultEmbed } from "../../embedBuilder.js";

// export const data = new SlashCommandBuilder()
//   .setName("diceroll")
//   .setDescription("Roll a die against the house, highest roll wins")
//   .addIntegerOption((option) =>
//     option.setName("bet").setDescription("amount to bet").setRequired(true)
//   );

export const data = new SlashCommandBuilder()
  .setName("slots")
  .setDescription("play slots")
  .addIntegerOption((option) =>
    option.setName("bet").setDescription("amount to bet").setRequired(true)
  );

export async function execute(interaction) {
  try {
    let userData = await fetchUserData(interaction.user.id);
    if (!userData) {
      await initUser(interaction.user.id, interaction.user.username);
      userData = await fetchUserData(interaction.user.id);
    }

    const bet = interaction.options.getInteger("bet");

    if (bet > userData.balance) {
      await interaction.reply(
        "You don't have that much money brokie :rofl: :broken_heart:\n"
      );
      return;
    }

    let slotMachine = new SlotMachine(3);

    slotMachine.spin();
    slotMachine.calculateScore(bet);

    let embed = new GameResultEmbed(interaction)
      .addResult("Slots\n", `${slotMachine.reelsSymbolString}`)
      .setName("Slots");

    let oldbal = userData.balance;

    userData.balance = userData.balance + slotMachine.getScore();

    if (slotMachine.getScore() == 0) {
      embed.setStat("neutral");
    } else if (slotMachine.getScore() < 0) {
      embed
        .setStat("negative")
        .addResult("Loss:", `${slotMachine.getScore()} :coin:`);
    } else {
      embed
        .setStat("positive")
        .addResult("Gain:", `${slotMachine.getScore()} :coin:`);
    }

    embed.addBalanceSection(oldbal, userData.balance);

    updateUser(userData, interaction.user.id);

    await interaction.reply({ embeds: [embed.build()] });

    updateUser(userData, interaction.user.id);
  } catch (error) {
    console.log(error);
  }
}
