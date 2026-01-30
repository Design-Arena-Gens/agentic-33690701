package com.agentic.plugin.listeners;

import com.agentic.plugin.AgenticPlugin;
import org.bukkit.ChatColor;
import org.bukkit.Sound;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

/**
 * Welcomes players with configurable messaging.
 */
public final class PlayerJoinListener implements Listener {
    private final AgenticPlugin plugin;

    public PlayerJoinListener(AgenticPlugin plugin) {
        this.plugin = plugin;
    }

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        event.setJoinMessage(ChatColor.DARK_AQUA + player.getName() + ChatColor.AQUA + " присоединился к агентскому серверу!");

        String template = plugin.getConfig().getString("messages.welcome", "&bДобро пожаловать на сервер!");
        String parsed = template.replace("%player%", player.getName());
        String customMessage = ChatColor.translateAlternateColorCodes('&', parsed);

        player.sendMessage(customMessage);
        player.playSound(player.getLocation(), Sound.UI_TOAST_CHALLENGE_COMPLETE, 0.7f, 1.2f);
    }
}
