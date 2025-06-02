import {render,screen} from "@testing-library/react";
import NineLineCard from "../components/NineLineCard.tsx";
import {expect} from "vitest";



describe('NineLineCard', () => {
    it('should display card heading', () => {

        const mockNineLine = {
            line1: 'line1',
            line2: 'line2',
            line3: 'line3',
            line4: 'line4',
            line5: 'line5'
        }

        render(<NineLineCard nineLine={mockNineLine}/>)
        screen.logTestingPlaygroundURL();
        expect(screen.getByText(/nine line card/i)).toBeVisible();
        expect(screen.getByText(/line1/i)).toBeVisible();
        expect(screen.getByText(/line5/i)).toBeVisible();
    });
});