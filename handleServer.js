let tools = require('./importer')([
  './apiHandle','./hanldeHome',
  './isRequestPath', './cacheIt',
  './caches','fs'
]);
let {log} = console;
let googleVerif = tools.fs.readFileSync('google9bf29b061c4d9f4c.html');


function handleServer(server) {
  server.use('/', function (request, response) {
    let resolved = false;
    tools.isRequestPath('/api', request.url,  (fpath)=>{
      resolved = true;
      request.url = fpath;
      tools.apiHandle(request, response);
    });
    tools.isRequestPath('/cacheit', request.url,  (fpath)=>{
      resolved = true;
      request.url = fpath;
      tools.cacheIt(request, response);
    });
    tools.isRequestPath('/caches', request.url,  (fpath)=>{
      resolved = true;
      request.url = fpath;
      tools.caches(request, response);
    });
    tools.isRequestPath("/google9bf29b061c4d9f4c.html", request.url, (fpath)=>{
	    resolved = true;
	    request.url = fpath;
	    response.writeHead(200, {
		    "Content-type":"text/html"
	    });
	    response.write(googleVerif);
	    response.end();
    });
    if(!resolved) {
      tools.hanldeHome(request, response);
    }
  });
}

module.exports = handleServer;
