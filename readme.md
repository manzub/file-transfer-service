# File Transfer Service

This project is a Node.js-based file transfer service that enables seamless file sharing between devices connected to the same network over HTTP. It mimics the functionality of Apple's AirDrop but works across Windows, non-Mac devices, and any device with a web browser.

---

## Features

- **Cross-Platform Compatibility**: Share files between any devices (Windows, Linux, macOS, Android, iOS, etc.)
- **Network-Based**: Works within the same local network without requiring internet access.
- **Easy Access**: Access and download shared files through a web interface.
- **Multi-Device Support**: Upload and download files from multiple devices simultaneously.
- **No Installation Required**: Devices only need a browser to access the service.

---

## Requirements

- Node.js (v14 or higher)
- Devices must be connected to the same local network

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/file-transfer-service.git
   cd file-transfer-service
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Upload Directory**
   Ensure there is a directory to store uploaded files:
   ```bash
   mkdir uploads
   ```

4. **Run the Server**
   ```bash
   node server.js
   ```

---

## Usage

1. **Start the Service**
   Run the server using the command above. The server will start on the default port `3000`.

2. **Access the Web Interface**
   Open a browser on any device connected to the same network and navigate to:
   ```
   http://<your-local-ip>:3000
   ```
   Replace `<your-local-ip>` with the local IP address of the server (e.g., `192.168.1.10`).

3. **Upload Files**
   - Use the web interface to select and upload files.
   - Files will be stored on the server in the `uploads/` directory.

4. **Download Files**
   - Files uploaded to the server will be listed on the web interface.
   - Click on a file to download it to any connected device.

---

## Configuration

You can customize the server by editing `server.js`:

- **Change the Port**:
  Modify the port number in the following line:
  ```javascript
  const PORT = 3000;
  ```

- **Upload Directory**:
  Change the destination directory for uploaded files in the `multer` configuration:
  ```javascript
  const uploadDir = 'uploads/';
  ```

---

## Limitations

- Devices must be on the same local network.
- The service does not support internet-based transfers.
- Large file uploads may be limited by your network speed and server configuration.

---

## Future Enhancements

- Add support for encrypted file transfers.
- Implement a progress bar for file uploads and downloads.
- Enable password-protected access for enhanced security.
- Add multicast discovery to make devices discoverable without typing the IP address.

---