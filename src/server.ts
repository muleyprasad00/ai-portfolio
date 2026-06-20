import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

import 'dotenv/config';

import { askPortfolioAssistant } from '../src/app/genkit/flows/portfolio-chat';
import type { ChatHistoryMessage } from './app/core/interfaces/app.interface';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// API: Mock Genkit proxy that streams responses (for local development)
// app.post('/api/genkit-stream', express.json(), (req, res) => {
//   const prompt = (req.body && req.body.prompt) || '';
//   const simulated = `Assistant response to: ${prompt} — This is a simulated streaming response from the Genkit proxy.`;
//   const words = simulated.split(/(\s+)/);

//   res.setHeader('Content-Type', 'text/plain; charset=utf-8');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   // send headers immediately
//   if (res.flushHeaders) res.flushHeaders();

//   let i = 0;
//   const interval = setInterval(() => {
//     if (i >= words.length) {
//       clearInterval(interval);
//       try {
//         res.end();
//       } catch (e) {
//         // ignore
//       }
//       return;
//     }

//     try {
//       res.write(words[i]);
//     } catch (e) {
//       clearInterval(interval);
//       try { res.end(); } catch (_) { }
//     }
//     i++;
//   }, 100);
// });
app.post('/api/genkit-stream', express.json(), async (req, res) => {

  try {

    const prompt = req.body?.prompt ?? '';
    const history = Array.isArray(req.body?.history) ? (req.body.history as ChatHistoryMessage[]) : [];

    const answer = await askPortfolioAssistant(prompt, history);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');

    res.write(answer);
    res.end();

  } catch (error) {

    console.error(error);

    res.status(500).end(
      'Sorry, something went wrong.'
    );
  }
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
