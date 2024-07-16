import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./../src/App";

test("renderizza il componente Sensorario", () => {
  render(<App />);
  const element = screen.getByText(/code2image/);
  expect(element).toBeInTheDocument();
});
