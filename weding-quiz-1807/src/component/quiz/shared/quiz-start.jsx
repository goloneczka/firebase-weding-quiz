export const QuizStartForm = ({ quizData, userName, onUserNameChange, onStart }) => {
  return (
    <div>
      <p>{quizData?.title}</p>
      <p>{quizData?.createdAt?._seconds}</p>

      <div style={{ marginTop: 16 }}>
        <label htmlFor="participantName">Your name</label>
        <br />
        <input
          id="participantName"
          type="text"
          value={userName}
          onChange={(e) => onUserNameChange(e.target.value)}
          placeholder="Imi(e/ona) gościa"
          style={{ padding: 8, width: "100%", maxWidth: 320, marginTop: 8 }}
        />
        <br />
        <button onClick={onStart} disabled={!userName.trim()} style={{ marginTop: 12, padding: "10px 16px" }}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};
