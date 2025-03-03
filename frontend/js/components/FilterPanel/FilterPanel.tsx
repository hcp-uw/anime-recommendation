import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import StaffInput from "./StaffInput";
import {Filters} from "../../types/filters";

const FilterPanel = () => {
  const [filters, setFilters] = useState<Filters>({
    genres: [],
    staff: [],
    companies: [],
    malScore: { min: 1, max: 10 },
    members: "",
    date: "",
    status: "",
    type: "",
    length: "",
  });

  const handleChange = (key: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    console.log("Applied Filters:", filters);
    // Add logic to apply filters here
  };

  return (
    <div className="p-3" style={{ backgroundColor: "#e6f7ff", borderRadius: "8px" }}>
      <h5>Filters</h5>
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
                    "genres",
                    e.target.checked
                      ? [...filters.genres, genre]
                      : filters.genres.filter((g) => g !== genre)
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
            <StaffInput />
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
              value={filters.malScore}
              onChange={(e) => handleChange("malScore", Number(e.target.value))}
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
              value={filters.members}
              onChange={(e) => handleChange("members", e.target.value)}
            />
          </Accordion.Body>
        </Accordion.Item>

        {/* Date */}
        <Accordion.Item eventKey="5">
          <Accordion.Header>Date</Accordion.Header>
          <Accordion.Body>
            <Form.Control
              type="date"
              value={filters.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </Accordion.Body>
        </Accordion.Item>

        {/* Status */}
        <Accordion.Item eventKey="6">
          <Accordion.Header>Status</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              value={filters.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="">Select status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        {/* Type */}
        <Accordion.Item eventKey="7">
          <Accordion.Header>Type</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              value={filters.type}
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value="">Select type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        {/* Length */}
        <Accordion.Item eventKey="8">
          <Accordion.Header>Length</Accordion.Header>
          <Accordion.Body>
            <Form.Control
              type="number"
              placeholder="Enter length (minutes)"
              value={filters.length}
              onChange={(e) => handleChange("length", e.target.value)}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Apply Button */}
      <div className="mt-3 text-center">
        <Button variant="primary" onClick={applyFilters}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
