export type NineLineTypes= {
    id?: number
    line1: string,
    line2: string,
    line3: string,
    // line3Urgent?: string,  This is a way to handle the different type of options in one line
    // line3Priority?: string,
    line4: string,
    line5: string,
    softDelete?: boolean //if true the item should be hidden
}