// Function to save a note to local storage
function saveNoteToLocalStorage(noteText, timeString) {
    var existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
    existingNotes.push({ text: noteText, time: timeString });
    localStorage.setItem('notes', JSON.stringify(existingNotes));
}

// Function to remove a note from local storage
function removeNoteFromLocalStorage(noteIndex) {
    var existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
    existingNotes.splice(noteIndex, 1); // Remove the note at the specified index
    localStorage.setItem('notes', JSON.stringify(existingNotes)); // Save the modified array back to local storage
    loadNotesFromLocalStorage(); // Reload notes to update the UI and indices
}

// Function to create a new note element and append it to the DOM
function createNoteElement(noteText, timeString, index) {
    var notesContainer = document.getElementById('notesContainer');
    var newNoteDiv = document.createElement('div');
    newNoteDiv.classList.add('notesDiv');
    newNoteDiv.setAttribute('data-index', index); // Set a data attribute for the index

    newNoteDiv.innerHTML = `
        <p class="para" id="time">${timeString}</p>
        <p id="textoutput">${noteText}</p>
    `;

    // Event listener for double-click to delete
    newNoteDiv.addEventListener('dblclick', function() {
        var confirmDelete = confirm("Delete this note?");
        if (confirmDelete) {
            notesContainer.removeChild(newNoteDiv);
            removeNoteFromLocalStorage(index);
        }
    });

    notesContainer.appendChild(newNoteDiv);
}

// Function to load and display notes from local storage on page load
function loadNotesFromLocalStorage() {
    var notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = ''; // Clear existing notes
    var existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
    
    existingNotes.forEach(function(note, index) {
        createNoteElement(note.text, note.time, index);

    });

    var noteCounter = document.getElementById('noteCounter');
    noteCounter.textContent = existingNotes.length; // Update note counter
}

// Event listener for the New Note button
document.getElementById('newNoteBtn').addEventListener('click', function() {
    var noteText = prompt("Please enter your note text:");
    if (noteText) {
        var currentDate = new Date();
        var timeString = `Today, ${currentDate.getHours()}:${currentDate.getMinutes()}`;

        saveNoteToLocalStorage(noteText, timeString); // Save the note to local storage
        loadNotesFromLocalStorage(); // Reload notes to include the new one
    }
});

// Load notes from local storage when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadNotesFromLocalStorage();
});
