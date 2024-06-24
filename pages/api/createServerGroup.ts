import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import https from 'https';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body, headers } = req;
  const siteName = typeof query.siteName === 'string' ? query.siteName : Array.isArray(query.siteName) ? query.siteName[0] : '';
  const serverGroupName = typeof query.serverGroupName === 'string' ? query.serverGroupName : Array.isArray(query.serverGroupName) ? query.serverGroupName[0] : '';

  if (!siteName || !serverGroupName) {
    return res.status(400).json({ message: 'Missing URL Path Parameters in query parameters' });
  }

  const url = `https://192.168.52.156:8083/SecureSphere/api/v1/conf/webServices/${siteName}/${serverGroupName}`;

  const cookies = cookie.parse(req.headers.cookie || '');
  const jsessionid = cookies.JSESSIONID;

  if (!jsessionid) {
    return res.status(401).json({ message: 'No session ID found' });
  }

  if (method === 'POST') {
    try {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': headers.authorization || '',
          'Cookie': `JSESSIONID=${jsessionid}`, // Include session ID in the headers
        },
        httpsAgent,
      });

      res.status(response.status).json(response.data);
    } catch (error: any) {
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
