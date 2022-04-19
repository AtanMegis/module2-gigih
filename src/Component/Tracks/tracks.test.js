import React from 'react';
import TrackWrapper from './index';
import { render, screen } from "@testing-library/react";


it("render tracks page", () => {
    render(
        <TrackWrapper />
    );
    const track = screen.getByTestId("SearchTrackwrapper");
    expect(track).toBeInTheDocument();
})