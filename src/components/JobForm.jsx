import React from "react";
import MailApplyForm from "./MailApplyForm";

function JobForm({ closeForm }) {
  return (
    <>
      <div className="inner">
        <div className="close" onClick={closeForm}>
          <img src="close.png" alt="" />
        </div>
        <div className="contents">
          <div className="top">
            <h3>Apply For a job</h3>
            <p>
              Job applicants will be responded to by email.
              <br />
              Thank you.
            </p>
            <p className="notice-txt">* MANDATORY FIELDS</p>
          </div>
          <div className="bottom">
            {/* <MailForm closeForm={closeForm} /> */}
            <MailApplyForm closeForm={closeForm} />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobForm;
