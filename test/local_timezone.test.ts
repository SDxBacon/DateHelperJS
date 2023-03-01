import dayjs from "dayjs";
import assert from "assert";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin

import DateHelper from "..";

dayjs.extend(utc);
dayjs.extend(timezone);

describe("[Module] Local Timezone", function () {
  /**
   * Method toStartOfDayAsDate 的測試案例
   */
  describe("#toStartOfDayAsDate", function () {
    // [Test case 1]
    // 使用當下時刻執行 toStartOfDayAsDate
    it("Current Time", function () {
      // Arrange
      // Act
      const d1 = DateHelper.LocalTimezone.toStartOfDayAsDate();
      const d2 = dayjs(d1).startOf("day").toDate();
      // Assertion
      assert.strictEqual(d1.toISOString(), d2.toISOString());
    });

    // [Test case 2]
    // 給予一個 Date 物件，執行 toStartOfDayAsDate
    it("Given a Date object", function () {
      // Arrange
      const date = new Date("2000-12-25T03:24:00");
      // Act
      const d1 = DateHelper.LocalTimezone.toStartOfDayAsDate(date);
      const d2 = dayjs(date).startOf("day").toDate();
      // Assertion
      assert.equal(d1.toISOString(), d2.toISOString());
    });
  });

  /**
   * Method toEndOfDayAsDate 的測試案例
   */
  describe("#toEndOfDayAsDate", function () {
    // [Test case 1]
    // 使用當下時刻執行 toEndOfDayAsDate
    it("Current Time", function () {
      // Arrange
      // Act
      const d1 = DateHelper.LocalTimezone.toEndOfDayAsDate();
      const d2 = dayjs(d1).endOf("day").toDate();
      // Assertion
      assert.strictEqual(d1.toISOString(), d2.toISOString());
    });

    // [Test case 2]
    // 給予一個 Date 物件，執行 toEndOfDayAsDate
    it("Given a Date object", function () {
      // Arrange
      const date = new Date("2000-12-25T03:24:00");
      // Act
      const d1 = DateHelper.LocalTimezone.toEndOfDayAsDate(date);
      const d2 = dayjs(date).endOf("day").toDate();
      // Assertion
      assert.equal(d1.toISOString(), d2.toISOString());
    });
  });

  /**
   * Method get30DaysBeforeAsDate 的測試案例
   */
  describe("#get30DaysBeforeAsDate", function () {
    // [Test case 1] 使用當下時刻執行 get30DaysBeforeAsDate
    it("get 30 days before - without offset", function () {
      const d1 = DateHelper.LocalTimezone.get30DaysBeforeAsDate();
      const d2 = dayjs().subtract(30, "days").toDate();
      assert.equal(d1.toDateString(), d2.toDateString());
    });
    // [Test case 2] 使用當下時刻執行 get30DaysBeforeAsDate
    it("get 30 days before - with offset to startOfDay", function () {
      const d1 = DateHelper.LocalTimezone.get30DaysBeforeAsDate("startOfDay");
      const d2 = dayjs().subtract(30, "days").startOf("day").toDate();
      assert.equal(d1.toDateString(), d2.toDateString());
    });
    // [Test case 2] 使用當下時刻執行 get30DaysBeforeAsDate
    it("get 30 days before - with offset to endOfDay", function () {
      const d1 = DateHelper.LocalTimezone.get30DaysBeforeAsDate("endOfDay");
      const d2 = dayjs().subtract(30, "days").endOf("day").toDate();
      assert.equal(d1.toDateString(), d2.toDateString());
    });
  });
});
