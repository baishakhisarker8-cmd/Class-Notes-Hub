public class Main {
    public static void main(String[] args) {

        PortalItem.setPortalName("Learning Portal");

        PortalItem item = new PortalItem(
            "1",
            "Google",
            "https://google.com"
        );

        item.displayInfo();

        Quiz quiz = new Quiz(
            "What is the capital of France?",
            new String[]{"A) London", "B) Berlin", "C) Paris", "D) Madrid"},
            2
        );
        quiz.displayQuiz();
    }
}