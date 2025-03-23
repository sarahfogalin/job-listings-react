import React, { useEffect, useState, useCallback, useMemo } from "react";

// styles
import "./App.css";

// components
import JobCard from "./components/JobCard/JobCard.js";
import FiltersCard from "./components/FiltersCard/FiltersCard.js";

// data
import jobData from "./data.json";

// Define mobile screen breakpoint
export const MAX_MOBILE_SCREEN = 991;

const App = () => {
  // State to manage job listings, selected filters
  const [jobList, setJobList] = useState([]);
  const [filters, setFilters] = useState([]);

  // State to track window dimensions for responsive design
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  // Determine if screen is desktop
  const isDesktop = useMemo(
    () => dimensions.width > MAX_MOBILE_SCREEN,
    [dimensions.width]
  );

  // Handle resize and update dimensions
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

  // Filter job listings based on selected filters
  const filteredJobList = useMemo(() => {
    return jobData.filter(({ role, level, tools, languages }) => {
      if (filters.length === 0) return true;
      const allTags = [role, level, ...(tools || []), ...(languages || [])];
      return filters.every((filter) => allTags.includes(filter));
    });
  }, [filters]);

  // Update job list when filters change
  useEffect(() => {
    setJobList(filteredJobList);
  }, [filteredJobList]);

  // Add a new filter if not already applied
  const addFilter = useCallback(
    (filter) => {
      if (!filters.includes(filter)) {
        setFilters((prev) => [...prev, filter]);
      }
    },
    [filters]
  );

  // Remove specified filter
  const removeFilter = useCallback((filter) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters([]);
  }, []);

  // Render filter selection UI if filters are applied
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

  // Render list of job postings
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
      {/* Responsive background image based on screen size */}
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
