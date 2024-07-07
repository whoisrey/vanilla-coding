import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

test("Loading component should show text prop", () => {
  const TEXT = "hello world";

  render(<Loading text={TEXT} />);
  expect(screen.getByText(TEXT)).toBeInTheDocument();
});
