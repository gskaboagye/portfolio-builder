const request = require("supertest");
const app = require("../src/server");

describe("Skill Routes", () => {
test("GET /skill should return status 200", async () => {
const response = await request(app).get("/skill");

```
expect(response.statusCode).toBe(200);
```

});

test("GET /skill/:skillName should return 404 for invalid skill", async () => {
const response = await request(app).get(
"/skill/nonexistentskill"
);

```
expect(response.statusCode).toBe(404);
```

});
});
