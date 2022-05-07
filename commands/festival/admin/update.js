const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('festival-update-by-id')
		.setDescription('Update festival entity with customs fields')
        .addStringOption(option =>
		    option.setName('id')
			.setDescription('Id of entity, example : 6265576ca0b0b974d43918d2')
			.setRequired(true))
		.addStringOption(option =>
		    option.setName('name')
			.setDescription('Name of entity')
			.setRequired(true))
		.addStringOption(option =>
		    option.setName('start-date')
			.setDescription('start date of entity, example : 07-06-2022')
			.setRequired(true))
		.addStringOption(option =>
		    option.setName('end-date')
			.setDescription('end date of entity, example : 17-06-2022')
			.setRequired(true))
		.addStringOption(option =>
		    option.setName('number-places')
			.setDescription('number places of entity, example : 666')
			.setRequired(true)),	
	async execute(interaction) {
		let entity = {
			"name": interaction.options.get("name")["value"],
			"startDate": interaction.options.get("start-date")["value"], 
			"endDate": interaction.options.get("end-date")["value"],
			"numberPlaces": parseInt(interaction.options.get("number-places")["value"])
		}
        
        axios.put(process.env.FESTIVAL_API_URL+"/updateById/"+interaction.options.get("id")["value"], entity)
		.then(async function (response) {
			// console.log(response.data);
			await interaction.reply({ content: '```json\n' + JSON.stringify(response.data.body) + '\n```',  ephemeral: true});
		})
		.catch(async function (error) {
			// console.log(error);
			await interaction.reply({content: '```json\n' + error.response.data.error + '\n```', ephemeral: true});
		})

	},
};