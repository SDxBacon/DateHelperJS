import dayjs from "dayjs";
import DateHelperCore from "./core";

abstract class LocalTimezoneHelper {
  public static toStartOfDayAsDate = DateHelperCore.toStartOfDayAsDate;
  public static toEndOfDayAsDate = DateHelperCore.toEndOfDayAsDate;

  /**
   * 快速取得當前時間前30天的date物件
   * @returns
   */
  public static get30DaysBeforeAsDate(
    offset?: "startOfDay" | "endOfDay"
  ): Date {
    const d = dayjs();
    const dSubtracted = d.subtract(30, "day");
    /**
     * 如果offset沒有指定要 `startOfDay` 或 `endOfDay`
     * 直接return Date物件
     */
    if (offset === undefined) {
      return dSubtracted.toDate();
    }

    if (offset === "startOfDay") {
      return LocalTimezoneHelper.toStartOfDayAsDate(dSubtracted);
    } else {
      return LocalTimezoneHelper.toEndOfDayAsDate(dSubtracted);
    }
  }
}

export default LocalTimezoneHelper;
