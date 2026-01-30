package com.agentic.plugin;

import com.agentic.plugin.commands.AgentGiftCommand;
import com.agentic.plugin.listeners.PlayerJoinListener;
import org.bukkit.NamespacedKey;
import org.bukkit.command.PluginCommand;
import org.bukkit.plugin.java.JavaPlugin;

/**
 * Primary entry point for the AgenticHelper plugin.
 */
public final class AgenticPlugin extends JavaPlugin {
    private NamespacedKey rewardKey;

    @Override
    public void onEnable() {
        this.rewardKey = new NamespacedKey(this, "daily-reward");

        saveDefaultConfig();
        registerCommands();
        getServer().getPluginManager().registerEvents(new PlayerJoinListener(this), this);

        getLogger().info("AgenticHelper is active.");
    }

    private void registerCommands() {
        PluginCommand command = getCommand("agentgift");
        if (command == null) {
            getLogger().severe("Command agentgift is not defined in plugin.yml");
            return;
        }
        command.setExecutor(new AgentGiftCommand(this));
    }

    public NamespacedKey getRewardKey() {
        return rewardKey;
    }
}
