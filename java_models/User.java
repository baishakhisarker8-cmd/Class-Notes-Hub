public abstract class User extends PortalEntity {

    private String name;
    private String email;
    private String password;

    public User(String id, String name,
                String email,
                String password) {

        super(id);

        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setName(String name) {
        this.name = name;
    }

   public abstract void displayInfo();
}