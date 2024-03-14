import { compare } from 'bcryptjs';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      req.session.userId = user.id;

      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
