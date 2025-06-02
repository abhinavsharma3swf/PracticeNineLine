import {render,screen} from "@testing-library/react";
import NineLineCard from "../components/NineLineCard.tsx";
import {expect, vi} from "vitest";
import {userEvent} from "@testing-library/user-event";
import * as service from '../service.ts';



describe('NineLineCard', () => {
    it('should display card heading and lines of the 9 line request', () => {

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

    it('should find a delete button and delete card when pressed', async () => {
    vi.mock('axios')
        const mockNineLine = {
            id: 1,
            line1: 'line1',
            line2: 'line2',
            line3: 'line3',
            line4: 'line4',
            line5: 'line5'
        }
        const soft=  vi.spyOn(service, 'softDelete').mockResolvedValue(1); //hidden for soft delete is true;
        render(<NineLineCard nineLine={mockNineLine}/>)
        const deleteButton = screen.getByRole('button', {name: /delete/i});
        expect(deleteButton).toBeVisible();
        await userEvent.click(deleteButton);
        expect(soft).toHaveBeenCalledTimes(1);
        screen.debug();
        expect(soft).toHaveBeenCalledWith(1);
    });
});