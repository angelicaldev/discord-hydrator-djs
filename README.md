<br />
<p align="center">

  <h3 align="center">Discord-Hydrator</h3>

  <p align="center">
    A simple discord bot to remind you & your server members to stay hydrated at regular interverals
    <br />
    <a href="https://edb.foxgirls.cc"><strong>Website</strong></a> | 
    <a href="https://edb.foxgirls.cc/docs/"><strong>Documentation</strong></a>
  </p>
</p>

## Setting Up

### Making a bot application

In order to set up hydration bot, first of all you must register for a discord bot application over on the [discord developer portal](https://discord.com/developers/applications), there are plenty of guides for this online, so I shall spare the details on it

### Setting the bot token
Once you have done this and you have got hold of your bots token, head on over to the .env.example file and replace `TOKEN_HERE` with your bots token, for example: 

`TOKEN = DfJVMowkNVIAOQKVNZowi.CIWEiwfj`

*Note: Never share your bot token with anyone, it's like giving away access to your discord account.* 

After doing this, rename the file from `.env.example` to just `.env`

## Configuration

To configure the bot, go into the configuration folder and open up `config.json.example`, once again, we will be renaming this to just `config.json` instead so it can be used. 

### Config Example
```json
{
    "setup": {
        "guildID": "GUILD_ID",
        "channelID": "CHANNEL_ID",
        "roleID": "ROLE_ID",
        "adminRoleID": "ADMIN_ROLE_ID",
        "enableDebugLogs": false
    },
    "message": {
        "plainMessage": "Hey you, drink water now!",
        "useEmbeds": false,
        "embedTimestamp": false,
        "embedTitle": "EMBED_TITLE",
        "embedDescription": "EMBED_DESCRIPTION",
        "embedFooter": "EMBED_FOOTER",
        "embedThumbnail": "EMBED_THUMBNAIL_DIRECT_URL",
        "embedImage": "EMBED_IMAGE_DIRECT_URL",
        "embedColour": "EMBED_COLOUR",
        "intervalInSeconds": 3600
    },
    "commandConfig": {
        "prefix": "!",
        "allowCommands": true,
        "adminOnlyCmds": false
    },
    "enabledCommands": {
        "ping": true,
        "optin": true,
        "optout": true
    }
}
```
Note: Thumbnail and Image links must be direct links to the images and be resolvable by discord, an error will be thrown if they are not.
