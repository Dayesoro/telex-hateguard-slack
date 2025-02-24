import { NextFunction } from 'express';
import crypto from 'crypto';
import { config } from '../config/dotenvConfig';


export const slackAuthMiddleware = (req: any, res: any, next: NextFunction) => {
    const signature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    const rawBody = req.rawBody;

    if (!signature || !timestamp || !rawBody) {
        return res.status(403).send('Missing Slack headers');
    }

    try {
        const hmac = crypto.createHmac('sha256', config.SLACK_SIGNING_SECRET);
        const [version, hash] = signature.split('=');
        const baseString = `${version}:${timestamp}:${rawBody}`;

        if (!crypto.timingSafeEqual(Buffer.from(hash, 'hex'), hmac.update(baseString).digest())) {
            return res.status(403).send('Invalid signature');
        }
        next();
    } catch (error) {
        return res.status(403).send('Invalid signature');
    }
};
