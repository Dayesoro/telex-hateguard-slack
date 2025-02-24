import { WebClient } from '@slack/web-api';
import { config } from '../config/dotenvConfig';

const slackClient = new WebClient(config.SLACK_BOT_TOKEN);

export const getUserInfo = async (userId: string): Promise<string> => {
    try {
        const userInfo = await slackClient.users.info({ user: userId });
        return userInfo.user?.real_name || 'Unknown User';
    } catch (error) {
        console.error('Error fetching user info:', error);
        return 'Unknown User';
    }
};

export const getChannelInfo = async (channelId: string): Promise<string> => {
    try {
        const channelInfo = await slackClient.conversations.info({ channel: channelId });
        return channelInfo.channel?.name || 'Unknown Channel';
    } catch (error) {
        console.error('Error fetching channel info:', error);
        return 'Unknown Channel';
    }
};
