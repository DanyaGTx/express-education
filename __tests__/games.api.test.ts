import request from "supertest";
import { app } from "../src/app";

describe("/games", () => {
  beforeAll(async () => {
    await request(app).delete("/__tests__/data");
  });

  it("should return 200 and empty array", async () => {
    await request(app).get("/games").expect(200, []);
  });

  let createdGame: any = null;
  it("should create game", async () => {
    const createdResponse = await request(app)
      .post("/games")
      .send({ title: "testGame" })
      .expect(201);

    createdGame = createdResponse.body;

    expect(createdGame).toEqual({
      id: expect.any(String),
      title: "testGame",
    });
  });

  it("should update game", async () => {
    await request(app)
      .patch("/games/" + createdGame.id)
      .send({ title: "newTitle" })
      .expect(200);

    await request(app)
      .get("/games/" + createdGame.id)
      .expect(200, { ...createdGame, title: "newTitle" });
  });

  it("should delete game", async () => {
    await request(app)
      .delete("/games/" + createdGame.id)
      .expect(204);

    await request(app).get("/games").expect(200, []);
  });

  afterAll((done) => {
    done();
  });
});
