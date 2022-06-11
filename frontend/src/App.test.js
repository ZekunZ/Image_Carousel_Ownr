import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("render Slider component, check if img is rendered on screen", async () => {
  const component = render(<App />);
  await waitFor(() => {
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});

test("toggle cats button changes its color", () => {
  const { getByTestId } = render(<App />);
  const catsBtn = getByTestId("cats-btn");
  fireEvent.click(catsBtn);
  expect(catsBtn.className).toBe("btnToggled");
  fireEvent.click(catsBtn);
  expect(catsBtn.className).toBe("btn");
});

test("toggle sharks button changes its color", () => {
  const { getByTestId } = render(<App />);
  const sharksBtn = getByTestId("sharks-btn");
  fireEvent.click(sharksBtn);
  expect(sharksBtn.className).toBe("btnToggled");
  fireEvent.click(sharksBtn);
  expect(sharksBtn.className).toBe("btn");
});

test("toggle both cats sharks button should display no photos", async () => {
  const { getByTestId } = render(<App />);
  const catsBtn = getByTestId("cats-btn");
  const sharksBtn = getByTestId("sharks-btn");
  fireEvent.click(catsBtn);
  fireEvent.click(sharksBtn);
  await waitFor(() => {
    expect(screen.getByText("No photo displayed")).toBeInTheDocument();
  });
});

test("clicking right arrow will display different img", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(() => {
    const firstImage = screen.getByRole("img").getAttribute("src");
    const rightArrow = screen.getByTestId("right-arrow");
    // click right arrow once
    fireEvent.click(rightArrow);
    const secondImage = screen.getByRole("img").getAttribute("src");
    expect(secondImage).not.toBe(firstImage);
  });
});

test("clicking left arrow will display different img", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(() => {
    const rightArrow = screen.getByTestId("right-arrow");
    // click right arrow twice
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);
    const firstImage = screen.getByRole("img").getAttribute("src");
    // click left arrow once
    const leftArrow = screen.getByTestId("left-arrow");
    fireEvent.click(leftArrow);
    const secondImage = screen.getByRole("img").getAttribute("src");
    expect(secondImage).not.toBe(firstImage);
  });
});
