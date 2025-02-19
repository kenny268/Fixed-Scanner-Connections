const mqtt = require('mqtt');

// MQTT Broker details
const brokerUrl = 'mqtt://192.168.100.10'; // Replace with your broker's IP or URL
const topic = 'scanner/data'; // Topic where the scanner publishes data

// Connect to the MQTT broker
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
    console.log(`Connected to MQTT broker at ${brokerUrl}`);
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

// Listen for messages from the scanner
client.on('message', (receivedTopic, message) => {
    if (receivedTopic === topic) {
        const qr = message.toString();

        // Check if it starts with 'FCOM' and has exactly 5 digits at the end
        if (qr.startsWith('FCOM') && /\d{5}$/.test(qr)) {
            console.log('Valid QR Code Format');
            console.log('Can be saved to db');
        } else {
            console.log('Invalid QR Code Format');
        }
    }
});

// Handle errors
client.on('error', (err) => {
    console.error('MQTT Error:', err.message);
});

// Handle client disconnection
client.on('close', () => {
    console.log('Disconnected from MQTT broker');
});
