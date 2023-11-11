//import db from '../lib/database.js'
import { canLevelUp } from '../lib/levelling.js'

export async function before(m, { conn }) {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup)
        return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++
    user.role = global.rpg.role(user.level).name
    if (before !== user.level) {
        m.reply(`
╭────────────
│   **Felicidades** 
│      *Sube de nivel🥳*
│
│ *📍Level* *${before}* ‣  *${user.level}*
│ *🐉Role*: *${user.role}*
│ *Que tenga un buen día🌤️*
│ _*Type /off autolevelup*_
│    _*To Deactivate*_
╰────────────
	`.trim())
    }
}

