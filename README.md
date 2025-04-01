# Starting the server

1. Open a terminal or command prompt.
2. Navigate to the server folder:
   ```sh
   cd server
   ```
3. Install the dependencies:
``sh
npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```
5. The server will start and be ready to work.



# Installing the extension in Chrome via ./dist

## Step 1: Opening the Extension Settings
1. Open Google Chrome.
2. Type in the address bar: `chrome://extensions/` and press **Enter**.

## Step 2: Enabling Developer Mode
1. In the upper-right corner of the page, turn on **Developer mode** (*Developer mode*).

## Step 3: Download the unpacked extension
1. Click **Load unpacked** (*Load unpacked*).
2. Select the './dist` folder where the compiled extension is located.
3. Click **Select Folder**.

## Step 4: Checking the installation
1. The extension will appear in the installed list.
2. If there are errors, check the developer console in Chrome (`F12` → **Console**).
3. Check the `manifest.json`, make sure that the files are uploaded correctly.