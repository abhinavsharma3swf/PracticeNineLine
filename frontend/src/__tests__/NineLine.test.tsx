import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import NineLine from "../components/NineLine.tsx";
import {userEvent} from "@testing-library/user-event";

describe('Nine Line Input Page', () => {

    it('should display the nine line app header with the input form', () => {

        render(<NineLine/>)
        expect(screen.getByRole('heading')).toBeVisible();
        expect(screen.getByPlaceholderText("Line1")).toBeVisible();
        expect(screen.getByPlaceholderText("Line2")).toBeVisible();
        expect(screen.getByPlaceholderText("Line3")).toBeVisible();
        expect(screen.getByPlaceholderText("Line4")).toBeVisible();
        expect(screen.getByPlaceholderText("Line5")).toBeVisible();
    });

    it('should display the submit button and allow user to fill in the input boxes and submit', async () => {

        const mockSubmit = vi.fn(()=>0);
        render(<NineLine onSubmit={mockSubmit}/>)

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
            Line1: 'Line1',
            Line2: 'Line2',
            Line3: 'Line3',
            Line4: 'Line4',
            Line5: 'Line5'
        });
    });
});