public class Student extends User {

    private int examTaken;

    public Student(String id,
                   String name,
                   String email,
                   String password) {

        super(id, name, email, password);
    }

    public void takeExam() {
        examTaken++;
    }
public int getExamTaken() {
        return examTaken;
    }
    
    @Override
    public void displayInfo() {
        System.out.println("Student : "
                + getName());
                System.out.println("Exams Taken : " + getExamTaken());
    } 
}