import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const New = () => {

    const [questions, setQuestions] = useState([{ question: '', options: [''], answers: [false], marks: '', type: '', answer: '' }])
    const [examId, setexamId] = useState('')
    const [examDetails, setExamDetails] = useState({ name: '', date: '', startTime: '', endTime: '', totalTime: '', subjects: [] })

    const handleExamDetailsChange = (e) => {
        const { name, value } = e.target;
        setExamDetails({ ...examDetails, [name]: value });
    }

    const handleSubjectChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSubjects = [...examDetails.subjects];
        updatedSubjects[index][name] = value;
        setExamDetails({ ...examDetails, subjects: updatedSubjects });
    }

    const addSubject = (event) => {
        event.preventDefault();
        setExamDetails({ ...examDetails, subjects: [...examDetails.subjects, { name: '', length: '', start: '', end: '' }] })
    }

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: [''], answers: [false], marks: '', type: '', answer: '' }]);
    };

    const handleAddOption = (ind) => {
        const newQuestions = [...questions]
        newQuestions[ind].options = [...newQuestions[ind].options, '']
        newQuestions[ind].answers = [...newQuestions[ind].answers, false]
        setQuestions(newQuestions);
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

    const handleAnswerChange = (e, questionIndex, answerIndex, multi) => {
        console.log(e.target.checked)
        const newQuestions = [...questions];
        let ans = newQuestions[questionIndex].answers
        if (!multi) {
            for (let i = 0; i < ans.length; i++) {
                newQuestions[questionIndex].answers[i] = false
            }
        }
        newQuestions[questionIndex].answers[answerIndex] = e.target.checked;
        setQuestions(newQuestions);
        console.log(newQuestions[questionIndex].answers)
    };

    const handleNumberAnswerChange = (e, questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answer = e.target.value;
        setQuestions(newQuestions);
        console.log(newQuestions[questionIndex].answer)
    };

    const handleMarksChange = (e, questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].marks = e.target.value;
        setQuestions(newQuestions);
        console.log(newQuestions[questionIndex].marks)
    };

    const handleType = (e, questionIndex) => {
        console.log(e.target.value)
        const newQuestions = [...questions];
        newQuestions[questionIndex].type = e.target.value;
        let ans = newQuestions[questionIndex].answers
        for (let i = 0; i < ans.length; i++) {
            newQuestions[questionIndex].answers[i] = false
        }
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

    const deleteQuestion = (e, ind) => {
        const newQuestions = [...questions];
        newQuestions.splice(ind, 1)
        setQuestions(newQuestions);
    }

    return (<div className='mb-3'>
    <form id="formid5056">
    </form>
        <div className='container mt-4'>
            <h3>Upload Questions</h3>
            <div className="my-3">
                <label className='form-label'>Exam ID</label>
                <input className='form-control' type="number" value={examId} onChange={handleExamId} placeholder='Exam ID' />
            </div>
            {/* <div className="my-3" style={{overflowY: 'auto', maxHeight: '400px'}}> */}
            {questions.map((question, questionIndex) => (
                <div className='card p-3 my-3' key={'q' + questionIndex}>
                    <div className="mb-2">
                        <label className='form-label'>Question {questionIndex + 1}:</label>
                        <input className='form-control' type="text" value={question.question} onChange={(e) => handleQuestionChange(e, questionIndex)} />
                    </div>
                    <div className="my-2">
                        <label className='form-label'>Question Type</label>
                        <select className="form-select" aria-label="Select Question Type" value={question.type} onChange={e => handleType(e, questionIndex)}>
                            <option value="">-- Select --</option>
                            <option value="mcq">Multi Choice</option>
                            <option value="maq">Multi Answer</option>
                            <option value="int">Integer</option>
                            <option value="dec">Decimal</option>
                            <option value="desc">Descriptive</option>
                        </select>
                    </div>
                    {(question.type == 'mcq' || question.type == 'maq') && <div className="row my-2">
                        {question.options.map((option, optionIndex) => (
                            <div className="col-md-3 mb-2" key={'o' + optionIndex + 'q' + questionIndex}>
                                <label className='form-label' htmlFor={'opt'+questionIndex}>Option {optionIndex + 1}: </label>
                                <input className='form-control' type="text" value={option} id={'opt'+questionIndex} onChange={(e) => handleOptionChange(e, questionIndex, optionIndex)} />
                            </div>
                        ))}
                        <div>
                            <button className='btn btn-primary mb-4' onClick={(e) => handleAddOption(questionIndex)}>+ Add Option</button>
                        </div>
                    </div>}
                    {question.type != 'desc' && <div className="my-2">
                        <label className='form-label'>Correct Answer: </label>
                        {question.type == 'mcq' && question.answers.map((answer, answerIndex) => (
                            <div className="" key={'o' + answerIndex + 'q' + questionIndex}>
                                <input className='form-radio' name={'q' + questionIndex} id={'o' + answerIndex + 'q' + questionIndex} type="radio" checked={answer} onChange={(e) => handleAnswerChange(e, questionIndex, answerIndex)} />
                                &nbsp;<label className='form-label' htmlFor={'o' + answerIndex + 'q' + questionIndex}>Option {answerIndex + 1} </label>
                            </div>
                        ))}
                        {question.type == 'maq' && question.answers.map((answer, answerIndex) => (
                            <div className="" key={'o' + answerIndex + 'q' + questionIndex}>
                                <input className='form-check' name={'q' + questionIndex} id={'o' + answerIndex + 'q' + questionIndex} type="checkbox" checked={answer} onChange={(e) => handleAnswerChange(e, questionIndex, answerIndex, true)} />
                                &nbsp;<label className='form-label' htmlFor={'o' + answerIndex + 'q' + questionIndex}>Option {answerIndex + 1} </label>
                            </div>
                        ))}
                        {(question.type == 'int' || question.type == 'dec') && <div className="">
                            <input className='form-control' type="number" value={question.answer} onChange={(e) => handleNumberAnswerChange(e, questionIndex)} />
                        </div>}
                    </div>}
                    <div className='row'>
                        <div className="col-md-3">
                            <label className='form-label' htmlFor={'marks'+questionIndex}>Marks: </label>
                            <input className='form-control' type="text" value={question.marks} onChange={(e) => handleMarksChange(e, questionIndex)} min={1} max={4} id={'marks'+questionIndex} />
                        </div>
                    </div>
                    <button className='btn btn-outline-dark' disabled={questions.length<=1} onClick={e => deleteQuestion(e, questionIndex)} style={{position: 'absolute', right: '15px', bottom: '15px'}} aria-label='Delete'>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ))}
            {/* </div> */}
            <button className='btn btn-primary mb-4 mx-2' onClick={handleAddQuestion}>+ Add Question</button>
            <button className='btn btn-primary mb-4 mx-2' onClick={handleSubmit}>Submit</button>
        </div>
        <div className="container pb-3">
            <h3>Exam Details</h3>
            <div className="mb-3 card p-3">
                <div className="row">
                    <div className="my-2">
                        <label>Exam Name:</label>
                        <input className='form-control' type="text" name="name" value={examDetails.name} onChange={handleExamDetailsChange} />
                    </div>
                    <div className="my-2 col-md-3">
                        <label>Date:</label>
                        <input className='form-control' type="date" name="date" value={examDetails.date} onChange={handleExamDetailsChange} />
                    </div>
                    <div className="my-2 col-md-3">
                        <label>Start Time:</label>
                        <input className='form-control' type="time" name="startTime" value={examDetails.startTime} onChange={handleExamDetailsChange} />
                    </div>
                    <div className="my-2 col-md-3">
                        <label>End Time:</label>
                        <input className='form-control' type="time" name="endTime" value={examDetails.endTime} onChange={handleExamDetailsChange} />
                    </div>
                    <div className="my-2 col-md-3">
                        <label>Total Time:</label>
                        <input className='form-control' type="text" name="totalTime" value={examDetails.totalTime} onChange={handleExamDetailsChange} />
                    </div>
                </div>
                <div className="my-2">
                    <label>Subjects:</label>
                    <div className='row px-3'>
                        {examDetails.subjects.map((subject, index) => (
                            <div className='card p-3 my-3 me-3 col-md-3' key={index}>
                                <div className="my-2">
                                    <label>Subjects Name:</label>
                                    <input className='form-control' type="text" name="name" value={subject.name} onChange={(e) => handleSubjectChange(e, index)} />
                                </div>
                                <div className="my-2">
                                    <label>Length:</label>
                                    <input className='form-control' type="number" name="length" value={subject.length} onChange={(e) => handleSubjectChange(e, index)} />
                                </div>
                                <div className="my-2">
                                    <label>Start:</label>
                                    <input className='form-control' type="number" name="start" value={subject.start} onChange={(e) => handleSubjectChange(e, index)} />
                                </div>
                                <div className="my-2">
                                    <label>End:</label>
                                    <input className='form-control' type="number" name="end" value={subject.end} onChange={(e) => handleSubjectChange(e, index)} />
                                </div>
                            </div>

                        ))}
                    </div>
                    <button className='btn btn-primary' onClick={addSubject}>+ Add Subject</button>
                </div>
            </div>
        </div>
    </div>)
}

export default New
