const http = require('http');
const fs = require('fs');
const url = require('url');

const DIST = process.env.DIST || process.argv[2] || 'dist';

const USED_FRAMEWORK = process.env.USED_FRAMEWORK || process.argv[3] || 'NG';

const fileOrder = {
    "NG": ['polyfills','main','styles']
}
const FULL_DIST_PATH = __dirname + "/" + DIST;

const PORT = process.env.PORT || 5052;

const DEV_MODE = process.env.DEV || false;

const ROUTE = process.env.ROUTE || "http://localhost:" + PORT;

const CONTENT_TYPES = {
    ".js": "application/javascript",
    ".map": "application/javascript",
    ".html": "text/html",
    ".css": "text/css",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".ico": "image/ico",
    ".woff": "font/woff",
    ".otf": "font/otf",
    ".eot": "font/eot",
    ".ttf": "font/ttf"
};

function buildLinkHeader() {
    console.log(FULL_DIST_PATH + "%%%%%%%%%%%%%%%%%%%%%%%%%%55")
    let files = fs.readdirSync(FULL_DIST_PATH);
    let rel = 'fragment-script';
    if (USED_FRAMEWORK === 'NG') {

        return fileOrder["NG"].map(fo => {
            console.log("--->" + fo)
            let currentFile = files.filter((f) => {
                return f.indexOf(fo) !== -1;
            })[0];
            console.log(currentFile)
            if (currentFile) {
                switch (currentFile.substring(currentFile.lastIndexOf('.'))) {
                    case '.css':
                        rel = 'stylesheet'
                        break;

                    case '.js':
                        rel = 'fragment-script'
                        break;
                }
                return `<${ROUTE}/${DIST}/${currentFile}>;rel="${rel}"`;
            }
        }).join(',');
    } else {
        return files.map((file) => {
            let rel = 'fragment-script';
            let ending = file.substring(file.lastIndexOf('.'));
            switch (ending) {
                case '.css':
                    rel = 'stylesheet'
                    break;
            }
            if (ending !== '.html') {
                return `<${ROUTE}/${DIST}/${file}>;rel="${rel}"`;
            }

        }).join(',');
    }
}


const LINK = buildLinkHeader();

function serve(req, res, startDate) {

    let path = url.parse(req.url).pathname;
    let filepath = __dirname + path;

    fs.exists(filepath, (exists) => {
        console.log(filepath + "**")
        if (path === '/') {
            res.writeHead(200, {
                "Content-Type": "text/html",
                "Link": LINK
            });

            res.end(``);
        }
        else {
            console.log(path.substring(path.lastIndexOf('.')));
            let ct = CONTENT_TYPES[path.substring(path.lastIndexOf('.'))] || 'text/plain';
            res.writeHead(200, { 'Content-Type': ct });
            return fs.createReadStream(filepath).pipe(res);

        }
    });

    let endDate = new Date();
    let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log(req.url + '---' + "Time until DOMready: " + seconds)
}

const server = http.createServer((req, res) => {
    let startDate = new Date();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    serve(req, res, startDate);

});

server.listen(PORT, () => {
    console.log(`fragment server is waiting on port ${PORT}`)
});