import React, { useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    const question = data[index];

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add('correct');
                setScore((prev) => prev + 1);
            } else {
                e.target.classList.add('wrong');
                const correctOption = document.querySelector(`.option-${question.ans}`);
                if (correctOption) {
                    correctOption.classList.add('correct');
                }
            }
            setLock(true);
        }
    };

    const next = () => {
        if (lock) {
            if (index < data.length - 1) {
                setIndex((prev) => prev + 1);
                setLock(false);
                const options = document.querySelectorAll('li');
                options.forEach((option) => {
                    option.classList.remove('correct', 'wrong');
                });
            } else {
                setIsQuizCompleted(true);
            }
        }
    };

    const resetQuiz = () => {
        setIndex(0);
        setScore(0);
        setLock(false);
        setIsQuizCompleted(false);
        const options = document.querySelectorAll('li');
        options.forEach((option) => {
            option.classList.remove('correct', 'wrong');
        });
    };

    if (isQuizCompleted) {
        return (
            <div className="container">
                <h1>Quiz Completed!</h1>
                <p>Your Score: {score} / {data.length}</p>
                <button onClick={resetQuiz}>Reset Quiz</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            <h2>
                {index + 1}. {question.question}
            </h2>
            <ul>
                <li className={`option-1`} onClick={(e) => checkAns(e, 1)}>
                    {question.option1}
                </li>
                <li className={`option-2`} onClick={(e) => checkAns(e, 2)}>
                    {question.option2}
                </li>
                <li className={`option-3`} onClick={(e) => checkAns(e, 3)}>
                    {question.option3}
                </li>
                <li className={`option-4`} onClick={(e) => checkAns(e, 4)}>
                    {question.option4}
                </li>
            </ul>
            <button onClick={next} disabled={!lock}>
                Next
            </button>
            <div className="index">
                {index + 1} of {data.length} Questions
            </div>
        </div>
    );
};

export default Quiz;
