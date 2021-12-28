import { NextApiRequest, NextApiResponse } from 'next';

//done in backend (next layer, between client and actual backend)
export default (req: NextApiRequest, res: NextApiResponse) => {
  const users = [{ id: 1, name: 'Ana' }];

  return res.json(users);
};

//serverless
