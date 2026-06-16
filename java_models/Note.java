public class Note implements Downloadable {
private static int noteCount = 0;
    private String title;
    private String link;

    public Note(String title,
                String link) {

        this.title = title;
        this.link = link;
        noteCount++;
    }

    public String getTitle() {
        return title;
    }

    public String getLink() {
        return link;
    }
    public static int getNoteCount() {
    return noteCount;
}
    @Override
public void downloadNote() {
    System.out.println("Downloading: " + title);
}
}
