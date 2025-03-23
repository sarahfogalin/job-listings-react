import React from "react";

// styles
import "./FiltersCard.css";

const SelectedFilter = ({ label, onRemove }) => (
  <div className="selected-filter">
    {label}
    <span className="delete-button" onClick={onRemove}>
      <img src="/images/icon-remove.svg" alt="delete" className="delete-icon" />
    </span>
  </div>
);

const FiltersCard = ({ filters, removeFilter, clearFilters }) => {
  return (
    <div className="filter-card card">
      <div className="flex-wrap">
        {filters?.map((filter) => (
          <SelectedFilter
            key={filter}
            label={filter}
            onRemove={() => removeFilter(filter)}
          />
        ))}
      </div>
      <div className="clear-button" onClick={clearFilters}>
        Clear
      </div>
    </div>
  );
};

export default FiltersCard;
