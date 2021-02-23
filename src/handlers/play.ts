import { Composer } from 'telegraf';
import { addToQueue } from '../tgcalls';

export const playHandler = Composer.command('play', async ctx => {
    const { chat } = ctx.message;

    if (chat.type !== 'supergroup') {
        await ctx.reply('Saya hanya bisa bermain di dalam grup.');
        return;
    }

    const [commandEntity] = ctx.message.entities!;
    const text = ctx.message.text.slice(commandEntity.length + 1);

    if (!text) {
        await ctx.reply('URL YouTubenya cek lagi bos!.');
        return;
    }

    const index = await addToQueue(chat, text);

    await ctx.reply(index === 0 ? 'Sedang diputar...' : `Mengantri di posisi ${index}.`);
});
