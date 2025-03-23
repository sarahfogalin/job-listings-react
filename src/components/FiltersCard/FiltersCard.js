import React from "react";

// styles
import "./FiltersCard.css";

/**
 * Component representing a single selected filter with a remove option.
 *
 * @param {string} label - The filter label.
 * @param {Function} onRemove - Function to call when the filter is removed.
 */

const SelectedFilter = ({ label, onRemove }) => (
  <div className="selected-filter">
    {label}
    <span className="delete-button" onClick={onRemove}>
      <img src="/images/icon-remove.svg" alt="delete" className="delete-icon" />
    </span>
  </div>
);

/**
 * Component representing a card containing selected filters.
 *
 * @param {Array} filters - List of currently selected filters.
 * @param {Function} removeFilter - Function to remove a specific filter.
 * @param {Function} clearFilters - Function to clear all filters.
 */

const FiltersCard = ({ filters, removeFilter, clearFilters }) => {
  return (
    <div className="filter-card card">
      {/* Display selected filters */}
      <div className="flex-wrap">
        {filters?.map((filter) => (
          <SelectedFilter
            key={filter}
            label={filter}
            onRemove={() => removeFilter(filter)}
          />
        ))}
      </div>
      {/* Button to clear all filters */}
      <div className="clear-button" onClick={clearFilters}>
        Clear
      </div>
    </div>
  );
};

export default FiltersCard;
