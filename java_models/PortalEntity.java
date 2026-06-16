public abstract class PortalEntity {

    protected final String id;   // 🔥 final added

    public PortalEntity(String id) {
        this.id = id;
    }

    public final void showId() {   // 🔥 final method
        System.out.println("ID: " + id);
    }

    public abstract void displayInfo();
}