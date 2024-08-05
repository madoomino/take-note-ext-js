# Take Note Extension

A simple browser extension for taking quick notes and saving them locally. The extension is compatible with both Chromium-based browsers (like Chrome, Edge, Opera) and Firefox.

Tested on thorium-browser & mercury-browser, on a linux machine.

## Features

- **Quick Note Input:** Easily add notes with the current page's title, URL, and timestamp.
- **Persistent Storage:** Save notes locally in the browser's storage.
- **Edit & Delete:** Edit and delete existing notes.
- **Cross-Browser Compatibility:** Works with both Chromium-based browsers and Firefox.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/madoomino/take-note-ext-js.git
   cd take-note-ext-js
   ```

2. **For Chromium-based browsers (Chrome, Edge, Opera, etc.):**

   - Execute `git checkout chromium`
   - Open the browser and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click "Load unpacked" and select the directory where you cloned the repository.

3. **For Firefox:**
   - Execute `git checkout firefox`
   - Open the browser and navigate to `about:debugging#/runtime/this-firefox`.
   - Click "Load Temporary Add-on" and select any file from the directory where you cloned the repository.

## Usage

1. Open the extension's popup or interface.
2. Enter your note in the textarea provided.
3. Click the "Save Note" button to save the note.
4. The note will appear in the "Saved Notes" list, showing the note's title, content, URL, and timestamp.
5. You can edit or delete the notes using the buttons provided.

## File Structure

- `main.js`: Contains the JavaScript code for managing notes, including saving, editing, and deleting.
- `index.html`: The HTML structure and layout for the note-taking interface.
- `style.css`: (Optional) Separate CSS file for styling.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/MIT) for details.
