import { writeFile } from 'node:fs/promises';
import dotenv from 'dotenv';
import process from "node:process"

dotenv.config();

export async function removeNote(arrayNotes, lineToRemove){

    // Delete the line of the note.
    arrayNotes.splice(lineToRemove - 1, 1);
    let textNotes = arrayNotes.join("\n");

    try{
        await writeFile(process.env.PATH_NOTE_FILE, textNotes, "utf-8");
    }catch(error){
        console.error(`❌ Error -> ${error}`);
    }

    return new Promise( (resolve, reject) => {
        resolve("✔ Note deleted successfully...");
    });

}
