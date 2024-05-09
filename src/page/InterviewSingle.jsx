import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import interviewerData from "../backend/InterviewData";
import { motion } from "framer-motion";
import Error from "../components/Error";
import ToTopBtn from "../components/ToTopBtn";

function InterviewSingle() {
  const fadeUpAnimation = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  const { id } = useParams();

  const interviewer = interviewerData.find((interviewer) => interviewer.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!interviewer) {
    return <Error />;
  }

  return (
    <>
      <div className="interview-single">
        <div className="container">
          <div className="member-top-div">
            <div className="member-top-left">
              <motion.h2 className="interview-number" variants={fadeUpAnimation} initial="hidden" animate="visible" exit="hidden">
                {interviewer.no}
              </motion.h2>
            </div>
            <motion.div className="member-top-right" variants={fadeUpAnimation} initial="hidden" animate="visible" exit="hidden">
              <p className="member-name">{interviewer.name}</p>
              <p className="member-join-date">
                <span className="member-position">{interviewer.position}</span>
                <span className="joined-date">{interviewer.date}</span>
              </p>
            </motion.div>
          </div>
          <motion.div className="member-photo" variants={fadeUpAnimation} initial="hidden" animate="visible" exit="hidden">
            <img src={interviewer.mv_src} alt={interviewer.alt} />
          </motion.div>
          <motion.div className="ques-block" variants={fadeUpAnimation} initial="hidden" animate="visible" exit="hidden">
            <div className="member-about">
              <p>{interviewer.about}</p>
            </div>
            <div className="ques-card">
              <p className="member-question">{interviewer.q1}</p>
              <p className="member-answer">{interviewer.ans1}</p>
            </div>
            <div className="ques-card">
              <p className="member-question">{interviewer.q2}</p>
              <p className="member-answer">{interviewer.ans2}</p>
            </div>
            <div className="ques-card">
              <p className="member-question">{interviewer.q3}</p>
              <p className="member-answer">{interviewer.ans3}</p>
            </div>
            <motion.div className="member-photo2" variants={fadeUpAnimation} initial="hidden" animate="visible" exit="hidden">
              <img src={interviewer.mv_src} alt={interviewer.alt} />
            </motion.div>
            <div className="ques-card">
              <p className="member-question">{interviewer.q4}</p>
              <p className="member-answer">{interviewer.ans4}</p>
            </div>
            <div className="ques-card">
              <p className="member-question">{interviewer.q5}</p>
              <p className="member-answer">{interviewer.ans5}</p>
            </div>
            <div className="ques-card">
              <p className="member-question">{interviewer.q6}</p>
              <p className="member-answer">{interviewer.ans6}</p>
            </div>
          </motion.div>
        </div>
      </div>
      <ToTopBtn />
    </>
  );
}

export default InterviewSingle;
