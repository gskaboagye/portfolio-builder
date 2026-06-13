const request = require("supertest");
const app = require("../src/server");

describe("Theme Routes", () => {
test("GET /theme should return status 200", async () => {
const response = await request(app).get("/theme");

```
expect(response.statusCode).toBe(200);
```

});

test("GET /theme/:themeName should return 404 for invalid theme", async () => {
const response = await request(app).get(
"/theme/nonexistenttheme"
);

```
expect(response.statusCode).toBe(404);
```

});
});
