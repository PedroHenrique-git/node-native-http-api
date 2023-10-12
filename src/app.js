import { PORT } from "./constants.js";
import { server } from "./server.js";

server.listen(PORT);

server.on("listening", () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
