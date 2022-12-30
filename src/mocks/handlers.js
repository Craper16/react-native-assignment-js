import {rest} from 'msw';
import {API_KEY} from '@env';

export const handlers = [
  rest.post(`${API_KEY}/auth/signin`, async (req, res, ctx) => {
    const {username, password} = req.body;

    if (username !== 'candidate' && password !== 'P@ssw0rd') {
      return res(
        ctx.status(401),
        ctx.json({
          statusCode: 401,
          message: 'Please check your login credentials',
          error: 'Unauthorized',
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        accessToken: 'mocktoken',
      }),
    );
  }),
];
