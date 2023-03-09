const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Url = require("../models/Url");

// configure dotenv
dotenv.config();

describe("Connection", () => {
    // Perform DB connection using beforeAll block
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewURLParser: true,
            useUnifiedTopology: true,
        });
    });

    test("Retrieve origUrl by urlId", async () => {
        // Entered in a test URL, "www.test.com", shortended URL, "sho.rt/lj9kll7B"
        // Data will be cleared on MongoDB, so subsequent tests will require changing the id and origUrl
        // Test scripts are automated and can be run using npm run test 
        const id = "Ij9kll7B";
        const url = await Url.findOne({ urlId: id });
        expect(url.origUrl).toBe("www.test.com");
    });

    // After all tests are completed
    afterAll(async () => {
        await mongoose.disconnect();
    });
});
