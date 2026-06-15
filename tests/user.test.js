const request = require("supertest");
const app = require("../src/server");

describe("User Routes", () => {
  test("GET /user should return status 200", async () => {
    const response = await request(app).get("/user");

    expect(response.statusCode).toBe(200);
  });

  test("GET /user/:username should return 404 for invalid username", async () => {
    const response = await request(app).get("/user/invaliduser");

    expect(response.statusCode).toBe(404);
  });
});