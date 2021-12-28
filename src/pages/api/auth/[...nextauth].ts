import { query as q } from 'faunadb';

import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }): Promise<boolean> {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(user.email)) //condition
              )
            ),
            q.Create(q.Collection('users'), { data: { email } }), //if
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email))) //else
          )
        );
        return true;
      } catch (err) {
        return false;
      }
    },
  },
});
