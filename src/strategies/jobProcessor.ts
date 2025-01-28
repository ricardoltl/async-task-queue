export interface JobProcessor<T> {
    process(data: T): Promise<void>;
  }
  
  export class EmailJobProcessor implements JobProcessor<{ email: string; message: string }> {
    async process(data: { email: string; message: string }): Promise<void> {
      console.log(`Sending email to ${data.email}: ${data.message}`);
      // I did it to simulate a service that sends an email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Email sent to ${data.email}`);
    }
  }
  