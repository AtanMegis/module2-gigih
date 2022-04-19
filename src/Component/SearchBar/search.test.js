import React from "react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import config from "../../lib/config";
import TrackWrapper from "../Tracks";
import { wait } from "@testing-library/user-event/dist/utils";

const requestOptions = {
    headers: {
        Authorization: "Bearer " + "BQDsBghZDQI1VorVynZOhx-_bcrcSTwJJfV9X1cPkEpNFY8Rv9Xih5U3d9I4S9zhDN86eHIdttSCqkR7kESXZgXA2YsTiNnUdiTwqzm6tU0GWhqwanHyAEPp8KGLfKndDK3NtWbdWiW1ToayWN1TDHDPhRb-M8w9C24cLnpFup1e3A"
        ,
        "Content-Type": "application/json",
    }
}

const server = setupServer(
    rest.get(
        `${config.SPOTIFY_BASE_URL}/search?type=track&q`,
        requestOptions, (req, res, ctx) => {
            return res(
                ctx.status(200)
            )
        }
    )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and display song', async () => {
    render(<TrackWrapper />)
    await wait(() => {
        expect
            (screen.getByTestId("searchTrackwrapper")).toBeInTheDocument()
    })
})

