import Discord from 'discord.js';
import fs from 'fs';

import config from './config.json';

const client = new Discord.Client();

const generateOutputFile = (channel: Discord.Channel, member: Discord.GuildMember) => {
  const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
  return fs.createWriteStream(fileName);
}

client.on('message', msg => {
  if (msg.content.startsWith(config.prefix + 'join')) {
    let [command, ...channelNames] = msg.content.split(" ");
    if (!msg.guild) {
      return msg.reply('error: guild not found')
    }
    const voiceChannel: Discord.VoiceChannel = (msg.guild.channels.guild as any)?.find('name', channelNames.join(' '))
    console.log(voiceChannel.id)
    if (!voiceChannel || voiceChannel.type !== 'voice') {
      return msg.reply(`I could not find the channel ${channelNames}`)
    }
    voiceChannel.join().then(conn => {
      msg.reply('ready!')
    })
  }
})

client.login(config.token)

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
})
