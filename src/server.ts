import { createServer,  IncomingMessage, ServerResponse } from 'http';
import url from 'url';

import { readFile } from 'fs';
import { debPrint } from 'glvlib/DebUtils.js'
import path from 'path';

const port: number = !process.env.SERVER_PORT ? 4001 : Number(process.env.SERVER_PORT);
const index: string  = !process.env.INDEX ? 'index.html' : process.env.INDEX;

const requestListener = function (req: IncomingMessage, res: ServerResponse) {
    // Pull the filename from the req url and respond accordingly.
    const urlPars = url.parse(req.url || '', true);
    debPrint(`Parsed URL: ${urlPars}`);
    const toRead = urlPars.pathname || ''
    if (!toRead) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Nothing found: ${req.url}`);
        return;
    }
    const { root, dir, base, ext } = path.parse(toRead)
    const localfilename = 
        (!/^\/$/.test(dir) && /^\//.test(dir)) 
        ? dir.slice(1,)+'/' 
        : ''
        + base
    debPrint(`Reading for ${root}: ${localfilename}`);
    readFile(localfilename, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        let ct;
        switch (ext) {
          case '.js': ct = 'text/javascript'; break;
          case '.css':  ct = 'text/css'; break;
          case '.json': ct = 'application/json'; break;
          case '.png':  ct = 'image/png'; break;
          case '.jpg':  ct = 'image/jpg'; break;
          case '.svg':  ct = "image/svg+xml"; break;
          case '.html': ct = 'text/html'; break;
          default: ct = 'text/plain'; break;
        }
        res.writeHead(200, { 'Content-Type': ct });
        debPrint(JSON.stringify(data));
        res.end(data);
    });
}    

const server = createServer(requestListener);
server.listen(port);
