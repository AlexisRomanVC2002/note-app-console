import clipboardy from 'clipboardy';
import console from "node:console";

import { createNote } from "./note/CreateNote.js";
import { readNote, readNoteWithoutFormat } from "./note/ReadNote.js";
import { updateNote } from "./note/UpdateNote.js";
import { removeNote } from "./note/RemoveNote.js";
import { formatNote } from "./note/FormateNote.js";
import { requestData } from "./util/Scanner.js"
import { existFileNotes } from "./util/File.js"

async function initApp() {

    let existFile = await existFileNotes(); // Check if the file "notes.vc" exist.

    if (!existFile) process.exit(1); // Exit from the app if the file "notes.vc" not exist.

    console.log("=======================================");
    console.log("========= WELCOME TO NOTE APP =========");
    console.log("=======================================");

    while (true) {

        console.log("\nCHOOISE A OPTION: \n");

        console.log("[1] Create Note.");
        console.log("[2] Show Notes.");
        console.log("[3] Update Notes.");
        console.log("[4] Delete Notes.");
        console.log("[5] Exit");

        let choice = await requestData("-> ");

        await hanldeChoice(choice);
    }

}

async function hanldeChoice(choice) {

    console.clear();
    let option;

    switch (choice.toLowerCase()) {

        case "1": {
            let note = await requestData("Write your note: ");

            await createNote(note).then((text) => console.log(`\n${text}`)).catch(err => console.log(err));
        }
            break;

        case "2": {
            await readNote().then((notes) => console.log(`\n${notes}\n`)).catch(err => console.error(err));

            console.log(`\n[A] Return to menu`);
            console.log(`[B] exit`);

            option = await requestData("-> ");
            option = option === "B" || option === "b" ? "5" : option;

            await hanldeChoice(option);
        }
            break;

        case "3": {

            let notesText;

            await readNoteWithoutFormat().then((notes) => {
                notesText = notes;

                console.log(`\n${formatNote(notes)}\n`)
            }).catch(err => console.error(err));

            let line = await requestData("Which line you want to update: ");
            line = parseInt(line);
            let arrayNotes = notesText.split("\n");

            if (line > arrayNotes.length) {
                console.error(`\n❌ The number of note not exist...`);
                return;
            }

            let noteToUpdate = arrayNotes[line - 1]; // Get the line we want to edit.

            await clipboardy.write(noteToUpdate); // Save the note to update in the clipboard.

            // Paste the old line in the console for( modify for the user.
            let noteUpdate = await requestData("Click right here for paste the line to edit -> ");

            await updateNote(arrayNotes, noteUpdate, line).then((text) => console.log(`\n${text}`)).catch(error => console.log(error))
        }
            break;

        case "4": {

            let notesText;

            await readNoteWithoutFormat().then((notes) => {
                notesText = notes;

                console.log(`\n${formatNote(notes)}\n`)
            }).catch(err => console.error(err));

            let line = await requestData("Which line you want to remove: ");
            line = parseInt(line);
            let arrayNotes = notesText.split("\n");

            if (line > arrayNotes.length) {
                console.error(`\n❌ The number of note not exist...`);
                return;
            }

            await removeNote(arrayNotes, line).then((text) => console.log(`\n${text}`)).catch(error => console.log(error))
        }
            break;

        case "5": {
            console.log("\nExit from the program...");
            process.exit(0);
        }

        case "a": console.log("Returning...");
            break;

        default: {
            console.log("The option is incorrect, exit from the program...");
            process.exit(1);
        }
    }

}

initApp();
