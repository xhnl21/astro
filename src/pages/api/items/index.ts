import { addItem, deleteItem, getItem } from '../../model/items'; // Importa las funciones
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
        return hanlerMsj(e, 500);
    }
};

export const DELETE: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get('id'));
    if (!id) {
        return hanlerMsj('ID no proporcionado', 400); 
    }
    try {
        return await deleteItem(id);
    } catch (e) {
        return hanlerMsj('Error al eliminar el elemento', 500);         
    }
};

export const PUT: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get('id'));
    if (!id) {
        return hanlerMsj('ID no proporcionado', 400); 
    }
    const data = await request.formData();
    const value = data.get("value"); 
    try {
        if (typeof value === 'string') {
            return await addItem(value);
        } else {
            return hanlerMsj('Value is undefined or not a string', 202);
        }
    } catch (e) {
        return hanlerMsj(e, 500);
    }
};

export const GET: APIRoute = async () => {
    try {
        const results = await getItem();
        return hanlerMsj('exito', 200, results);
    } catch (e) {
        return hanlerMsj('Error al eliminar el elemento', 500);
    }
};

function hanlerMsj(msj: any, status: number, data: any = []) {
    return new Response(
        JSON.stringify({
            message: msj, status: status, data:data
        }),
        { status: status },
    ); 
}
