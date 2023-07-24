import {appendFile} from "node:fs/promises";
import process from "node:process"
import dotenv from 'dotenv';
dotenv.config();

export async function createNote(note){

    try{
        await appendFile(process.env.PATH_NOTE_FILE, `\n${note}`, "utf-8");
    }catch(error){
        console.error("Error: ", error);
        process.exit(1);
    }

    return new Promise( (resolve, reject) => {
        resolve("✔ Se ha creado la nota correctamente.");
    } );

}
