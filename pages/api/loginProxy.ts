import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import https from 'https';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Get IP and Port from headers set by the client
  const ip = req.headers['x-api-ip'] as string;
  const port = req.headers['x-api-port'] as string;

  if (!ip || !port) {
    return res.status(400).json({ message: 'IP and Port are required' });
  }

  const targetUrl = `https://${ip}:${port}/SecureSphere/api/v1/auth/session`;

  if (method === 'POST') {
    try {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });

      const response = await axios.post(targetUrl, null, {
        headers: {
          'Authorization': req.headers.authorization,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        httpsAgent,
      });

      // Extract the JSESSIONID from the response headers
      const setCookieHeader = response.headers['set-cookie'] || [];
      const jsessionid = setCookieHeader.find(cookie => cookie.startsWith('JSESSIONID='));

      if (jsessionid) {
        // Set the JSESSIONID as a cookie
        res.setHeader('Set-Cookie', cookie.serialize('JSESSIONID', jsessionid.split(';')[0].split('=')[1], {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 30 * 60, // 30 minutes
          path: '/',
        }));

        res.status(200).json({ sessionId: jsessionid });
      } else {
        res.status(500).json({ message: 'JSESSIONID not found in response' });
      }
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response) {
        res.status(error.response.status).json({ message: error.response.data });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
