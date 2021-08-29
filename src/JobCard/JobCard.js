import React from "react";

// styles
import "./JobCard.css";

const JobCard = ({ job, addFilter, isDesktop }) => {
  const bulletPoint = <span>&#8226;</span>;

  return (
    <div
      className={`card ${job.featured ? "featured-card" : ""} space-between`}
    >
      <div className={`${isDesktop ? "flex-row" : ""}`}>
        <div className="company-logo-container">
          <img src={job.logo} alt="logo" className="company-logo" />
        </div>
        <div>
          <div className="flex-row">
            <h2 className="company-name">{job.company}</h2>
            {job.new && <div className="main-tag new-tag">NEW!</div>}
            {job.featured && (
              <div className="main-tag featured-tag">FEATURED</div>
            )}
          </div>
          <h1>{job.position}</h1>
          <span>
            {job.postedAt} {bulletPoint} {job.contract} {bulletPoint}{" "}
            {job.location}
          </span>
        </div>
      </div>
      {!isDesktop && <div className="divider" />}
      <div className={`${isDesktop ? "flex-row" : "flex-wrap"}`}>
        {
          <div className="filter-tag" onClick={() => addFilter(job.role)}>
            {job.role}
          </div>
        }
        {
          <div className="filter-tag" onClick={() => addFilter(job.level)}>
            {job.level}
          </div>
        }
        {job.languages &&
          job.languages.map((language) => (
            <div
              className="filter-tag"
              key={language}
              onClick={() => addFilter(language)}
            >
              {language}
            </div>
          ))}
        {job.tools &&
          job.tools.map((tool) => (
            <div
              className="filter-tag"
              key={tool}
              onClick={() => addFilter(tool)}
            >
              {tool}
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobCard;
