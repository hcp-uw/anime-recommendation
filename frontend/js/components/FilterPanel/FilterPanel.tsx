import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import StaffInput from "./StaffInput";
import { Filters } from "../../types/filters";
import { animeStatuses, animeTypes, AnimeStatus, AnimeType } from "../../types/filters";


const FilterPanel = () => {
  const [filters, setFilters] = useState<Filters>({
    included_genres: [],
    excluded_genres: [],
    staff: [],
    companies: [],
    malScore: { min: -Infinity, max: Infinity },
    members: { min: -Infinity, max: Infinity },
    airing_date: { earliest_start: "", latest_start: "" },
    status: "All Statuses",
    type: "All Types",
    episode_count: { min: -Infinity, max: Infinity },
  });

  const handleChange = (key: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    // Build the applied filters object by excluding default/invalid values
    const appliedFilters: Partial<Filters> = {};

    if (filters.included_genres.length > 0) {
      appliedFilters.included_genres = filters.included_genres;
    }

    if (filters.excluded_genres.length > 0) {
      appliedFilters.excluded_genres = filters.excluded_genres;
    }

    if (filters.staff.length > 0) {
      appliedFilters.staff = filters.staff;
    }

    if (filters.companies.length > 0) {
      appliedFilters.companies = filters.companies;
    }

    if (filters.malScore.min !== -Infinity || filters.malScore.max !== Infinity) {
      appliedFilters.malScore = filters.malScore;
    }

    if (filters.members.min !== -Infinity || filters.members.max !== Infinity) {
      appliedFilters.members = filters.members;
    }

    if (filters.airing_date.earliest_start || filters.airing_date.latest_start) {
      appliedFilters.airing_date = filters.airing_date;
    }

    if (filters.status && filters.status !== "All Statuses") {
      appliedFilters.status = filters.status;
    }

    if (filters.type && filters.type !== "All Types") {
      appliedFilters.type = filters.type;
    }

    if (
      filters.episode_count.min !== -Infinity ||
      filters.episode_count.max !== Infinity
    ) {
      appliedFilters.episode_count = filters.episode_count;
    }

    console.log("Applied Filters:", appliedFilters);
  };

  return (
    <div
    className="filter-panel bg-filter-bg-c border-filter-border-c tz"
    >
      <h5 className="text-offbase-black">Filters</h5>
      <Accordion>
        {/* Genre, Tags */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Genre, Tags</Accordion.Header>
          <Accordion.Body>
            {["Action", "Adventure", "Comedy", "Drama"].map((genre) => (
              <Form.Check
                key={genre}
                type="checkbox"
                label={genre}
                onChange={(e) =>
                  handleChange(
                    "included_genres",
                    e.target.checked
                      ? [...filters.included_genres, genre]
                      : filters.included_genres.filter((g) => g !== genre)
                  )
                }
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Staff */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Staff</Accordion.Header>
          <Accordion.Body>
            <StaffInput
              onChange={(updatedStaff) =>
                handleChange("staff", updatedStaff)
              }
            />
          </Accordion.Body>
        </Accordion.Item>

        {/* Companies */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Companies</Accordion.Header>
          <Accordion.Body>
            {["Studio Ghibli", "Madhouse", "Bones"].map((company) => (
              <Form.Check
                key={company}
                type="checkbox"
                label={company}
                onChange={(e) =>
                  handleChange(
                    "companies",
                    e.target.checked
                      ? [...filters.companies, company]
                      : filters.companies.filter((c) => c !== company)
                  )
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
              type="number"
              min="1"
              max="10"
              value={filters.malScore.min === -Infinity ? "" : filters.malScore.min}
              placeholder="No minimum"
              onChange={(e) =>
                handleChange("malScore", {
                  ...filters.malScore,
                  min:
                    e.target.value === ""
                      ? -Infinity
                      : Number(e.target.value),
                })
              }
            />
            <Form.Label>Maximum MAL Score (1-10)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="10"
              value={filters.malScore.max === Infinity ? "" : filters.malScore.max}
              placeholder="No maximum"
              onChange={(e) =>
                handleChange("malScore", {
                  ...filters.malScore,
                  max:
                    e.target.value === ""
                      ? Infinity
                      : Number(e.target.value),
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
              type="number"
              placeholder="Enter minimum members"
              value={filters.members.min === -Infinity ? "" : filters.members.min}
              onChange={(e) =>
                handleChange("members", {
                  ...filters.members,
                  min:
                    e.target.value === ""
                      ? -Infinity
                      : Number(e.target.value),
                })
              }
            />
            <Form.Control
              type="number"
              placeholder="Enter maximum members"
              value={filters.members.max === Infinity ? "" : filters.members.max}
              onChange={(e) =>
                handleChange("members", {
                  ...filters.members,
                  max:
                    e.target.value === ""
                      ? Infinity
                      : Number(e.target.value),
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
                value={filters.airing_date.earliest_start}
                onChange={(e) =>
                  handleChange("airing_date", {
                    ...filters.airing_date,
                    earliest_start: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Latest End Date</Form.Label>
              <Form.Control
                type="date"
                value={filters.airing_date.latest_start}
                onChange={(e) =>
                  handleChange("airing_date", {
                    ...filters.airing_date,
                    latest_start: e.target.value,
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
             onChange={(e) => handleChange("status", e.target.value as AnimeStatus)}
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
              onChange={(e) => handleChange("type", e.target.value as AnimeType)}
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
              type="number"
              placeholder="Enter minimum length (minutes)"
              value={
                filters.episode_count.min === -Infinity ? "" : filters.episode_count.min
              }
              onChange={(e) =>
                handleChange("episode_count", {
                  ...filters.episode_count,
                  min:
                    e.target.value === ""
                      ? -Infinity
                      : Number(e.target.value),
                })
              }
            />
            <Form.Control
              type="number"
              placeholder="Enter maximum length (minutes)"
              value={
                filters.episode_count.max === Infinity ? "" : filters.episode_count.max
              }
              onChange={(e) =>
                handleChange("episode_count", {
                  ...filters.episode_count,
                  max:
                    e.target.value === ""
                      ? Infinity
                      : Number(e.target.value),
                })
              }
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Apply Button */}
      <div className="mt-3 text-center">
        <Button className="bg-button-c text-offbase-white"
        variant="primary" onClick={applyFilters}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
