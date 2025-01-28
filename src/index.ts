import express, { Request, Response } from 'express';
import { QueueFactory } from './queueFactory';
import { EmailJobProcessor } from './strategies/jobProcessor';
import { notificationSystem } from './observer/notification';

const app = express();
app.use(express.json());

const emailQueue = QueueFactory.createQueue<{ email: string; message: string }>('emailQueue');

notificationSystem.subscribe((message) => {
  console.log(`Notification: ${message}`);
});

const emailProcessor = new EmailJobProcessor();

emailQueue.process(async (job) => {
  await emailProcessor.process(job.data);
  notificationSystem.notify(`Job processed for email: ${job.data.email}`);
});

app.post('/send-email', async (req: Request, res: Response) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  await emailQueue.add({ email, message });
  res.status(200).json({ success: 'Email job added to queue!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
