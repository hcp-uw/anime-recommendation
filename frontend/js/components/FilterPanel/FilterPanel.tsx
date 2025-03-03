import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";

import {
  Filters,
  animeStatuses,
  animeTypes,
  AnimeStatus,
  AnimeType,
  FilterChange,
} from "../../types/filters";

import StaffInput from "./StaffInput";

const FilterPanel = () => {
  const [filters, setFilters] = useState<Filters>({
    includedGenres: [],
    excludedGenres: [],
    staff: [],
    companies: [],
    malScore: { min: -Infinity, max: Infinity },
    members: { min: -Infinity, max: Infinity },
    airingDate: { earliestStart: "", latestStart: "" },
    status: "All Statuses",
    type: "All Types",
    episodeCount: { min: -Infinity, max: Infinity },
  });

  const handleChange = (filterChange: FilterChange) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterChange.key]: filterChange.value,
    }));
  };

  const applyFilters = () => {
    // Build the applied filters object by excluding default/invalid values
    const appliedFilters: Partial<Filters> = {};

    if (filters.includedGenres.length > 0) {
      appliedFilters.includedGenres = filters.includedGenres;
    }

    if (filters.excludedGenres.length > 0) {
      appliedFilters.excludedGenres = filters.excludedGenres;
    }

    if (filters.staff.length > 0) {
      appliedFilters.staff = filters.staff;
    }

    if (filters.companies.length > 0) {
      appliedFilters.companies = filters.companies;
    }

    if (
      filters.malScore.min !== -Infinity ||
      filters.malScore.max !== Infinity
    ) {
      appliedFilters.malScore = filters.malScore;
    }

    if (filters.members.min !== -Infinity || filters.members.max !== Infinity) {
      appliedFilters.members = filters.members;
    }

    if (filters.airingDate.earliestStart || filters.airingDate.latestStart) {
      appliedFilters.airingDate = filters.airingDate;
    }

    if (filters.status && filters.status !== "All Statuses") {
      appliedFilters.status = filters.status;
    }

    if (filters.type && filters.type !== "All Types") {
      appliedFilters.type = filters.type;
    }

    if (
      filters.episodeCount.min !== -Infinity ||
      filters.episodeCount.max !== Infinity
    ) {
      appliedFilters.episodeCount = filters.episodeCount;
    }

    console.log("Applied Filters:", appliedFilters); // TODO: Make this actually filter instead of just logging the active filters
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
                filters.malScore.min === -Infinity ? "" : filters.malScore.min
              }
              onChange={(e) =>
                handleChange({
                  key: "malScore",
                  value: {
                    ...filters.malScore,
                    min:
                      e.target.value === ""
                        ? -Infinity
                        : Number(e.target.value),
                  },
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
                filters.malScore.max === Infinity ? "" : filters.malScore.max
              }
              onChange={(e) =>
                handleChange({
                  key: "malScore",
                  value: {
                    ...filters.malScore,
                    max:
                      e.target.value === "" ? Infinity : Number(e.target.value),
                  },
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
              value={
                filters.members.min === -Infinity ? "" : filters.members.min
              }
              onChange={(e) =>
                handleChange({
                  key: "members",
                  value: {
                    ...filters.members,
                    min:
                      e.target.value === ""
                        ? -Infinity
                        : Number(e.target.value),
                  },
                })
              }
            />
            <Form.Control
              placeholder="Enter maximum members"
              type="number"
              value={
                filters.members.max === Infinity ? "" : filters.members.max
              }
              onChange={(e) =>
                handleChange({
                  key: "members",
                  value: {
                    ...filters.members,
                    max:
                      e.target.value === "" ? Infinity : Number(e.target.value),
                  },
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
                value={filters.airingDate.earliestStart}
                onChange={(e) =>
                  handleChange({
                    key: "airingDate",
                    value: {
                      ...filters.airingDate,
                      earliestStart: e.target.value,
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Latest End Date</Form.Label>
              <Form.Control
                type="date"
                value={filters.airingDate.latestStart}
                onChange={(e) =>
                  handleChange({
                    key: "airingDate",
                    value: {
                      ...filters.airingDate,
                      latestStart: e.target.value,
                    },
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
                filters.episodeCount.min === -Infinity
                  ? ""
                  : filters.episodeCount.min
              }
              onChange={(e) =>
                handleChange({
                  key: "episodeCount",
                  value: {
                    ...filters.episodeCount,
                    min:
                      e.target.value === ""
                        ? -Infinity
                        : Number(e.target.value),
                  },
                })
              }
            />
            <Form.Control
              placeholder="Enter maximum number of episodes (inclusive)"
              type="number"
              value={
                filters.episodeCount.max === Infinity
                  ? ""
                  : filters.episodeCount.max
              }
              onChange={(e) =>
                handleChange({
                  key: "episodeCount",
                  value: {
                    ...filters.episodeCount,
                    max:
                      e.target.value === "" ? Infinity : Number(e.target.value),
                  },
                })
              }
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Apply Button */}
      <div className="mt-3 text-center">
        <Button
          className="bg-button-c text-offbase-white"
          variant="primary"
          onClick={applyFilters}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
