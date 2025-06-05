import { render, screen} from "@testing-library/react";
import {Dashboard} from "../components/Dashboard.tsx";
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import NineLine from "../components/NineLine.tsx";
import {userEvent} from "@testing-library/user-event";
import {expect, it, vi} from "vitest";
import axios from "axios";

describe('Dashboard', () => {

    it('should display the buttons on the dashboard', () => {

        render(
            <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    );
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
        expect(await screen.findByRole('heading', {name: /welcome to the nine line reporting system/i})).toBeVisible();
    });

    it('should fetch all nine line and display it on the screen', async () => {
        vi.mock('axios');

        const mockData = [{
            line1: "line1",
            line2: 'line2',
            line3: 'line3',
            line4: 'line4',
            line5: 'line5',
        }];

        (axios.get as any).mockResolvedValue({data: mockData});
        render(
            <MemoryRouter>
                <Dashboard/>
            </MemoryRouter>
        )
        const fetchButton = screen.getByRole('button', {name:/fetch all nine line/i});
        await userEvent.click(fetchButton)
        screen.debug();
        expect( await screen.findByText('Nine Line Card')).toBeVisible();
    });

    it('should remove nineline card with soft delete set to true', async () => {
        vi.mock('axios');

        const mockData = [{
            line1: "line1",
            line2: 'line2',
            line3: 'line3',
            line4: 'line4',
            line5: 'line5',
            softDelete: true}];
        // },{
        //     line1: "line1",
        //     line2: 'line2',
        //     line3: 'line3',
        //     line4: 'line4',
        //     line5: 'line5',
        //     softDelete: false
        // }];

        (axios.get as any).mockResolvedValue({data: mockData});
        render(
            <MemoryRouter>
                <Dashboard/>
            </MemoryRouter>
        )
        await userEvent.click(screen.getByRole('button',{name:"Fetch All Nine Line"}));
        expect(screen.queryByText('Nine Line Card')).toBeNull();
    });


    it('should display the heading based on the role', () => {

        render(
            <MemoryRouter>
                <Dashboard/>
            </MemoryRouter>
        )
        expect(screen.getByRole('heading', {name:'Dispatcher'})).toBeVisible();
        expect(screen.getByRole('heading', {name:'Medic'})).toBeVisible();

    });
});