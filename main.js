document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.getElementById("note-input");
  const saveButton = document.getElementById("save-note");
  const notesList = document.getElementById("notes-list");

  // Detect browser and set appropriate API
  const browserAPI = detectBrowser();

  // Helper function to detect browser
  function detectBrowser() {
    if (
      typeof browser !== "undefined" &&
      browser.runtime &&
      browser.runtime.id
    ) {
      return browser;
    } else if (
      typeof chrome !== "undefined" &&
      chrome.runtime &&
      chrome.runtime.id
    ) {
      return chrome;
    } else {
      console.error("Unsupported browser environment");
      return null;
    }
  }

  // Load saved notes
  function loadNotes() {
    return new Promise((resolve, reject) => {
      browserAPI.storage.local.get(["notes"], function (result) {
        if (browserAPI.runtime.lastError) {
          reject(browserAPI.runtime.lastError);
        } else {
          resolve(result.notes || []);
        }
      });
    });
  }

  // Save notes
  function saveNotes(notes) {
    return new Promise((resolve, reject) => {
      browserAPI.storage.local.set({ notes }, function () {
        if (browserAPI.runtime.lastError) {
          reject(browserAPI.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  // Display notes
  function displayNotes(notes) {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.className = "note-item";
      li.innerHTML = `
        <strong>${note.title}</strong>
        <p>${note.text}</p>
        <a href="${note.url}" target="_blank">${note.url}</a>
        <br>
        <small>${note.date}</small>
        <div class="note-actions">
          <button class="edit-note">Edit</button>
          <button class="delete-note">Delete</button>
        </div>
      `;

      const editButton = li.querySelector(".edit-note");
      const deleteButton = li.querySelector(".delete-note");

      editButton.addEventListener("click", () => editNote(li, note, index));
      deleteButton.addEventListener("click", () => deleteNote(index));

      notesList.appendChild(li);
    });
  }

  // Save or edit note
  function saveNote(editIndex = -1) {
    const noteText = noteInput.value.trim();
    if (noteText) {
      browserAPI.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {
          const currentTab = tabs[0];
          const note = {
            text: noteText,
            title: currentTab.title,
            url: currentTab.url,
            date: new Date().toLocaleString(),
          };

          loadNotes()
            .then((notes) => {
              if (editIndex > -1) {
                notes[editIndex] = note;
              } else {
                notes.unshift(note);
              }
              return saveNotes(notes).then(() => {
                noteInput.value = "";
                displayNotes(notes);
              });
            })
            .catch((error) => console.error("Error saving note:", error));
        }
      );
    }
  }

  // Edit note
  function editNote(li, note, index) {
    const editInput = document.createElement("textarea");
    editInput.className = "edit-input";
    editInput.value = note.text;
    li.insertBefore(editInput, li.querySelector(".note-actions"));

    const saveEditButton = document.createElement("button");
    saveEditButton.textContent = "Save";
    saveEditButton.addEventListener("click", () => {
      noteInput.value = editInput.value;
      saveNote(index);
    });
    li.querySelector(".note-actions").prepend(saveEditButton);

    li.querySelector(".edit-note").style.display = "none";
  }

  // Delete note
  function deleteNote(index) {
    loadNotes()
      .then((notes) => {
        notes.splice(index, 1);
        return saveNotes(notes).then(() => displayNotes(notes));
      })
      .catch((error) => console.error("Error deleting note:", error));
  }

  // Initialize
  if (browserAPI) {
    loadNotes()
      .then(displayNotes)
      .catch((error) => console.error("Error loading notes:", error));

    // Event listeners
    saveButton.addEventListener("click", () => saveNote());
  } else {
    notesList.innerHTML =
      "<p>Unsupported browser. Please use a Chromium-based browser or Firefox.</p>";
  }
});
