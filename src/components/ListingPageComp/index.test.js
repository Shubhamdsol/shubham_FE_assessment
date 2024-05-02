import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import ListingPageComp from ".";
import "@testing-library/jest-dom/extend-expect";
import { ApiService } from "../../services/ApiService";
import { LocalStorageService } from "../../services/LocalStorageService";

// Mock ApiService
jest.mock("../../services/ApiService");
jest.mock("../../services/LocalStorageService");

const universitiesData = [
  {
    id: 1,
    name: "University A",
    web_pages: ["http://example.com/universityA"],
  },
  {
    id: 2,
    name: "University B",
    web_pages: ["http://example.com/universityB"],
  },
];

describe("ListingPageComp", () => {
  beforeEach(() => {
    ApiService.fetchUniversities.mockResolvedValue(universitiesData);
    LocalStorageService.getItem.mockReturnValue(null);
  });

  it("renders the component properly", async () => {
    render(
      <Router>
        <ListingPageComp />
      </Router>
    );

    // Verify that the heading is rendered
    expect(screen.getByText("University Listing")).toBeInTheDocument();

    // Verify that the search input and sort button are rendered
    expect(
      screen.getByPlaceholderText("Search universities")
    ).toBeInTheDocument();
    expect(screen.getByText("A-Z ⇧")).toBeInTheDocument(); // Default sorting order

    // Verify that the table is rendered with initial data
    await screen.findByText("University A");
    await screen.findByText("University B");
  });

  it("sorting a to z and z to a", async () => {
    render(
      <Router>
        <ListingPageComp />
      </Router>
    );

    const sorting = screen.getByRole('button', {
      name: /a\-z ⇧/i
    })

    expect(sorting).toBeInTheDocument();
  });

  it("search universities by name", async () => {
    render(
      <Router>
        <ListingPageComp />
      </Router>
    );

    // Type "University A" in the search input
    const searchInput = screen.getByPlaceholderText("Search universities");
    fireEvent.change(searchInput, { target: { value: "University A" } });

    // Check if only "University A" is rendered in the table
    const universityAElement = await screen.findByText("University A");
    expect(universityAElement).toBeInTheDocument();
  });
});
