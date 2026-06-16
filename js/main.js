// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    // called after all scripts are loaded and DOM is ready
    if (typeof syncNotes === 'function') {
        syncNotes();
    }
    if (typeof syncQuestions === 'function') {
        syncQuestions();
    }
});