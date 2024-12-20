// documentacion: https://orm.drizzle.team/docs/insert
import { db, isDbError, eq, Item } from "astro:db";
export async function deleteItem(id: number) {
    try {
        await db.delete(Item).where(eq(Item.id, id));
        const msj = "¡Éxito!";
        return hanlerMsj(msj, 200);        
    } catch (e: unknown) {
        if (isDbError(e)) {
            const msj = "A DB error occurred: " + JSON.stringify(e);
            return hanlerMsj(msj, 202);
        }
        const msj = "An unexpected error occurred: " + JSON.stringify(e);
        return hanlerMsj(msj, 202);
    }
}

export async function addItem(value: string) {
    try {
        await db.insert(Item).values({ value });
        const msj = "¡Éxito!";
        return hanlerMsj(msj, 200);        
    } catch (e: unknown) {
        if (isDbError(e)) {
            const msj = "A DB error occurred: " + JSON.stringify(e);
            return hanlerMsj(msj, 202);
        }
        const msj = "An unexpected error occurred: " + JSON.stringify(e);
        return hanlerMsj(msj, 202);
    }
}

function hanlerMsj(msj: any, status: number) {
    return new Response(
        JSON.stringify({
            message: msj, status: status
        }),
        { status: status }
    ); 
}
