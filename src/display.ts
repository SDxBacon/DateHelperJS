import { ConfigType } from "dayjs";
import DateHelperCore from "./core";
import { DateHelperFormatterOption } from "../constants";
import DateHelper from "../index";

const defaultFormatOption: DateHelperFormatterOption = {
  containTime: true,
  is12HourClock: true,
};

abstract class DisplayDateHelper {
  /**
   * 輸入: ConfigType
   * 輸出: 將輸入轉化為格式: `DD/MM/YYYY hh:MM:SS A` 的字串輸出
   *      e.g. 28/02/2022 05:55:55 PM
   * @description 給予可以被 dayjs 處裡的時間物件，把時間直接 format 輸出。
   * @note **不會**對輸入的 date 做任何時區的處裡
   */
  public static format(date?: ConfigType) {
    return DateHelperCore.format(date, defaultFormatOption);
  }

  /**
   * 輸入: date UTC+0 時間字串
   * 輸出: 將輸入的 UTC+0 時間字串轉化為格式: `DD/MM/YYYY hh:MM:SS A` 的字串輸出
   *
   * @description 將伺服器傳來的資料，其時間格式為 UTC+0 的字串，位移回去 ServerTimezone，然後 format
   */
  public static utcToFormat(
    /** UTC+0 時間字串 */
    date: string,
    formatOption: DateHelperFormatterOption = defaultFormatOption
  ) {
    const tz = DateHelper._serverTimezone;
    const d = DateHelperCore.toDayJs(date).tz(tz);
    return DateHelperCore.format(d, formatOption);
  }
}

export default DisplayDateHelper;
