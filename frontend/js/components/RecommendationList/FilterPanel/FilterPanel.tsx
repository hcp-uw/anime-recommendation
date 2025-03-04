import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";

import { animeStatuses, animeTypes } from "../../../constants";
import { Filters, AnimeStatus, AnimeType, FilterChange } from "../../../types";

import StaffInput from "./StaffInput";

interface FilterPanelProps {
  onFilter: (filters: FilterChange[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<Filters>({
    includedGenres: [],
    excludedGenres: [],
    staff: [],
    companies: [],
    malScoreMin: -Infinity,
    malScoreMax: Infinity,
    memberMin: -Infinity,
    memberMax: Infinity,
    earliestAiringStart: null,
    latestAiringStart: null,
    status: "All Statuses",
    type: "All Types",
    episodeCountMin: -Infinity,
    episodeCountMax: Infinity,
  });

  const handleChange = (filterChange: FilterChange) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterChange.key]: filterChange.value,
    }));
  };

  const applyFilters = () => {
    // Build the applied filters array by excluding default/invalid values
    const appliedFilters: FilterChange[] = [];

    // Included Genres
    if (filters.includedGenres.length > 0) {
      appliedFilters.push({
        key: "includedGenres",
        value: filters.includedGenres,
      });
    }

    // Excluded Genres
    if (filters.excludedGenres.length > 0) {
      appliedFilters.push({
        key: "excludedGenres",
        value: filters.excludedGenres,
      });
    }

    // Staff
    if (filters.staff.length > 0) {
      appliedFilters.push({ key: "staff", value: filters.staff });
    }

    // Companies
    if (filters.companies.length > 0) {
      appliedFilters.push({ key: "companies", value: filters.companies });
    }

    // MAL Score
    if (filters.malScoreMin !== -Infinity) {
      appliedFilters.push({
        key: "malScoreMin",
        value: filters.malScoreMin,
      });
    }
    if (filters.malScoreMax !== Infinity) {
      appliedFilters.push({
        key: "malScoreMax",
        value: filters.malScoreMax,
      });
    }

    // Member Count
    if (filters.memberMin !== -Infinity) {
      appliedFilters.push({
        key: "memberMin",
        value: filters.memberMin,
      });
    }
    if (filters.memberMax !== Infinity) {
      appliedFilters.push({
        key: "memberMax",
        value: filters.memberMax,
      });
    }

    // Airing Start Date
    if (filters.earliestAiringStart !== null) {
      appliedFilters.push({
        key: "earliestAiringStart",
        value: filters.earliestAiringStart,
      });
    }
    if (filters.latestAiringStart !== null) {
      appliedFilters.push({
        key: "latestAiringStart",
        value: filters.latestAiringStart,
      });
    }

    // Status
    if (filters.status !== "All Statuses") {
      appliedFilters.push({ key: "status", value: filters.status });
    }

    // Type
    if (filters.type !== "All Types") {
      appliedFilters.push({ key: "type", value: filters.type });
    }

    // Episode Count
    if (filters.episodeCountMin !== -Infinity) {
      appliedFilters.push({
        key: "episodeCountMin",
        value: filters.episodeCountMin,
      });
    }
    if (filters.episodeCountMax !== Infinity) {
      appliedFilters.push({
        key: "episodeCountMax",
        value: filters.episodeCountMax,
      });
    }

    console.log("Applied Filters:", appliedFilters); // Log the applied filters for debugging
    onFilter(appliedFilters); // Pass the array of applied filters to onFilter function
  };

  // Clear all filters
  const resetFilters = () => {
    setFilters({
      includedGenres: [],
      excludedGenres: [],
      staff: [],
      companies: [],
      malScoreMin: -Infinity,
      malScoreMax: Infinity,
      memberMin: -Infinity,
      memberMax: Infinity,
      earliestAiringStart: null,
      latestAiringStart: null,
      status: "All Statuses",
      type: "All Types",
      episodeCountMin: -Infinity,
      episodeCountMax: Infinity,
    });

    onFilter([]); // Clear all filters in the parent component as well
  };

  return (
    <div className="filter-panel bg-filter-bg-c border-filter-border-c tz">
      <h5 className="text-offbase-black">Filters</h5>
      <Accordion>
        {/* Genre, Tags */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Genre, Tags</Accordion.Header>
          <Accordion.Body>
            {["Action", "Adventure", "Comedy", "Drama"].map((genre) => (
              <Form.Check
                key={genre}
                label={genre}
                type="checkbox"
                onChange={(e) =>
                  handleChange({
                    key: "includedGenres",
                    value: e.target.checked
                      ? [...filters.includedGenres, genre]
                      : filters.includedGenres.filter((g) => g !== genre),
                  })
                }
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Staff */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Staff</Accordion.Header>
          <Accordion.Body>
            <StaffInput staff={filters.staff} onChange={handleChange} />
          </Accordion.Body>
        </Accordion.Item>

        {/* Companies */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Companies</Accordion.Header>
          <Accordion.Body>
            {["Studio Ghibli", "Madhouse", "Bones"].map((company) => (
              <Form.Check
                key={company}
                label={company}
                type="checkbox"
                onChange={(e) =>
                  handleChange({
                    key: "companies",
                    value: e.target.checked
                      ? [...filters.companies, company]
                      : filters.companies.filter((c) => c !== company),
                  })
                }
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* MAL Score */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>MAL Score</Accordion.Header>
          <Accordion.Body>
            <Form.Label>Minimum MAL Score (1-10)</Form.Label>
            <Form.Control
              max="10"
              min="1"
              placeholder="No minimum"
              type="number"
              value={
                filters.malScoreMin === -Infinity ? "" : filters.malScoreMin
              }
              onChange={(e) =>
                handleChange({
                  key: "malScoreMin",
                  value:
                    e.target.value === "" ? -Infinity : Number(e.target.value),
                })
              }
            />
            <Form.Label>Maximum MAL Score (1-10)</Form.Label>
            <Form.Control
              max="10"
              min="1"
              placeholder="No maximum"
              type="number"
              value={
                filters.malScoreMax === Infinity ? "" : filters.malScoreMax
              }
              onChange={(e) =>
                handleChange({
                  key: "malScoreMax",
                  value:
                    e.target.value === "" ? Infinity : Number(e.target.value),
                })
              }
            />
          </Accordion.Body>
        </Accordion.Item>

        {/* Members */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>Members</Accordion.Header>
          <Accordion.Body>
            <Form.Control
              placeholder="Enter minimum members"
              type="number"
              value={filters.memberMin === -Infinity ? "" : filters.memberMin}
              onChange={(e) =>
                handleChange({
                  key: "memberMin",
                  value:
                    e.target.value === "" ? -Infinity : Number(e.target.value),
                })
              }
            />
            <Form.Control
              placeholder="Enter maximum members"
              type="number"
              value={filters.memberMax === Infinity ? "" : filters.memberMax}
              onChange={(e) =>
                handleChange({
                  key: "memberMax",
                  value:
                    e.target.value === "" ? Infinity : Number(e.target.value),
                })
              }
            />
          </Accordion.Body>
        </Accordion.Item>

        {/* Date */}
        <Accordion.Item eventKey="5">
          <Accordion.Header>Date</Accordion.Header>
          <Accordion.Body>
            <Form.Group>
              <Form.Label>Earliest Start Date</Form.Label>
              <Form.Control
                type="date"
                value={
                  filters.earliestAiringStart
                    ? filters.earliestAiringStart.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleChange({
                    key: "earliestAiringStart",
                    value: new Date(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Latest Start Date</Form.Label>
              <Form.Control
                type="date"
                value={
                  filters.latestAiringStart
                    ? filters.latestAiringStart.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleChange({
                    key: "latestAiringStart",
                    value: new Date(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>

        {/* Status */}
        <Accordion.Item eventKey="6">
          <Accordion.Header>Status</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              value={filters.status}
              onChange={(e) =>
                handleChange({
                  key: "status",
                  value: e.target.value as AnimeStatus,
                })
              }
            >
              {animeStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        {/* Type */}
        <Accordion.Item eventKey="7">
          <Accordion.Header>Type</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              value={filters.type}
              onChange={(e) =>
                handleChange({
                  key: "type",
                  value: e.target.value as AnimeType,
                })
              }
            >
              {animeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        {/* Length */}
        <Accordion.Item eventKey="8">
          <Accordion.Header>Length</Accordion.Header>
          <Accordion.Body>
            <Form.Control
              placeholder="Enter minimum number of episodes (inclusive)"
              type="number"
              value={
                filters.episodeCountMin === -Infinity
                  ? ""
                  : filters.episodeCountMin
              }
              onChange={(e) =>
                handleChange({
                  key: "episodeCountMin",
                  value:
                    e.target.value === "" ? -Infinity : Number(e.target.value),
                })
              }
            />
            <Form.Control
              placeholder="Enter maximum number of episodes (inclusive)"
              type="number"
              value={
                filters.episodeCountMax === Infinity
                  ? ""
                  : filters.episodeCountMax
              }
              onChange={(e) =>
                handleChange({
                  key: "episodeCountMax",
                  value:
                    e.target.value === "" ? Infinity : Number(e.target.value),
                })
              }
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* Apply Filters Button */}
      <div
        className="d-flex justify-content-center mt-3"
        style={{ gap: "10px" }}
      >
        <Button variant="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="secondary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
