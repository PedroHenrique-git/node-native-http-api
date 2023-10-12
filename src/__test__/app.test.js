import { describe, it, before, after } from "node:test";
import { deepEqual, equal, ok } from "node:assert";
import { server } from "../server.js";
import { PORT, url } from "../constants.js";

describe("App test", () => {
  const task = { name: "buy", description: "apple" };

  before(() => {
    server.listen(PORT);
  });

  after(() => {
    server.close();
    server.removeAllListeners();
  });

  it("should create a task", async () => {
    const request = await fetch(url, {
      method: "POST",
      body: JSON.stringify(task),
    });

    const { name, description, id } = await request.json();

    equal(name, task.name);
    equal(description, task.description);
    ok(id);
  });

  it("should list all tasks", async () => {
    const request = await fetch(url);
    const response = await request.json();

    equal(response.length === 1, true);
  });
});
