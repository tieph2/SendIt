import "chai/register-should.js";

import { test, teardown } from "tap";
import { faker } from "@faker-js/faker";
import app from "../src/app.js";

teardown(() => app.close());

test("Request the /hello route", async () => {
	const response = await app.inject({
		method: "GET",
		url: "/hello",
	});
	response.statusCode.should.equal(200);
	response.body.should.equal("Hello");
});

test("List all users from /deTest", async () => {
	const response = await app.inject({
		method: "GET",
		url: "/dbTest",
	});

	response.statusCode.should.equal(200);
});

test("Creating a new user", async () => {
	const payload = {
		name: "Testname",
		email: faker.internet.email(),
		petType: "Dog",
		testProp: 12,
	};
	const response = await app.inject({
		method: "POST",
		url: "/users",
		payload,
	});

	response.statusCode.should.equal(200);
	response.payload.should.not.equal(payload);
	const resPayload = response.json();
	resPayload.email.should.equal(payload.email);
	resPayload.petType.should.equal("Dog");
	resPayload.testProp.should.equal(12);
});
