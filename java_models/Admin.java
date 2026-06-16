import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
public class Admin extends User {
    private final ArrayList<Note> notes = new ArrayList<>();

    public Admin(String id,
                 String name,
                 String email,
                 String password) {

        super(id, name, email, password);
    }

    public void uploadNote(Note note) {

    try {

        if (note.getTitle().isEmpty()) {
            throw new Exception("Note title cannot be empty!");
        }

        notes.add(note);

        System.out.println(
                "Uploaded Note : "
                + note.getTitle()
        );

    } catch (Exception e) {

        System.out.println("Error: " + e.getMessage());

    }
}
    @Override
    public void displayInfo()
    {

        System.out.println(
                "Admin : "
                + getName()
        );
    }
    public void showAllNotes() {

    System.out.println("All Notes:");

    for (Note note : notes) {
        System.out.println("- " + note.getTitle());
    }
}
public void saveNotesToFile() {

    try (FileWriter writer = new FileWriter("notes.txt")) {

        for (Note note : notes) {
            writer.write(note.getTitle() + " - " + note.getLink() + "\n");
        }
        System.out.println("Notes saved to notes.txt");

    } catch (IOException e) {

        System.out.println("File Error: " + e.getMessage());

    }
}
}