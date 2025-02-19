import socket

# Scanner IP and Port
scanner_ip = "192.168.100.250"
port = 55256

try:
    # Create a TCP client socket
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect((scanner_ip, port))
    print(f"Connected to scanner at {scanner_ip}:{port}")

    while True:
        data = client.recv(1024)  # Receive up to 1024 bytes
        if not data:
            break  # Exit loop if connection is closed

        qr = data.decode().strip()

        # Check if it starts with 'FCOM' and has exactly 5 digits at the end
        if qr.startswith("FCOM") and qr[-5:].isdigit():
            print(f"Can be saved to db {qr}")
            # print("Can be saved to db")
        else:
            print("Invalid QR Code Format")

except socket.error as err:
    print(f"Error occurred while connecting to the scanner: {err}")

finally:
    client.close()
    print("Connection closed")
