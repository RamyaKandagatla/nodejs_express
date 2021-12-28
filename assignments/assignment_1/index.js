function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    var name=process.argv[2];
    return name
}

function getNameFromEnv() {
    // Write your code here
    process.env.ENV_VARIABLE=getNameFromCommandLine();
    return process.env.ENV_VARIABLE
}

function getNameFromReadLine() {
    // Write your code here
    const readline=require("readline");
    const rl=readline.createInterface({
        input:process.stdin,
        output:process.stdout

    });
    rl.question("enter the name?", (answer) =>{
        console.log("Hello",answer);
    });


}

module.exports={
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine,
}
    

    
