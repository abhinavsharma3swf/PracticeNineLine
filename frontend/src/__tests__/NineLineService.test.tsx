import {beforeEach, expect, vi} from "vitest";
import {fetchNineLine, submitNineLine} from "../service.ts";
import axios from "axios";


vi.mock('axios')
describe('submit nine line', () => {

    beforeEach(()=>{
        vi.clearAllMocks();
    });

    const mockNineLine = {
        line1: "line1",
        line2: "line2",
        line3: "line3",
        line4: "line4",
        line5: "line5",
    };

    it('should send the nine line data to the backend and receive a success message', async () => {

        (axios.post as any).mockResolvedValueOnce({ data: { success: true } });
        const result = await submitNineLine(mockNineLine);
        expect(axios.post).toHaveBeenLastCalledWith('/api/nineline', mockNineLine)
        expect(result).toEqual({success: true});
    });

    it('should fetch nine line', async () => {
        (axios.get as any).mockResolvedValue({data: mockNineLine});
        const result= await fetchNineLine();
        expect(result).toEqual(mockNineLine);
    });
});