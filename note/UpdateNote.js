import {writeFile} from "node:fs/promises";
import dotenv from 'dotenv';
import process from "node:process"

dotenv.config();

export async function updateNote(arrayOldNotes, newNote, lineNoteToUpdate){

    arrayOldNotes[lineNoteToUpdate - 1] = newNote;

    let noteUpdate = arrayOldNotes.join("\n");

    try{
        await writeFile(process.env.PATH_NOTE_FILE, noteUpdate, "utf-8");
    }catch(error){
        console.error(`❌ Error -> ${error}`);
    }

    return new Promise( (resolve, reject) => {
        resolve("✔ The note has been updated successfully.");
    } );

}
