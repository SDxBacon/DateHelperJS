import assert from "assert";
import DateHelper from "../index";
import { SERVER_TIMEZONE } from "../constants";

const DefaultTimezone = SERVER_TIMEZONE;
const CustomTimezone = "Africa/Cairo";

describe("[Module] Display", function () {
  /**
   * Method #format 的測試案例們
   */
  describe("#format", function () {
    const timestamp = "2023-01-23 12:22:33";

    // [Test case 1]
    // 給予一個時間為 2023-01-23 12:22:33 的 Date 物件
    // 預期應該得到 23/01/2023 12:22:33 PM
    it("Given a Date object", function () {
      // Arrange
      const date = new Date(timestamp);
      const expect = "23/01/2023 12:22:33 PM";
      // Act
      const output = DateHelper.Display.format(date);
      // Assertion
      assert.equal(output, expect);
    });

    // [Test case 2]
    // 給予一個時間為 2023-01-23 12:22:33 的字串
    // 預期應該得到 23/01/2023 12:22:33 PM
    it("Given a string", function () {
      // Arrange
      const string = timestamp;
      const expect = "23/01/2023 12:22:33 PM";
      // Act
      const output = DateHelper.Display.format(string);
      // Assertion
      assert.equal(output, expect);
    });
  });

  /**
   * Method #utcToFormat 的測試案例們
   */
  describe("#utcToFormat", function () {
    // [Test case 1] 使用預設伺服器時區
    // Input: 2023-02-22T00:11:22.000Z
    // Output: 21/02/2023 08:11:22 PM
    it("format 2023-02-22T00:11:22.000Z with default server timezone (UTC-4)", function () {
      // Arrange
      const utcStr = "2023-02-22T00:11:22.000Z";
      const expect = "21/02/2023 08:11:22 PM";
      DateHelper._serverTimezone = DefaultTimezone;
      // Act
      const output = DateHelper.Display.utcToFormat(utcStr);
      // Assertion
      assert.equal(output, expect);
    });

    // [Test case 2] 使用客製化伺服器時區（UTC+2)
    // Input: 2023-02-22T00:11:22.000Z
    // Output: 22/02/2023 02:11:22 AM
    it("format 2023-02-22T00:11:22.000Z with custom server timezone (UTC+2)", function () {
      // Arrange
      const utcStr = "2023-02-22T00:11:22.000Z";
      const expect = "22/02/2023 02:11:22 AM";
      DateHelper._serverTimezone = CustomTimezone;
      // Act
      const output = DateHelper.Display.utcToFormat(utcStr);
      // Assertion
      assert.equal(output, expect);
    });
  });
});
