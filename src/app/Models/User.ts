import { Flight } from "./Flight"

export interface User {
    id: number,
    userName : string,
    password : string, 
    isAdmin? : boolean,
    favoriteFlights? : number[]
}