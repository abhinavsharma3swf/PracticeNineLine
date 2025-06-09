import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {userEvent} from "@testing-library/user-event";
import {UserContext} from "../App.tsx";
import Medic from "../components/Medic.tsx";
import NineLine from "../components/NineLine.tsx";

describe('Medic Component', () => {

    it('should display the new and existing nine line buttons in the navbar', () => {

        render(<Medic/>)
        screen.logTestingPlaygroundURL();
        expect(screen.getByRole('button',{name:/new nine line request/i})).toBeVisible();
        expect(screen.getByRole('button',{name:/existing nine line requests/i})).toBeVisible();


    });

    it('should route the medic to the nine line request page when clicking on new line button', async () => {

        const mockContext = {
            job: 'Medic',
            userId: 1
        }

        render(
            <UserContext.Provider value={mockContext}>
            <MemoryRouter initialEntries={["/medic"]}>
                <Routes>
                    {/*<Route path="/" element={<Dashboard/>}/>*/}
                    <Route path="/submit" element={<NineLine/>}/>
                    <Route path="/medic" element={<Medic/>}/>
                </Routes>
            </MemoryRouter>
            </UserContext.Provider>
        )
        const requestButton = screen.getByRole('button',{name:/new nine line request/i});
        await userEvent.click(requestButton);
        screen.debug();
        expect( await screen.findByRole('button', {name: /submit/i})).toBeVisible();
    });
});