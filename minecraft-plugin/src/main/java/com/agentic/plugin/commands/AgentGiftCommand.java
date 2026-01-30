package com.agentic.plugin.commands;

import com.agentic.plugin.AgenticPlugin;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;
import org.bukkit.ChatColor;
import org.bukkit.Material;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.inventory.ItemStack;
import org.bukkit.persistence.PersistentDataContainer;
import org.bukkit.persistence.PersistentDataType;

/**
 * Gives players a themed reward once per day.
 */
public final class AgentGiftCommand implements CommandExecutor {
    private static final List<Material> REWARDS = List.of(
            Material.DIAMOND,
            Material.EMERALD,
            Material.GOLDEN_APPLE,
            Material.ENDER_PEARL,
            Material.FIREWORK_ROCKET
    );

    private final AgenticPlugin plugin;

    public AgentGiftCommand(AgenticPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!(sender instanceof Player player)) {
            sender.sendMessage(ChatColor.RED + "Команду может выполнить только игрок.");
            return true;
        }

        PersistentDataContainer container = player.getPersistentDataContainer();
        long today = LocalDate.now(ZoneId.systemDefault()).toEpochDay();
        Long lastClaim = container.get(plugin.getRewardKey(), PersistentDataType.LONG);

        if (!player.hasPermission("agentichelper.gift")) {
            player.sendMessage(ChatColor.RED + "У тебя нет права на получение подарков.");
            return true;
        }

        if (lastClaim != null && lastClaim == today) {
            player.sendMessage(ChatColor.YELLOW + "Ты уже получил подарок сегодня. Возвращайся завтра!");
            return true;
        }

        Material rewardMaterial = pickReward();
        ItemStack reward = new ItemStack(rewardMaterial, getRewardAmount(rewardMaterial));
        player.getInventory().addItem(reward);
        container.set(plugin.getRewardKey(), PersistentDataType.LONG, today);

        String rewardName = formatMaterialName(rewardMaterial);
        player.sendMessage(ChatColor.AQUA + "Подарок дня: " + ChatColor.GOLD + rewardName + ChatColor.AQUA + " добавлен в твой инвентарь!");
        return true;
    }

    private Material pickReward() {
        int index = ThreadLocalRandom.current().nextInt(REWARDS.size());
        return REWARDS.get(index);
    }

    private int getRewardAmount(Material material) {
        return switch (material) {
            case FIREWORK_ROCKET -> 16;
            case ENDER_PEARL -> 4;
            default -> 1;
        };
    }

    private String formatMaterialName(Material material) {
        return material.name()
                .toLowerCase(Locale.ROOT)
                .replace('_', ' ');
    }
}
