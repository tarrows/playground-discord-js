import Discord from 'discord.js';
import fs from 'fs';

import config from './config.json';

const client = new Discord.Client();

const generateOutputFile = (channel: Discord.Channel, member: Discord.GuildMember) => {
  const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
  return fs.createWriteStream(fileName);
}

client.on('message', msg => {})

client.login(config.token)

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
})
