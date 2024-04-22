import App from '@/app';
import MySmtpServer from '@/smtp';

const app = new App();
const smtpServer = new MySmtpServer();

app.listen();
smtpServer.start();
