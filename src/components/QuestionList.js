import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [question, setQuestion] = useState([]);



  const url = "http://localhost:4000/questions";

  // fetch method
  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((data) => setQuestion(data));
  }, []);

  // patch method/ update
  const handleUpdate = (id, correctIndex) => {
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updateAnswer) => {
        const update = question.map((que) => {
          if (que.id === updateAnswer.id) {
            return update;
          }
          return que;
        });
        setQuestion(updateAnswer);
      });
  };
  // console.log(handleUpdate)

  // delete method
    function handleDelete(id) {
      fetch(`${url}${id}`, {
        method: "DELETE",
      })
      .then(() => {
        const updatedQuestions = question.filter((q) => q.id !== id);
          setQuestion(updatedQuestions);
        });
    }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>

        {question.map((aQuestion) => (

          <QuestionItem key={aQuestion.id} quiz={aQuestion} handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;