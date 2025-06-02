import {render, screen} from "@testing-library/react";
import {beforeEach, describe, expect, it, vi} from "vitest";
import NineLine from "../components/NineLine.tsx";
import {userEvent} from "@testing-library/user-event";
import * as service from '../service';
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "../components/Dashboard.tsx";

describe('Nine Line Input Page', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should display the nine line app header with the input form', () => {

        render(
            <MemoryRouter>
            <NineLine/>
            </MemoryRouter>
        )
        expect(screen.getByRole('heading')).toBeVisible();
        expect(screen.getByLabelText("Line1")).toBeVisible();
        expect(screen.getByPlaceholderText("Line2")).toBeVisible();
        expect(screen.getByPlaceholderText("Line3")).toBeVisible();
        expect(screen.getByPlaceholderText("Line4")).toBeVisible();
        expect(screen.getByPlaceholderText("Line5")).toBeVisible();
    });

    it('should display the submit button and allow user to fill in the input boxes and submit', async () => {

        const mockSubmit = vi.spyOn
        (service, 'submitNineLine').mockResolvedValue({success: true})
        render(
            <MemoryRouter>
                <NineLine/>
            </MemoryRouter>
        )

        const line1 = screen.getByPlaceholderText(/line1/i);
        const line2 = screen.getByPlaceholderText(/line2/i);
        const line3 = screen.getByPlaceholderText(/line3/i);
        const line4 = screen.getByPlaceholderText(/line4/i);
        const line5 = screen.getByPlaceholderText(/line5/i);
        expect(screen.getByRole('button', {name:"Submit"})).toBeVisible();
        await userEvent.type(line1, "Line1");
        await userEvent.type(line2, "Line2");
        await userEvent.type(line3, "Line3");
        await userEvent.type(line4, "Line4");
        await userEvent.type(line5, "Line5");
        expect(line1).toHaveValue('Line1');
        expect(line2).toHaveValue('Line2');
        expect(line3).toHaveValue('Line3');
        expect(line4).toHaveValue('Line4');
        expect(line5).toHaveValue('Line5');
        await userEvent.click(screen.getByRole('button', {name: /submit/i}));
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith({
            line1: 'Line1',
            line2: 'Line2',
            line3: 'Line3',
            line4: 'Line4',
            line5: 'Line5'
        });
    });

    it('should display the exit button and route to the dashboard upon clicking', async () => {

        render(
            <MemoryRouter initialEntries={["/submit"]}>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/submit" element={<NineLine />} />
                </Routes>
            </MemoryRouter>
        )
        const exitButton= screen.getByRole('button', {name: 'Exit'});
        await userEvent.click(exitButton);
        expect(screen.getByRole('button', {name: /new nine line/i})).toBeVisible();
    });
});