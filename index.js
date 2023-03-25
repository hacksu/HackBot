const { Client, GatewayIntentBits } = require("discord.js");
const { guildId, token } = require("./config.json");

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildIntegrations,
];

const client = new Client({ intents });

let Guild;
let MemberRole;
client.on("ready", async () => {
  console.log("discord ready");
  Guild = client.guilds.resolve(guildId);
  MemberRole = await Guild.roles.fetch("735280966783991808");
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (oldMember.guild.id == guildId) {
    if (oldMember.pending && !newMember.pending) {
      try {
        newMember.roles
          .add(MemberRole)
          .then(() => {
            console.log("added member role to", newMember.displayName);
          })
          .catch((err) => {
            console.log("failed to add member role to", newMember.displayName);
            console.log(err);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
});

client.login(token);
