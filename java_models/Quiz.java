public class Quiz {

    private final String question;
    private final String[] options;
    private final int answer;

    public Quiz(String question,
                String[] options,
                int answer) {

        this.question = question;
        this.options = options;
        this.answer = answer;
    }

    public boolean checkAnswer(int userAnswer) {
        return userAnswer == answer;
    }
    public void displayQuiz() {
        System.out.println("Question: " + question);
        for (String option : options) {
            System.out.println(option);
        }
    }
        
}
