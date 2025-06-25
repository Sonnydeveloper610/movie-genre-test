import React, { useState } from "react";
import { questions } from "./questions";
import { results } from "./results";

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [dark, setDark] = useState(false);

  const handleSelect = (type) => {
    setAnswers([...answers, type]);
    setStep(step + 1);
  };

  // 결과 계산
  if (step === questions.length) {
    // 가장 많이 선택된 type 찾기
    const count = {};
    answers.forEach((type) => {
      count[type] = (count[type] || 0) + 1;
    });
    const resultType = Object.keys(count).reduce((a, b) =>
      count[a] > count[b] ? a : b
    );
    const result = results[resultType];

    // 랜덤 추천 영화 버튼 기능
    const handleRandomMovie = () => {
      const allMovies = Object.values(results).flatMap(r => r.movies);
      const pick = allMovies[Math.floor(Math.random() * allMovies.length)];
      setRandomMovie(pick);
    };

    return (
      <div
        style={{
          maxWidth: 400,
          margin: "40px auto",
          textAlign: "center",
          background: dark ? "#222" : "#fff",
          color: dark ? "#fff" : "#222",
          minHeight: "100vh",
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          position: "relative",
          transition: "background 0.3s, color 0.3s"
        }}
      >
        {/* 다크모드 토글 버튼 */}
        <button
          onClick={() => setDark(!dark)}
          style={{
            position: "absolute",
            right: 20,
            top: 20,
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: dark ? "#fff" : "#222"
          }}
        >
          {dark ? "☀️" : "🌙"}
        </button>
        <h2 style={{ marginTop: 60 }}>당신의 영화 성격은?</h2>
        <h3>{result.title}</h3>
        <p>{result.desc}</p>
        <p>대표 캐릭터: {result.character}</p>
        <p>추천 영화: {result.movies.join(", ")}</p>
        <button
          onClick={() => {
            setStep(0);
            setAnswers([]);
            setRandomMovie(null);
          }}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: dark ? "#444" : "#4caf50",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          테스트 다시하기
        </button>
        <div style={{ marginTop: 20 }}>
          <button
            onClick={handleRandomMovie}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: dark ? "#666" : "#2196f3",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            랜덤 추천 영화 보기
          </button>
          {randomMovie && (
            <div style={{ marginTop: 10, fontWeight: "bold" }}>
              🎬 {randomMovie}
            </div>
          )}
        </div>
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("링크가 복사되었습니다!");
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: dark ? "#888" : "#ff9800",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            결과 링크 복사
          </button>
        </div>
      </div>
    );
  }

  // 진행바 계산
  const q = questions[step];
  const progress = Math.round(((step) / questions.length) * 100);

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        textAlign: "center",
        background: dark ? "#222" : "#fff",
        color: dark ? "#fff" : "#222",
        minHeight: "100vh",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "relative",
        transition: "background 0.3s, color 0.3s"
      }}
    >
      {/* 다크모드 토글 버튼 */}
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: "absolute",
          right: 20,
          top: 20,
          background: "none",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          color: dark ? "#fff" : "#222"
        }}
      >
        {dark ? "☀️" : "🌙"}
      </button>
      {/* 진행 바 */}
      <div style={{ margin: "40px 0 20px 0" }}>
        <div
          style={{
            background: dark ? "#444" : "#eee",
            borderRadius: "8px",
            height: "12px",
            width: "100%",
            marginBottom: "8px"
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: dark ? "#90caf9" : "#4caf50",
              height: "100%",
              borderRadius: "8px",
              transition: "width 0.3s"
            }}
          />
        </div>
        <div style={{ fontSize: "14px" }}>
          {step + 1} / {questions.length} 진행 중
        </div>
      </div>
      {/* 질문과 선택지 */}
      <h2>{q.question}</h2>
      {q.options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => handleSelect(opt.type)}
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: dark ? "#333" : "#f9f9f9",
            color: dark ? "#fff" : "#222",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s"
          }}
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
}

export default App;