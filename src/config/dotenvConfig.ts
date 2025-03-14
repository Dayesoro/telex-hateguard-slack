import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5005,
    SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET || '',
    SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN || ''
};
