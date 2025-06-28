const request = require("supertest");
const app = require('../server/server'); // ✅ Correct
const assert = require("assert");

describe("POST /notify-telegram", () => {
  it("should return 200 when all required fields are present", async () => {
    const response = await request(app)
      .post("/notify-telegram")
      .send({
        browser: "Chrome",
        ip: "123.123.123.123",
        city: "Lagos",
        country: "Nigeria",
      });

    // 200 = OK, 207 = sent to some but failed on others
    assert([200, 207].includes(response.status), "Response status should be 200 or 207");
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/notify-telegram")
      .send({
        browser: "Chrome",
        ip: "123.123.123.123",
        // Missing city and country
      });

    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body, { error: "Missing required fields" });
  });
});
