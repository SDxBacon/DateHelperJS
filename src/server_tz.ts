import dayjs, { ConfigType } from "dayjs";
import { SERVER_TIMEZONE } from "../constants";
import DateHelper from "../index";

abstract class ServerTimezoneHelper {
  /**
   * 取得伺服器時間的Date物件
   * NOTE: 由於Date物件還是有時區資訊，所以其實本函式主要是位移小時至伺服器當時的時間，但是Date物件本身還是在local timezone
   * @author Xavier
   */
  public static toServerDate(date?: ConfigType): Date {
    const tz = DateHelper._serverTimezone;

    return dayjs(date)
      .tz(tz, false) // 將時間物件位移至伺服器時區
      .tz(dayjs.tz.guess(), true) // 保留伺服器時區當下的時間，轉回當前時區
      .toDate();
  }

  // toServerISOString
  public static toServerISOString(date?: ConfigType): string {
    const tz = DateHelper._serverTimezone;
    return dayjs(date).tz(tz, false).toISOString();
  }

  /**
   * TODO:
   */
  public static toStartOfDayAsDate(
    date?: ConfigType,
    { convertToServerDate } = { convertToServerDate: false }
  ): Date {
    const d =
      (date && convertToServerDate) || !date
        ? ServerTimezoneHelper.toServerDate(date)
        : date;

    return dayjs(d).startOf("day").toDate();
  }

  /**
   * TODO:
   */
  public static toEndOfDayAsDate(
    date?: ConfigType,
    { convertToServerDate } = { convertToServerDate: false }
  ): Date {
    const d =
      (date && convertToServerDate) || !date
        ? ServerTimezoneHelper.toServerDate(date)
        : date;
    return dayjs(d).endOf("day").toDate();
  }

  /**
   * 快速取得當下伺服器時間前30天的date物件
   * TODO:
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
      return ServerTimezoneHelper.toServerDate(dSubtracted);
    }

    if (offset === "startOfDay") {
      return ServerTimezoneHelper.toStartOfDayAsDate(dSubtracted);
    } else {
      return ServerTimezoneHelper.toEndOfDayAsDate(dSubtracted);
    }
  }
}

export default ServerTimezoneHelper;
