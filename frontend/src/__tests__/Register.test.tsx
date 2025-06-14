import {render, screen} from "@testing-library/react";
import {expect, vi} from "vitest";
import Registration from "../components/Registration.tsx";
import {userEvent} from "@testing-library/user-event";
import * as service from "../service.ts";
import {MemoryRouter} from "react-router-dom";
import { UserContext } from "../App.tsx";

describe('Register Page', () => {

    beforeEach(() => {

        const mockUser = {
            name: "John",
            callSign: "asf",
            unit: "futures",
            role: "dispatcher"
        }
        vi.clearAllMocks();
    });

    it('should display input field for the user and the submit', () => {

        render(
            <MemoryRouter>
                <Registration/>
            </MemoryRouter>
        )
        screen.logTestingPlaygroundURL();
        const submit = screen.getByLabelText('button');

        expect(screen.getByLabelText("name")).toBeVisible();
        expect(submit).toBeVisible();
    });

    it('should allow user to input in the text field and submit the form', async () => {

        const mockSubmit = vi.spyOn(service, "createRegistration").mockResolvedValue({success: true})

        render(
            <MemoryRouter>
                <Registration/>
            </MemoryRouter>
        )

        const name = screen. getByRole('textbox', { name: /name/i });
        await userEvent.type(name, "John");
        screen.logTestingPlaygroundURL();
        expect(name).toHaveValue("John");
        const callSign = screen.getByRole('textbox', { name: /call\-sign/i });
        await userEvent.type(callSign, "asf");
        expect(callSign).toHaveValue("asf");
        const unit = screen.getByRole('textbox', { name: /unit/i });
        await userEvent.type(unit, "futures");
        expect(unit).toHaveValue("futures")
        const role = screen.getByRole('textbox', { name: /role/i });
        await userEvent.type(role, "dispatcher");
        expect(role).toHaveValue("dispatcher")
        const submitButton = screen.getByLabelText('button');
        await userEvent.click(submitButton);
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith({
            name: "John",
            callSign: "asf",
            unit: "futures",
            role: "dispatcher"
        })
    });

    it('should display the user name', async () => {

        const fakeUser = {
            name: "John",
            callSign: "asf",
            unit: "futures",
            role: "dispatcher"
        }

        const mockSubmit = vi.spyOn(service, 'createRegistration').mockResolvedValue(fakeUser);

        render(
            <MemoryRouter>
                <UserContext.Provider value={fakeUser}>
                    <Registration/>
                </UserContext.Provider>
            </MemoryRouter>
        )
        screen.logTestingPlaygroundURL();
        const name = screen. getByRole('textbox', { name: /name/i });
        await userEvent.type(name, "John");
        expect(name).toHaveValue("John");
        const callSign = screen.getByRole('textbox', { name: /call\-sign/i });
        await userEvent.type(callSign, "asf");
        expect(callSign).toHaveValue("asf");
        const unit = screen.getByRole('textbox', { name: /unit/i });
        await userEvent.type(unit, "futures");
        expect(unit).toHaveValue("futures")
        const role = screen.getByRole('textbox', { name: /role/i });
        await userEvent.type(role, "dispatcher");
        expect(role).toHaveValue("dispatcher");
        const button = screen.getByRole('button',{name: /button/i});
        await userEvent.click(button);
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith(fakeUser);
    });
});