const {Client} = require('ssh2');
const net = require("net");

const productionMode = process.env.NODE_ENV === 'production'

let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let port = process.env.PORT;

console.log(`username=${username}, password=${password}, port=${port}`);

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const localSrv = net.createServer((localStream) => {
        conn.forwardOut('localhost', port, 'localhost', port, (err, remoteStream) => {
            if (err) {
                throw err;
            }

            localStream.on('close', err => {
                console.log("localStream closed")
            })

            remoteStream.on('finish', err => {
                console.log("remoteStream finish")
            })

            remoteStream.pipe(localStream).pipe(remoteStream);
        });
    });

    localSrv.on("error", (err) => {
        console.log("localSrv err:", err);
    })

    localSrv.listen(port, "localhost", err => {
        if (err) {
            throw err;
        }
    });

}).connect({
    host: 'ug250.eecg.toronto.edu',
    port: 22,
    username: username,
    password: password
});

// TODO: rethink this and look for better mitigation methods
process.on('uncaughtException', (err, origin) => {
    if (err.errno === -54 && err.code === 'ECONNRESET' && err.syscall === 'read') {
        console.log("tunnel connection terminated... ")
    } else if (productionMode) {
        console.log(err)
    } else {
        throw err
    }
})
