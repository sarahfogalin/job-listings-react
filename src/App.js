import React, { useEffect, useState } from "react";

// styles
import "./App.css";

// components
import JobCard from "./JobCard/JobCard.js";
import FiltersCard from "./FiltersCard/FiltersCard.js";

// data
import jobData from "./data.json";

export const MAX_MOBILE_SCREEN = 768;

const App = () => {
  const [jobList, setJobList] = useState([]);
  const [filters, setFilters] = useState([]);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const isDesktop = dimensions.width > MAX_MOBILE_SCREEN ? true : false;

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    const filterJobList = () => {
      const newList = jobData.filter(({ role, level, tools, languages }) => {
        if (filters.length === 0) {
          return true;
        }
  
        const allTags = [role, level];
        if (tools) {
          allTags.push(...tools);
        }
        if (languages) {
          allTags.push(...languages);
        }
  
        return filters.every((filter) => allTags.includes(filter));
      });
  
      setJobList(newList);
    };
    filterJobList();
  }, [filters]);

  useEffect(() => {
    setJobList(jobData);
  }, []);

  const addFilter = (filter) => {
    const exists = filters.find((f) => f === filter);
    if (!exists) {
      const newFilters = [...filters, filter];
      setFilters(newFilters);
    } else {
      return;
    }
  };

  const removeFilter = (filter) => {
    const exists = filters.find((f) => f === filter);
    if (exists) {
      const newFilters = filters.filter((f) => f !== filter);
      setFilters(newFilters);
    } else {
      return;
    }
  };

  const clearFilters = () => {
    setFilters([]);
  };

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
        {filters.length > 0 && (
          <div className="filter-container">
            <FiltersCard
              filters={filters}
              removeFilter={removeFilter}
              clearFilters={clearFilters}
            />
          </div>
        )}
        {isDesktop && filters.length === 0 && <div className="spacer" />}
        {jobList.length > 0 &&
          jobList.map((job) => {
            return (
              <JobCard
                job={job}
                addFilter={addFilter}
                isDesktop={isDesktop}
                key={job.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default App;
