const net = require('net');

// IP and Port for connecting to the scanner
const scannerIp = '192.168.100.253'; 
const port = 25250; 

// Create a TCP client and connect to the scanner
const client = new net.Socket();

client.connect(port, scannerIp, () => {
  console.log(`Connected to scanner at ${scannerIp}:${port}`);
});

// Listen for data from the scanner
client.on('data', (data) => {
    const qr = data.toString();
    console.log(qr)
    
    // Check if it starts with 'FCOM' and has exactly 5 digits at the end
        if (qr.startsWith('FCOM') && /\d{5}$/.test(qr)) {
            console.log(qr)
            // console.log('Can be saved to db')
        } else {
            console.log('Invalid QR Code Format');
        }
});

// Handle error events
client.on('error', (err) => {
  console.error('Error occurred while connecting to the scanner:', err.message);
});

// Handle connection closure
client.on('close', () => {
  console.log('Connection closed');
});
