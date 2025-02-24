import express from 'express';
import slackRoutes from './routes/slackRoutes';
import { config } from './config/dotenvConfig';

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.use('/slack', slackRoutes);

const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
