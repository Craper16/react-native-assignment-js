import {server} from './src/mocks/server';
import AbortController from 'abort-controller';
import {fetch, Headers, Request, Response} from 'cross-fetch';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.AbortController = AbortController;
