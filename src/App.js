import React, { useEffect, useState, useCallback } from "react";

// styles
import "./App.css";

// components
import JobCard from "./JobCard/JobCard.js";
import FiltersCard from "./FiltersCard/FiltersCard.js";

// data
import jobData from "./data.json";

export const MAX_MOBILE_SCREEN = 991;

const App = () => {
  const [jobList, setJobList] = useState([]);
  const [filters, setFilters] = useState([]);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const isDesktop = dimensions.width > MAX_MOBILE_SCREEN;

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const filterJobList = useCallback(() => {
    const newList = jobData.filter(({ role, level, tools, languages }) => {
      if (filters.length === 0) return true;

      const allTags = [role, level, ...(tools || []), ...(languages || [])];
      return filters.every((filter) => allTags.includes(filter));
    });

    setJobList(newList);
  }, [filters]);

  useEffect(() => {
    filterJobList();
  }, [filters, filterJobList]);

  const addFilter = (filter) => {
    if (!filters.includes(filter)) {
      setFilters((prev) => [...prev, filter]);
    }
  };

  const removeFilter = (filter) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const renderFilters = () =>
    filters.length > 0 && (
      <div className="filter-container">
        <FiltersCard
          filters={filters}
          removeFilter={removeFilter}
          clearFilters={clearFilters}
        />
      </div>
    );

  const renderJobs = () =>
    jobList.length > 0 &&
    jobList.map((job) => (
      <JobCard
        key={job.id}
        job={job}
        addFilter={addFilter}
        isDesktop={isDesktop}
      />
    ));

  return (
    <div className="App">
      <img
        src={
          isDesktop
            ? "/images/bg-header-desktop.svg"
            : "/images/bg-header-mobile.svg"
        }
        alt="header"
        className="header-img"
      />
      <div className={`${filters.length > 0 ? "content-container" : ""}`}>
        {renderFilters()}
        {isDesktop && filters.length === 0 && <div className="spacer" />}
        {renderJobs()}
      </div>
    </div>
  );
};

export default App;
