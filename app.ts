//const fs = require('fs');
import { watch, open } from "node:fs/promises";

const fileWatch = async () => {
  const commandFileHandler = await open("./command.txt", "r");
  const watcher = watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      console.log(event);
      const commandFileStats = await commandFileHandler.stat();
      const fileBuffer = Buffer.alloc(commandFileStats.size);
      console.log(commandFileStats.uid, commandFileStats.size);
      const fileContent = await commandFileHandler.read(fileBuffer, {
        position: 0,
      });
      console.log(fileContent);
    }
  }

  await commandFileHandler.close();
};

fileWatch();
