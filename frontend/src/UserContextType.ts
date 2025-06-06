// types.ts or inside App.tsx above the component
export type UserContextType = {
    userId: number | null;
    setUserId: (id: number | null) => void;
    job: string | null;
    setJob: (job: string | null) => void;
};
