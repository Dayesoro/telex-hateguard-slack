import express from 'express';
import bodyParser from 'body-parser';
import { slackAuthMiddleware } from '../middlewares/slackAuthMiddleware';
import { slackEventHandler } from '../controllers/slackController';

const router = express.Router();

router.post(
    '/events',
    bodyParser.json({
        verify: (req, _, buf) => {
            (req as any).rawBody = buf;
        }
    }),
    slackAuthMiddleware,
    slackEventHandler
);

export default router;
