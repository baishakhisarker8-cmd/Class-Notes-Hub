 // 📂 1. Sync Class Notes from Firebase in Real-time
        function syncNotes() {
            db.collection("notes").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
                const notesList = document.getElementById('notesList');
                notesList.innerHTML = "";
                
                if(snapshot.empty) {
                    notesList.innerHTML = "<p style='color: #64748b;'>No notes available at the moment.</p>";
                    return;
                }

                snapshot.forEach((doc) => {
                    const note = doc.data();
                    notesList.innerHTML += `
    <div class="note-card">
    
    <div class="note-header">
        <h4>📄 ${note.title}</h4>
    </div>

    <div class="note-body">
        <a href="${note.link}" target="_blank" class="btn-download">
            📥 View PDF
        </a>
    </div>

    <div class="action-buttons">
        <button class="edit-btn"
            onclick="editNote('${doc.id}', '${note.title}', '${note.link}')">
            ✏️ Edit
        </button>

        <button class="delete-btn"
            onclick="deleteNote('${doc.id}')">
            🗑️ Delete
        </button>
    </div>

</div>
`;
                });
            });
        }

        // 📂 2. Upload Note (Admin Feature)
        function addNote() {
            const title = document.getElementById('noteTitle').value;
            const link = document.getElementById('noteLink').value;
            if(title === "" || link === "") { alert("Please provide both note title and link!"); return; }

            db.collection("notes").add({
                title: title,
                link: link,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert("New note successfully saved to cloud database!");
                document.getElementById('noteTitle').value = "";
                document.getElementById('noteLink').value = "";
            })
            .catch((error) => console.error("Error adding note: ", error));
        }
 // 1. Function to delete a note from Firebase
function deleteNote(noteId) {
    if (confirm("Are you sure you want to delete this note?")) {
        db.collection("notes").doc(noteId).delete().then(() => {
            alert("Note deleted successfully!");
            location.reload(); // Refresh the page to update the list
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

// 2. Function to edit/update a note in Firebase
function editNote(noteId, currentTitle, currentLink) {
    const newTitle = prompt("Enter new note title:", currentTitle);
    const newLink = prompt("Enter new Google Drive link:", currentLink);

    // Check if the user didn't click cancel and filled both fields
    if (newTitle && newLink) {
        db.collection("notes").doc(noteId).update({
            title: newTitle,
            link: newLink
        })
        .then(() => {
            alert("Note updated successfully!");
            location.reload(); // Refresh the page to update the list
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }
}