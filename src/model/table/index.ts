// documentacion: https://orm.drizzle.team/docs/insert
import { db, isDbError, Item } from "astro:db";

export async function getItem() {
    return 'demo';
    // try {
    //     const comentarios = await db.select().from(Item);
    //     return hanlerMsj(comentarios, 200);        
    // } catch (e: unknown) {
    //     if (isDbError(e)) {
    //         const msj = "A DB error occurred: " + JSON.stringify(e);
    //         return hanlerMsj(msj, 202);
    //     }
    //     const msj = "An unexpected error occurred: " + JSON.stringify(e);
    //     return hanlerMsj(msj, 202);
    // }
}

function hanlerMsj(msj: any, status: number) {
    return new Response(
        JSON.stringify({
            message: msj, status: status
        }),
        { status: status }
    ); 
}
