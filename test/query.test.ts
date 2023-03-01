import assert from "assert";

import DateHelper from "..";
import { SERVER_TIMEZONE } from "../constants";

const DefaultTimezone = SERVER_TIMEZONE;
const CustomTimezone = "Africa/Cairo";

describe("[Module] Query", function () {
  //  ┌──────────────────────────┐
  //  │ Test cases               │
  //  │ default Server Timezone  │
  //  └──────────────────────────┘
  describe("#format - with default server timezone (UTC-4)", function () {
    // [Test case 1]
    // keepLocalTime 使用 `true` 以及 default 值，timestamp 應該會轉化為: 2023-02-22T00:00:00-04:00
    // 因此預期應該得到: 2023-02-22T04:00:00.000Z
    it("`keepLocalTime` use true or stay default", function () {
      // Arrange
      const expect = "2023-02-22T04:00:00.000Z";
      const timestamp = "2023-02-22T00:00:00+08:00";
      DateHelper._serverTimezone = SERVER_TIMEZONE;
      // Act
      const s1 = DateHelper.Query.format(timestamp);
      const s2 = DateHelper.Query.format(timestamp, true);
      // Assertion
      assert.deepStrictEqual(s1, expect);
      assert.deepStrictEqual(s2, expect);
    });

    // [Test case 2]
    // keepLocalTime 使用 `false`，timestamp 應該等同於下面時間:
    //   - `2023-02-22T00:00:00.000+08:00` (UTC+8)
    //   - `2023-02-21T16:00:00.000Z`      (UTC+0)
    //   - `2023-02-21T12:00:00.000-04:00` (UTC-4)
    // 預期應該得到 2023-02-21T16:00:00.000Z
    it("`keepLocalTime` use false", function () {
      // Arrange
      const expect = "2023-02-21T16:00:00.000Z";
      const timestamp = "2023-02-22T00:00:00+08:00";
      DateHelper._serverTimezone = SERVER_TIMEZONE;
      // Act & Assertion
      assert.deepStrictEqual(DateHelper.Query.format(timestamp, false), expect);
    });
  });

  //  ┌──────────────────────────┐
  //  │ Test cases               │
  //  │ Custom Server Timezone   │
  //  └──────────────────────────┘
  describe("#format - with custom server timezone (UTC+2)", function () {
    // [Test case 1]
    // keepLocalTime 使用 `true` 以及 default 值，timestamp 應該會直接被視為: 2023-02-22T00:00:00+02:00
    // 因此預期應該得到: 2023-02-21T22:00:00.000Z
    it("`keepLocalTime` use true or stay default", function () {
      // Arrange
      const expect = "2023-02-21T22:00:00.000Z";
      const timestamp = "2023-02-22T00:00:00+08:00";
      DateHelper._serverTimezone = "Africa/Cairo";
      // Act
      const s1 = DateHelper.Query.format(timestamp);
      const s2 = DateHelper.Query.format(timestamp, true);
      // Assertion
      assert.deepStrictEqual(s1, expect);
      assert.deepStrictEqual(s2, expect);
    });

    // [Test case 2]
    // keepLocalTime 使用 `false`，timestamp 應該會直接被視為:
    //   - `2023-02-22T00:00:00.000+08:00` (UTC+8)
    //   - `2023-02-21T18:00:00.000+02:00` (UTC+2)
    //   - `2023-02-21T16:00:00.000Z`      (UTC+0)
    // 預期應該得到 2023-02-21T16:00:00.000Z
    it("`keepLocalTime` use false", function () {
      // Arrange
      const expect = "2023-02-21T16:00:00.000Z";
      const timestamp = "2023-02-22T00:00:00+08:00";
      DateHelper._serverTimezone = "Africa/Cairo";
      // Act & Assertion
      assert.deepStrictEqual(DateHelper.Query.format(timestamp, false), expect);
    });
  });
});
