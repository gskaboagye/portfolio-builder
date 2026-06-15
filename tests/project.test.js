const request = require("supertest");
const app = require("../src/server");

describe("Project Routes", () => {
  test("GET /project should return status 200", async () => {
    const response = await request(app).get("/project");

    expect(response.statusCode).toBe(200);
  });

  test("GET /project/:projectName should return 404 for invalid project", async () => {
    const response = await request(app).get("/project/InvalidProject");

    expect(response.statusCode).toBe(404);
  });
});