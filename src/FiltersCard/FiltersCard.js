import React from "react";

// styles
import "./FiltersCard.css";

const FiltersCard = ({ filters, removeFilter, clearFilters }) => {
  return (
    <div className="filter-card card">
      <div className="flex-wrap">
        {filters &&
          filters.map((filter) => {
            return (
              <div key={filter}>
                <div className="selected-filter">
                  {filter}
                  <span
                    className="delete-button"
                    onClick={() => removeFilter(filter)}
                  >
                    <img
                      src="/images/icon-remove.svg"
                      alt="delete"
                      className="delete-icon"
                    />
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <div className="clear-button" onClick={() => clearFilters()}>
        Clear
      </div>
    </div>
  );
};

export default FiltersCard;
