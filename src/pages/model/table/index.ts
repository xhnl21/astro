// documentacion: https://orm.drizzle.team/docs/insert
import { db, isDbError, eq, Item } from "astro:db";
import type { APIRoute } from 'astro';
export const POST: APIRoute = async ({ request }) => {    
    const data = await request.formData();
    const value = data.get("value"); 
    try {
        if (typeof value === 'string') {
            return await addItem(value);
        } else {
            return hanlerMsj('Value is undefined or not a string', 202);
        }
    } catch (e) {
        if (isDbError(e)) {
            const msj = `No se puede insertar comentario con value ${value}\n\n${e.message}`;
            return hanlerMsj(msj, 400);
        }
        return hanlerMsj('Se ha producido un error inesperado', 500);
    }
};
export const DELETE: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get('id'));
    if (!id) {
        return hanlerMsj('ID no proporcionado', 400); 
    }
    try {
        await db.delete(Item).where(eq(Item.id, id));
        const msj = "¡Éxito!";
        return hanlerMsj(msj, 200);
    } catch (e) {
        return hanlerMsj('Error al eliminar el elemento', 500);         
    }
};

async function addItem(value: string) {
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
