import React, { useState } from 'react'

const New = () => {

    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: -1 }])
    const [examId, setexamId] = useState()

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: -1 }]);
    };

    const handleExamId = (e) => {
        setexamId(e.target.value);
    };

    const handleQuestionChange = (e, index) => {
        const newQuestions = [...questions];
        newQuestions[index].question = e.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (e, questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = e.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (e, index) => {
        const newQuestions = [...questions];
        newQuestions[index].answer = e.target.value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        let req = await fetch('/api/uploadQuestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ questions, examId })
        })
        let data = await req.json()
        console.log(data)
    }

    return (
        <div className='container my-4'>
            <h3>Upload Questions</h3>
            <div className="my-3">
                <label className='form-label'>Exam ID</label>
                <input className='form-control' type="number" value={examId} onChange={handleExamId} placeholder='Exam ID' />
            </div>
            {questions.map((question, questionIndex) => (
                <div className='card p-3 my-3' key={'q' + questionIndex}>
                    <label className='form-label'>Question {questionIndex + 1}:</label>
                    <input className='form-control' type="text" value={question.question} onChange={(e) => handleQuestionChange(e, questionIndex)} />
                    <div className="row my-3">
                        {question.options.map((option, optionIndex) => (
                            <div className="col-md-3" key={'o' + optionIndex + 'q' + questionIndex}>
                                <label className='form-label'>Option {optionIndex + 1}: </label>
                                <input className='form-control' type="text" value={option} onChange={(e) => handleOptionChange(e, questionIndex, optionIndex)} />
                            </div>
                        ))}
                    </div>
                    <div className="col-md-3">
                        <label className='form-label'>Correct Answer: </label>
                        <input className='form-control' type="text" value={question.answer} onChange={(e) => handleAnswerChange(e, questionIndex)} min={1} max={4} />
                    </div>
                </div>
            ))}
            <button className='btn btn-primary mb-4 mx-2' onClick={handleAddQuestion}>+ Add Question</button>
            <button className='btn btn-primary mb-4 mx-2' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default New
