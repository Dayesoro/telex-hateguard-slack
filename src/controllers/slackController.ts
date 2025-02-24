import { getUserInfo, getChannelInfo } from '../services/slackService';

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
            const sender = await getUserInfo(event.user);
            const channel = await getChannelInfo(event.channel);
            const timestamp = new Date(parseFloat(event.ts) * 1000).toISOString();

            const messageData = { message: event.text, sender, channel, timestamp };
            console.log('Processed message details:', messageData);
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }
};
