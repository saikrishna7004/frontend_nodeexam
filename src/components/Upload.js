import React, { useState } from 'react'

const Upload = () => {

    const [file, setFile] = useState(null);
    const [examId, setExamId] = useState(0)

    const handleChange = (e) => {
        setFile(e.target.files[0]);
        console.log('File in handle change', file)
    };

    const handleChangeInput = (e) => {
        setExamId(e.target.value)
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('examId', examId);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            console.log(res)
            const data = res.json()
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container my-3">
            <h1>Upload Question Paper</h1>
            <hr />
            <div className="mb-3">
                <label htmlFor="examId" className="form-label">Exam ID</label>
                <input type="number" className="form-control" id="examId" name="examId" value={examId} onChange={handleChangeInput} />
            </div>
            <div className="mb-3">
                <label htmlFor="qpaperFile" className="form-label">Question Paper File (Pre-formatted)</label>
                <input className="form-control" type="file" id="qpaperFile" name="qpaperFile" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-outline-primary" onClick={handleUpload}>Upload and Submit</button>
            </div>
        </div>
    )
}

export default Upload
