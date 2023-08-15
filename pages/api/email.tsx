import { Resend } from 'resend';
import Want from '../../components/Emails/Want';
import { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request, res: NextApiResponse) {
  const request = JSON.parse(JSON.parse(JSON.stringify(req.body)));

  if (req.method === 'POST') {
    try {
      const data = await resend.sendEmail({
        from: 'business@redpink.pink',
        to: request.sendTo,
        subject: 'Want a product',
        react: (
          <Want
            productName={request.productName}
            productImage={request.productImage}
          />
        ),
      });

      res.status(200).json('data');
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
