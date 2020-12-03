function getSessionID(){
    var req = new XMLHttpRequest();
    var sessID;
    
    req.open('GET', 'localhost:4001/sessionID', true);

    req.onload = function () {
        if (this.status === 200){
            console.log('Inside the getSession')
            console.log(this.response);
        }
    }
    req.send()
    return sessID;
}