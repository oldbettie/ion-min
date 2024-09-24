import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(): Promise<NextResponse> {
    const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/1")
    const data = await pokemon.json()
    return new NextResponse( JSON.stringify({ data }), {status: 200})
}
