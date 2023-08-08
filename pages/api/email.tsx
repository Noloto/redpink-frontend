import { Resend } from 'resend';
import Want from '../../components/Emails/Want';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request, res: Response) {
  if (req.method === 'POST') {
    await resend.sendEmail({
      from: 'business@redpink.pink',
      to: 'noel.willener@gmail.com',
      subject: 'Want a product',
      react: <Want productName={''} productImage={'req.body.image'} />,
    });

    return res.json();
  } else {
    return 'NOT FOUND';
  }
}
