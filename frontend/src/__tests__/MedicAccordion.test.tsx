import {render, screen} from "@testing-library/react";
import MedicAccordion from "../components/MedicAccordion.tsx";
import {beforeEach, expect, vi} from "vitest";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import { Dashboard } from "../components/Dashboard.tsx";
import {userEvent} from "@testing-library/user-event";
import NineLine from "../components/NineLine.tsx";


describe('Accordion', () => {

    beforeEach(()=> {
        vi.clearAllMocks();
    });

//globally accessible
    const mockNineLine={
        line1: "location",
        line2: "Call-Sing",
        line3: "Urgent",
        line4: "Pat by type",
        line5: "Pat by Prce"
    }

    it('should display the accordion on the page and its components', () => {
        render(<MedicAccordion nineLine={mockNineLine}/>)
        screen.logTestingPlaygroundURL();
        expect(screen.getByText(/location/i)).toBeVisible();
    });

    it('should display the submit button and should navigate to the submit page', () => {
        render(
            <MemoryRouter>
               <Routes>
                   <Route path={"/medic"} element={<MedicAccordion nineLine={mockNineLine}/>}/>
                   <Route path={"/submit"} element={<NineLine/>}/>
               </Routes>
            <MedicAccordion nineLine={mockNineLine}/>
            </MemoryRouter>
        )
        const button = screen.getByRole('button', {name: /submit nine line report/i});
        expect(button).toBeVisible();
        userEvent.click(button);
        expect(screen.getByRole('button', {name:/exit/i})).toBeVisible();
    });

});