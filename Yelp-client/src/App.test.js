import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it("should have exact heading", () => {
    /* Rendering the App component. */
    render(<App />);

    /* Getting the element with the test id of "app-header-heading". */
    const mainHeading = screen.getByTestId("app-header-heading");

    /* Checking that the innerHTML of the element with the test id of "app-header-heading" is equal to
    "Productivity Tracker". */
    expect(mainHeading.innerHTML).toBe("Restaurant Finder");
});