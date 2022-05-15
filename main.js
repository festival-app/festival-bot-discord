// Imports & Requires
const fs = require('node:fs');
const Discord  = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

// Get config for app
const { dir, clientId, guildId, token } = require('./config/config.json');

// Initialize commands
const commands = [];
client.commands = new Discord.Collection();

// Get all commands
const getCommandsFiles = function(dir, filelist) {
	files = fs.readdirSync(dir);
	filelist = filelist || [];
	files.forEach(function(file) {
		if (fs.statSync(dir + file).isDirectory()) {
			filelist = getCommandsFiles(dir + file + '/', filelist);
		} else {
			filelist.push(dir + file);
		}
	});
	return filelist;
};

const commandFiles = getCommandsFiles(dir, []);


client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
	client.guilds.cache.get(guildId).commands.cache.map(command => {
		command.delete();
	})
	client.application.commands.cache.map(command => {
		command.delete();
	})
	console.log('Cache commands cleared')
	for (const file of commandFiles) {
		const command = require(file);
		commands.push(command.data.toJSON());
		client.guilds.cache.get(guildId).commands.create(command.data.toJSON());
		client.commands.set(command.data.name, command);
	}
	console.log('commands pushed')

	// Get all interactions
	client.on('interactionCreate', async interaction => {
		// console.log(interaction);
		if (!interaction.isCommand()) return;
		const { commandName } = interaction;
		
		// console.log(commandName);
		// console.log(client.commands);
		// console.log(client.commands.has(commandName));

		if (!client.commands.has(commandName)) return;
		
		try {
			await client.commands.get(commandName).execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	});
})

	
client.login(token);