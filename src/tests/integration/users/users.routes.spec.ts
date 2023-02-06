import { DataSource } from "typeorm";
import { AppDataSource } from "../../../database";
import request from "supertest";
import app from "../../../app";
import { mockedUser, mockedUserPatch } from "../../mocks";

describe("Testing the user routes", () => {
  let connection: DataSource;

  beforeEach(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test("POST /users - Testing user creation", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.status).toBe(201);
    expect(response.body).not.toHaveProperty("password");
  });

  test("POST /login - Testing user login", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedUser);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
  });

  test("GET /users - Testing authenticated user listing", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedUser);

    const userResponse = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(userResponse.body).toHaveProperty("id");
    expect(userResponse.body).toHaveProperty("first_name");
    expect(userResponse.body).toHaveProperty("last_name");
    expect(userResponse.body).toHaveProperty("email");
    expect(userResponse.body).toHaveProperty("phone_number");
    expect(userResponse.body).toHaveProperty("created_at");
    expect(userResponse.body).toHaveProperty("updated_at");
    expect(userResponse.body).not.toHaveProperty("password");
  });

  test("DELETE /users - Testing user deletion", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedUser);

    const userDeleteResponse = await request(app)
      .delete("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(userDeleteResponse.status).toBe(204);
  });

  test("PATCH /users - Testing user update", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedUser);

    const userPatchResponse = await request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedUserPatch);

    expect(userPatchResponse.status).toBe(200);
    expect(userPatchResponse.body).toHaveProperty("message");
    expect(userPatchResponse.body).toHaveProperty("user");
    expect(userPatchResponse.body.user).not.toHaveProperty("password");
    expect(userPatchResponse.body.user.email).not.toBe(mockedUser.email);
    expect(userPatchResponse.body.user.email).toBe(mockedUserPatch.email);
  });
});
