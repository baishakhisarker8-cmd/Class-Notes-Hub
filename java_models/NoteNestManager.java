public class NoteNestManager {

    public static void main(String[] args) {

        User admin =
        new Admin(
                "A01",
                "Baishakhi",
                "admin@gmail.com",
                "123"
        );

User student =
        new Student(
                "S01",
                "Rahim",
                "rahim@gmail.com",
                "123"
        );

      Note note =
        new Note(
                "Java OOP Note",
                "drive-link"
        );

       ((Admin) admin).uploadNote(note);
       ((Admin) admin).showAllNotes();
       ((Admin) admin).saveNotesToFile();
       note.downloadNote();

        admin.displayInfo();

        student.displayInfo();
        System.out.println("Total Notes: " + Note.getNoteCount());
    }
}
