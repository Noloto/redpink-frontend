import { Resend } from 'resend';
import Want from '../../components/Emails/Want';
import { NextApiResponse } from 'next';
import Redpink from '../../components/Emails/Redpink';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request, res: NextApiResponse) {
  const request = JSON.parse(JSON.parse(JSON.stringify(req.body)));

  if (req.method === 'POST') {
    try {
      await resend.sendEmail({
        from: 'business@redpink.pink',
        to: request.sendTo,
        subject: 'Added to exclusive list',
        react: (
          <Want
            productName={request.productName}
            productImage={request.productImage}
          />
        ),
      });

      await resend.sendEmail({
        from: 'business@redpink.pink',
        to: 'business@redpink.pink',
        subject: 'Added to exclusive lsit',
        react: (
          <Redpink
            productName={request.productName}
            productImage={request.productImage}
            emailTo={request.sendTo}
          />
        ),
      });

      res.status(200).json('data');
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
