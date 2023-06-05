...
const dataFile = "/var/data/kubia.txt";
...
var handler = function(request, response) {
  if (request.method == 'POST') {
    var file = fs.createWriteStream(dataFile);                     
    // On POST requests, store the request’s body into a data file.
    file.on('open', function (fd) {                                
      request.pipe(file);                                          
      console.log("New data has been received and stored.");       
      response.writeHead(200);                                     
      response.end("Data stored on pod " + os.hostname() + "\n");  
    });
  } else {
      // On GET (and all other types of) requests, return your hostname and the contents of the data file.
    var data = fileExists(dataFile)                                
      ? fs.readFileSync(dataFile, 'utf8')                          
      : "No data posted yet";                                      
    response.writeHead(200);                                       
    response.write("You've hit " + os.hostname() + "\n");          
    response.end("Data stored on this pod: " + data + "\n");       
  }
};

var www = http.createServer(handler);
www.listen(8080);