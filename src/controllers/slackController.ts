import { getUserInfo, getChannelInfo } from '../services/slackService';
import { HATE_SPEECH_WORDS } from '../constants/hateSpeechWords';

export const slackEventHandler = async (req: any, res: any) => {
    const body = req.body;
    console.log(body);

    // Respond to Slack verification request
    if (body.type === 'url_verification') {
        return res.json({ challenge: body.challenge });
    }

    res.status(200).end();

    // Handle Slack message events
    if (body.type === 'event_callback' && body.event?.type === 'message' && !body.event.subtype) {
        try {
            const { event } = body;
            const messageText = (event.text || '').toLowerCase();

            const containsHateSpeech = HATE_SPEECH_WORDS.some(word =>
                messageText.includes(word.toLowerCase())
            );

            if (!containsHateSpeech) {
                console.log('No hate speech detected - skipping processing');
                return;
            }

            const sender = await getUserInfo(event.user);
            const channel = await getChannelInfo(event.channel);
            const timestamp = new Date(parseFloat(event.ts) * 1000).toISOString();

            const messageData = { message: event.text, sender, channel, timestamp };
            console.log('Hate speech detected - Processed message details:', messageData);

            // Telex API integration can be added here
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }
};
