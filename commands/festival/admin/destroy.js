const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('festival-destroy-by-id')
		.setDescription('Destroy festival entity by id')
        .addStringOption(option =>
		    option.setName('id')
			.setDescription('Id of entity, example : 6265576ca0b0b974d43918d2')
			.setRequired(true)),
	async execute(interaction) {

        axios.delete(process.env.FESTIVAL_API_URL+"/deleteById/"+interaction.options.get("id")["value"])
		.then(async function (response) {
			// console.log(response);
			await interaction.reply({ content: '```json\n' + response.data.message + '\n```',  ephemeral: true});
		})
		.catch(async function (error) {
			console.log(error.data.error);
			await interaction.reply({content: '```json\n' + error.data.error + '\n```', ephemeral: true});
		})
	},
};