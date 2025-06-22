jest.mock("./__mocks__/redisClient");

const request = require("supertest");
const app = require("./app");
const { init } = require("./models");
const Models = require("./models");
const { sequelize } = require("./models/employees");
const { Model } = require("sequelize");

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await sequelize.close();
});

const testUser = {
  email: "alexander.young@terminals.com.au",
  password: "supertest",
};

describe("Get Licenses Expiring within 30 days or a 404 message", () => {
  test("GET lass/licenses/due", () => {
    return request(app)
      .get(`/lass/licenses/due`)
      .then((res) => {
        const data = res.body.data;
        if (data && data.length > 0) {
          expect(res.status).toBe(200);
          expect(res.body.result).toBe(200);
          expect(Array.isArray(data)).toBe(true);
          expect(data[0]).toHaveProperty("license_id");
          expect(data[0]).toHaveProperty("days_til_expiry");
          data.forEach((expiringLicense) => {
            expect(expiringLicense.days_til_expiry).toBeLessThan(30);
          });
        } else {
          expect(res.status).toBe(404);
          expect(res.body.result).toBe(404);
          expect(res.body.message).toBe("No licenses expiring within 30 days");
        }
      });
  });
});

describe("Successful Password creation and hashing, dehashing during logIn", () => {
  let hashedPassword;

  test("Password Successfully Created", async () => {
    const res = await request(app)
      .post(`/lass/logIn/create-password`)
      .send(testUser)
      .expect(200);
    expect(res.body.message).toBe("Password Successfully Created");
    const matchedEmployee = await Models.Employees.findOne({
      where: { work_email: testUser.email },
    });
    hashedPassword = matchedEmployee.password;
    expect(hashedPassword).toBeDefined();
  });

  test("Password successfully Hashed", () => {
    expect(hashedPassword).not.toBe(testUser.password);
  });

  test("Password Dehashes for Log In", async () => {
    const res = await request(app)
      .post(`/lass/logIn/`)
      .send(testUser)
      .expect(200);
    expect(res.body.message).toBe("Successful Login");
  });
});

describe("Annual leave Approved Tests", () => {
  const testLeaveBody = {
    employee_id: 16,
    leave_request_id: 6,
    comment: "",
    start_date: "2025-06-16",
    end_date: "2025-06-16",
    decrement_amount: 1,
    leave_type: "Sick Leave",
  };

  test("Leave Request Approved", async () => {
    const res = await request(app)
      .put(`/lass/leave/requests/approve/`)
      .send(testLeaveBody)
      .expect(200);
    expect(res.body.message).toBe("All updates done and leave approved");
  });

  test("Check if Employee has been removed from roster", async () => {
    const query = `select 
            available
            from rosters
            where employee_id = ${testLeaveBody.employee_id}
            and date between ${testLeaveBody.start_date} and ${testLeaveBody.end_date}`;

    await sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then((res) => {
        const stillAvailableCheck = res.some((date) => date.available === true);
        expect(stillAvailableCheck).toBe(false);
      });
  });
});

describe("Skill Revocation and Reinstation", () => {
  const testEmployeeID = 16;
  const testRoleID = 3;

  test("Revoke Skill", () => {
    return request(app)
      .put(`/lass/skills/revoke/${testEmployeeID}/${testRoleID}`)
      .then((res) => {
        const data = res.body;
        expect(data.result).toBe(200);
        expect(data.message).toBe("Skill successfully revoked");
      });
  });
  test("Reinstate Skill", () => {
    return request(app)
      .put(`/lass/skills/reinstate/${testEmployeeID}/${testRoleID}`)
      .then((res) => {
        const data = res.body;
        expect(data.result).toBe(200);
        expect(data.message).toBe("Skill successfully Reinstated");
      });
  });
});

describe("Updating a teams bonus and then ensuring its been changed to the specified amount", () => {
  const testTeamID = 24;
  const testBonusAmount = Math.floor(Math.random() * 150);
  test("Update Bonus", () => {
    return request(app)
      .put(`/lass/teams/updatebonus`)
      .send({ team_id: testTeamID, bonus: testBonusAmount })
      .then((res) => {
        const data = res.body;
        expect(data.result).toBe(200);
      });
  });
  test("Test Bonus has changed", async () => {
    const res = await Models.Teams.findOne({ where: { team_id: testTeamID } });
    expect(res.bonus).toBe(testBonusAmount);
  });
});
