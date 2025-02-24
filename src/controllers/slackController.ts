export const slackEventHandler = (req: any, res: any) => {
    const body = req.body;
    console.log(body);

    // Handle Slack URL verification
    if (body.type === 'url_verification') {
        return res.json({ challenge: body.challenge });
    }

    // Handle Slack message events
    if (body.type === 'event_callback' && body.event?.type === 'message') {
        console.log('Received message:', {
            text: body.event.text,
            user: body.event.user,
            channel: body.event.channel,
            timestamp: new Date(parseFloat(body.event.ts) * 1000)
        });
    }

    return res.status(200).end();
};
