import csv from "csv-parser";
import fs from "fs";
import { k } from "./database/config";
import { randomUUID } from "crypto";

interface TaskProps {
  title: string;
  description: string;
}

fs.createReadStream("arquivo.csv")
  .pipe(csv(["title", "description"]))
  .pipe(csv({ skipLines: 1 }))
  .on("data", async (data: TaskProps) => {
    console.log(data);
    await k("tasks").insert({
      id: randomUUID(),
      title: data.title,
      description: data.description,
      created_at: new Date(),
      updated_at: new Date(),
    });
  })
  .on("close", () => console.log("FINALIZED"));
