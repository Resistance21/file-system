//const fs = require('fs');
import { watch, open, appendFile, unlink, rename } from "node:fs/promises";

const fileWatch = async () => {
  const commandFileHandler = await open("./command.txt", "r");

  const createFile = async (path: string) => {
    try {
      await appendFile(path, "", { flag: "ax" });
      console.log("file created");
    } catch (e) {
      console.log("file exsists");
    }
  };
  const deleteFile = async (path: string) => {
    try {
      await unlink(path);
      console.log("file deleted");
    } catch (e) {
      if (e instanceof Error) console.log("error", e.message);
    }
  };
  const renameFile = async (oldpath: string, newpath: string) => {
    try {
      await rename(oldpath, newpath);
      console.log("file renamed");
    } catch (e: unknown) {
      if (e instanceof Error) console.log("error", e.message);
    }
  };

  const addToFile = async (path: string, content: string) => {
    try {
      await appendFile(path, content);
      console.log("file appended");
    } catch (e: unknown) {
      if (e instanceof Error) console.log("error", e.message);
    }
  };

  commandFileHandler.on("change", async () => {
    const commandFileStats = await commandFileHandler.stat();
    const fileBuffer = Buffer.alloc(commandFileStats.size);
    const fileContent = await commandFileHandler.read(fileBuffer, {
      position: 0,
    });

    const fileText = fileContent.buffer.toString();
    const FILEOPTIONS = {
      CRATE: "create a file",
      DELETE: "delete file",
      RENAME: "rename file",
      ADDTOFILE: "add to file",
    };

    if (fileText.includes(FILEOPTIONS.CRATE)) {
      createFile(fileText.substring(FILEOPTIONS.CRATE.length + 1));
    }

    if (fileText.includes(FILEOPTIONS.DELETE)) {
      deleteFile(fileText.substring(FILEOPTIONS.DELETE.length + 1));
    }

    if (fileText.includes(FILEOPTIONS.RENAME)) {
      const toIndex = fileText.indexOf(" to ");
      const oldPath = fileText.substring(
        FILEOPTIONS.RENAME.length + 1,
        toIndex
      );
      const newPath = fileText.substring(toIndex + 4);
      renameFile(oldPath, newPath);
    }

    if (fileText.includes(FILEOPTIONS.ADDTOFILE)) {
      const contentInx = fileText.indexOf(" add ");
      addToFile(
        fileText.substring(FILEOPTIONS.ADDTOFILE.length + 1, contentInx),
        fileText.substring(contentInx + 4)
      );
    }
    console.log(fileContent.buffer.toString());
  });

  const watcher = watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
      //console.log("event", event);
    }
  }

  await commandFileHandler.close();
};

fileWatch();
