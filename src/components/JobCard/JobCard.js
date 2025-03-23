import React from "react";

// styles
import "./JobCard.css";

const FilterTag = ({ label, onClick }) => (
  <div className="filter-tag" onClick={onClick}>
    {label}
  </div>
);

const JobCard = ({ job, addFilter, isDesktop }) => {
  const {
    logo,
    company,
    position,
    postedAt,
    contract,
    location,
    role,
    level,
    languages = [],
    tools = [],
    featured,
    new: isNew,
  } = job;

  return (
    <div className={`card ${featured ? "featured-card" : ""} space-between`}>
      <div className={isDesktop ? "flex-row" : ""}>
        <div className="company-logo-container">
          <img src={logo} alt={`${company} logo`} className="company-logo" />
        </div>
        <div>
          <div className="flex-row">
            <h2 className="company-name">{company}</h2>
            {isNew && <div className="main-tag new-tag">NEW!</div>}
            {featured && <div className="main-tag featured-tag">FEATURED</div>}
          </div>
          <h1>{position}</h1>
          <span>
            {postedAt} • {contract} • {location}
          </span>
        </div>
      </div>

      {!isDesktop && <div className="divider" />}

      <div className={isDesktop ? "flex-row" : "flex-wrap"}>
        <FilterTag label={role} onClick={() => addFilter(role)} />
        <FilterTag label={level} onClick={() => addFilter(level)} />
        {languages.map((lang) => (
          <FilterTag key={lang} label={lang} onClick={() => addFilter(lang)} />
        ))}
        {tools.map((tool) => (
          <FilterTag key={tool} label={tool} onClick={() => addFilter(tool)} />
        ))}
      </div>
    </div>
  );
};

export default JobCard;
