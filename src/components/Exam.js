import { faClock } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Navigate } from 'react-router-dom'
import '../Exam.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Exam = ({ token }) => {
	if (!token) return <Navigate to={'/login'} />
	else{
		console.log("object")
	}
	return (
		<div>
			<div className="container my-3">
				<h1>Select an exam to attempt</h1>
			</div>

			<div className="container border p-0">
				<div className="card-header">
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a className="nav-link active" aria-current="true" href="#">Active</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Link</a>
						</li>
						<li className="nav-item">
							<a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
						</li>
					</ul>
				</div>

				{/* {% if allexams|length %} */}

				<div className="container p-3">

					{/* <!-- Tabs List --> */}
					<div className="container p-0">
						<div className="container border">
							<h6 className="sorting m-0 p-1">Exam</h6>
						</div>
						<div className="container p-2 border" style={{backgroundColor: '#fff'}}>

							{/* {% for exams in allexams %} */}

							{/* <!-- Test div --> */}


							<hr className="" />

								{/* <!-- Test tr --> */}
								<div id="takeExamId{{exams.examid}}">

									<div className="box-card" style={{borderRadius: 0}}>
										<div className="row">
											<div className="col-md-2 col-sm-3 col-xs-4">
												<div className="box-date text-center" style={{borderRadius: 0}}>
													<ul>
														<li className="t-date"><span> 17 </span>
														</li>
														<li className="t-month"><span> JAN 2023 </span></li>
													</ul>
												</div>
											</div>
											<div className="col-md-6 col-sm-6 col-xs-8">
												<div className="box-subject">
													<ul>
														<li className="t-subject"><span className="left"> Jee Test Exam </span> <span
															className="t-time" style={{color: "red"}}>&nbsp;<FontAwesomeIcon icon={faClock} /><span>&nbsp;180 min </span></span>
														</li>
														<li className="t-time"><span style={{color: "green"}}>
															<FontAwesomeIcon icon={faClock} /><span>&nbsp;9:00 am  -&nbsp; </span>
														</span> <span style={{color: "red"}}><FontAwesomeIcon icon={faClock} /><span
															style={{color: "red"}}> 12:00 pm </span></span>
														</li>
													</ul>

												</div>
											</div>
											<div className="col-md-4 col-sm-3">
												<div className="box-button">
													{/* {% if exams.status == "ns" %} */}
													<button type="button" className="btn-guest pull-right"
														id="getStartExamButtonId{{exams.examid}}" style={{borderRadius: 0}}
														onClick="openInstructionsPage('{{exams.examid}}','getStartExamButtonId{{exams.examid}}','takeExamId{{exams.examid}}')">TAKE
														EXAM</button>
													{/* {% elif exams.status == "started" %} */}
													{/* <button type="button" className="btn-guest pull-right"
														id="getStartExamButtonId{{exams.examid}}" style={{borderRadius: 0, color: 'red'}}
														onClick="openInstructionsPage('{{exams.examid}}','getStartExamButtonId{{exams.examid}}','takeExamId{{exams.examid}}')">RESUME
														EXAM</button> */}
													{/* {% elif exams.status == "completed" %} */}
													{/* <button type="button" className="btn-guest pull-right" disabled
														id="getStartExamButtonId{{exams.examid}}" style={{borderRadius: 0}}>EXAM
														COMPLETED</button> */}
													{/* {% else %} */}
													{/* {% endif %} */}

												</div>

												<form id="formid{{exams.examid}}">
													{/* {% csrf_token %} */}
												</form>

											</div>
										</div>
									</div>
								</div>
								{/* <!-- End Test tr --> */}

								{/* <!-- End Card --> */}

								{/* <!-- End Test Div --> */}
								{/* {% endfor %} */}

						</div>
					</div>
				</div>

				{/* {% else %} */}
				<div className="alert alert-primary" role="alert">
					No Exams scheduled for Today
				</div>
				{/* {% endif %} */}

			</div>
		</div>
	)
}

export default Exam
