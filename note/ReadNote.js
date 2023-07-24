import { readFile } from "node:fs/promises";
import { formatNote } from "./FormateNote.js"
import process from "node:process"
import dotenv from 'dotenv';

dotenv.config();

export async function readNote() {

    let file;

    try {
        file = await readFile(process.env.PATH_NOTE_FILE, "utf8");
    } catch (error) {
        console.error("Error: ", error);
        process.exit(1);
    }

    return new Promise((resolve, reject) => {

        resolve(formatNote(file));
    });

}

export async function readNoteWithoutFormat() {

    let file;

    try {
        file = await readFile(process.env.PATH_NOTE_FILE, "utf8");
    } catch (error) {
        console.error("Error: ", error);
        process.exit(1);
    }

    return new Promise((resolve, reject) => {
        resolve(file);
    });


}
