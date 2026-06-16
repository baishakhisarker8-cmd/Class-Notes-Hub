public class PortalItem extends PortalEntity {

    private String title;
    private String url;

    // 🔥 static variable
    private static String portalName = "My Portal";

    public PortalItem(String id, String title, String url) {
        super(id);
        this.title = title;
        this.url = url;
    }

    // 🔥 static method
    public static String getPortalName() {
        return portalName;
    }

    public static void setPortalName(String name) {
        portalName = name;
    }

    @Override
    public void displayInfo() {

        showId(); // parent final method call

        System.out.println("Portal: " + portalName);
        System.out.println("Title: " + title);
        System.out.println("URL: " + url);
    }
}