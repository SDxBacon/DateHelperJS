import dayjs from "dayjs";
import assert from "assert";
import DateHelperCore from "../src/core";
import { FORMAT_FALLBACK } from "../constants";

describe("[Module] Core module", function () {
  // TODO:
  describe("#toDayJs", function () {});

  describe("#format", function () {
    describe("functional testing", function () {
      it("`date` use undefined", function () {
        // Arrange
        const expect = dayjs().format("DD/MM/YYYY");
        // Act
        const output1 = DateHelperCore.format();
        const output2 = DateHelperCore.format(undefined);
        // Assertion
        assert.equal(output1, expect);
        assert.equal(output2, expect);
      });
      it("`date` use null", function () {
        // Arrange
        const expect = FORMAT_FALLBACK;
        // Act
        const output = DateHelperCore.format(null);
        // Assertion
        assert.equal(output, expect);
      });
    });

    /**
     * 測試 DateHelperFormatterOption
     * TODO:
     */
    describe("DateHelperFormatterOption testing", function () {
      /** option.containTime */
      describe(".containTime", function () {});
      /** option.containMilliseconds */
      describe(".containMilliseconds", function () {});
      /** option.is12HourClock */
      describe(".is12HourClock", function () {});
      /** option.customTemplate */
      describe(".customTemplate", function () {});
    });
  });

  // TODO:
  describe("#toStartOfDayAsDate", function () {});

  // TODO:
  describe("#toEndOfDayAsDate", function () {});
});
