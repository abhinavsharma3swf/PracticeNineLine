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

    it('should find the edit button and allow user to edit the card', async () => {

        const mockNineLine = {
            id: 1,
            line1: 'line1',
            line2: 'line2',
            line3: 'line3',
            line4: 'line4',
            line5: 'line5'
        }

        render(<NineLineCard nineLine={mockNineLine}/>)
        const editButton = screen.getByRole('button', {name: 'Edit'});
        expect(editButton).toBeVisible();
        await userEvent.click(editButton);
        screen.logTestingPlaygroundURL();//testing playground site
        expect(screen.getByRole('textbox', {name:/line1textarea/i})).toBeInTheDocument();
    });

    it('should only display edit and delete button when we fetch nine line cards', () => {
        const mockNineLine = {
            id: 1,
            line1: 'line1',
            line2: 'line2',
            line3: 'line3',
            line4: 'line4',
            line5: 'line5'
        }
        render(<NineLineCard nineLine={mockNineLine}/>);
        expect(screen.queryByRole('button',{name: 'Save'})).toBeNull();
    });


    it('should only display correct buttons once edit button is clicked', async () => {
        const mockNineLine = {
            id: 1,
            line1: 'line1',
            line2: 'line2',
            line3: 'line3',
            line4: 'line4',
            line5: 'line5'
        }
        render(<NineLineCard nineLine={mockNineLine}/>);
        const editButton = screen.getByRole('button', {name: 'Edit'});
        // const save = vi.spyOn(service, 'saveNineLine').mockResolvedValue(mockNineLine);
        await userEvent.click(editButton);
        const saveButton = screen.getByRole('button', {name: /save/i});
        expect(saveButton).toBeVisible();
        expect(screen.queryByRole('button',{name: 'Delete'})).toBeNull();
        expect(screen.queryByRole('button',{name: 'Edit'})).toBeNull();
    });
    // const updatedMockNineLine = {
    //     id: 1,
    //     line1: 'line11',
    //     line2: 'line21',
    //     line3: 'line31',
    //     line4: 'line41',
    //     line5: 'line51'
    // }
});