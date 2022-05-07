const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;

require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('festival-get-all')
		.setDescription('Get all festival entities')
        .addStringOption(option =>
		    option.setName('limit')
			.setDescription('The limit of entities, example : 1')
			.setRequired(false))
        .addStringOption(option =>
		    option.setName('offset')
			.setDescription('The offset of entities, example : 2')
			.setRequired(false))
        .addStringOption(option =>
		    option.setName('order')
			.setDescription("The order of entities, example : 'id:ASC'")
			.setRequired(false)), 
	async execute(interaction) {
		let params = {
			"limit": interaction.options.get("limit") ? parseInt(interaction.options.get("limit")["value"]) : null,
			"offset": interaction.options.get("offset") ? parseInt(interaction.options.get("offset")["value"]) : null, 
			"order": interaction.options.get("order") ? interaction.options.get("order")["value"] : null
		}

        axios.get(process.env.FESTIVAL_API_URL+"/getAll", {params: params})
		.then(async function (response) {
			// console.log(response);
			await interaction.reply({ content: '```json\n' + JSON.stringify(response.data.body) + '\n```',  ephemeral: true});
		})
		.catch(async function (error) {
			// console.log(error);
			await interaction.reply({content: '```json\n' + error.data.error + '\n```', ephemeral: true});
		})
	},
};