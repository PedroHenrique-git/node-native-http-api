export function parseBody(req) {
  return new Promise((resolve, reject) => {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk.toString());
    });

    req.on("end", () => {
      resolve(JSON.parse(body));
    });

    req.on("error", () => {
      reject(null);
    });
  });
}
