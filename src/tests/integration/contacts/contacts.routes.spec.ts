import { DataSource } from "typeorm";
import { AppDataSource } from "../../../database";
import request from "supertest";
import app from "../../../app";
import {
  mockedContactFull,
  mockedContactUpdate,
  mockedUser,
} from "../../mocks";

describe("Testing the contact routes", () => {
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

  test("POST /contacts - Testing contact creation", async () => {
    const userResponse = await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedUser);
    const contactResponse = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedContactFull);

    expect(contactResponse.status).toBe(201);
    expect(contactResponse.body).toHaveProperty("id");
    expect(contactResponse.body).toHaveProperty("email");
    expect(contactResponse.body).toHaveProperty("first_name");
    expect(contactResponse.body).toHaveProperty("last_name");
    expect(contactResponse.body).toHaveProperty("phone_number");
    expect(contactResponse.body).toHaveProperty("created_at");
    expect(contactResponse.body).toHaveProperty("updated_at");
    expect(contactResponse.body).toHaveProperty("owner_id");
    expect(contactResponse.body.owner_id).toBe(userResponse.body.id);
  });

  test("GET /contacts - Testing authenticated user contact listing", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedUser);
    await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedContactFull);
    const contactsResponse = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(contactsResponse.body).toHaveProperty("map");
    expect(contactsResponse.body).toHaveLength(1);
  });

  test("DELETE /contacts/:id - Testing contact deletion", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedUser);
    const contactResponse = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedContactFull);
    const contactDeleteResponse = await request(app)
      .delete(`/contacts/${contactResponse.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    const contacts = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(contactDeleteResponse.status).toBe(204);
    expect(contacts.body).toHaveProperty("map");
    expect(contacts.body).toHaveLength(0);
  });

  test("PATCH /contacts/:id - Testing contact update", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedUser);
    const contactResponse = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedContactFull);

    const contactUpdateResponse = await request(app)
      .patch(`/contacts/${contactResponse.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedContactUpdate);

    expect(contactUpdateResponse.status).toBe(200);
    expect(contactUpdateResponse.body).toHaveProperty("message");
    expect(contactUpdateResponse.body).toHaveProperty("contact");
    expect(contactUpdateResponse.body.contact).toHaveProperty("owner_id");
  });
});
