import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from "react-router-dom";
import UniversityTable from ".";

describe("UniversityTable", () => {
  const universities = [
    {
      name: "University A",
      country: "Country A",
      web_pages: ["https://example.com/universityA"],
    },
    {
      name: "University B",
      country: "Country B",
      web_pages: ["https://example.com/universityB"],
    },
  ];

  const handleDelete = jest.fn();

  it("renders universities correctly", () => {
    render(
      <Router>
        <UniversityTable universities={universities} handleDelete={handleDelete} />
      </Router>
    );

    const universityList = screen.getByTestId("university-list");
    expect(universityList).toBeInTheDocument();

    universities.forEach((uni) => {
        expect(screen.getByText(uni.name)).toBeInTheDocument();
    });   
  });

  it("calls handleDelete when delete button is clicked", () => {
    render(
      <Router>
        <UniversityTable universities={universities} handleDelete={handleDelete} />
      </Router>
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    deleteButtons.forEach((button, index) => {
      fireEvent.click(button);
      expect(handleDelete).toHaveBeenCalledWith(universities[index].web_pages[0]);
    });
  });
});
