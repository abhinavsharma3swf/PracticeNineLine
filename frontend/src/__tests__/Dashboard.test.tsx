import {render, screen} from "@testing-library/react";
import {Dashboard} from "../components/Dashboard.tsx";
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import NineLine from "../components/NineLine.tsx";
import {userEvent} from "@testing-library/user-event";
import {expect} from "vitest";

describe('Dashboard', () => {

    it('should display the buttons on the dashboard', () => {

        render(<Dashboard/>);
        expect(screen.getByRole('button', {name:"New Nine Line"})).toBeVisible();
        expect(screen.getByRole('button', {name:"Fetch All Nine Line"})).toBeVisible();
    });

    it('should navigate to the nine line submission page after clicking the new nine line request', async () => {
        //That's how you mock the router
        render(
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/submit" element={<NineLine />} />
            </Routes>
        </MemoryRouter>
        )
        const button = screen.getByRole('button', {name:"New Nine Line"});
        // console.log(screen.getAllByRole('button', { name: /new nine line/i }).length);

        expect(button).toBeVisible();
        await userEvent.click(button);
        screen.debug();
        expect(await screen.findByRole('heading')).toBeVisible();
    });
});