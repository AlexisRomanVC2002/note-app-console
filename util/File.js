import fs from "node:fs/promises";

export function existFileNotes() {

    return new Promise(async (resolve, reject) => {

        let infoFile;

        try {
            infoFile = await fs.stat(process.env.PATH_NOTE_FILE);
        } catch (error) {
            console.log(`❌ Not found the file "notes.vc"...`);
        }

        resolve(infoFile);

    });

}
