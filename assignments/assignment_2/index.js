const fs=require("fs");
const http=require("http");

fs.writeFile("index.html","<h1>Hello World</h1>",(err)=>{
    console.log(err);
});

http.createServer((req,res)=>{
    var data=fs.readFileSync("index.html",'utf-8');
    console.log(data)
    res.writeHead(200,{'Content-type':'text/html'});
    res.end(data);
}).listen(3000,()=>{
    console.log("server is listening to 3000");
});

