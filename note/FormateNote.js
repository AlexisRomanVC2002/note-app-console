export function formatNote(notes){

    let index = 0;
    let arrayNotes = notes.split("\n")

    let arrayNotesFormatter = arrayNotes.map( note => {
        index += 1;
        if(note.trim() === "") return `----------> [${index}] Empty Line 📄`
        else return `----------> [${index}] ${note}`
    } );

    return arrayNotesFormatter.join("\n");

}
