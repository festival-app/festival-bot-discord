const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('festival-get-by-id')
		.setDescription('Get festival entity by id')
        .addStringOption(option =>
		    option.setName('id')
			.setDescription('Id of entity, example : 6265576ca0b0b974d43918d2')
			.setRequired(true)),
	async execute(interaction) {
        axios.get(process.env.FESTIVAL_API_URL+"/getById/"+interaction.options.get("id")["value"])
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