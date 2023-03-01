import dayjs, { ConfigType } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import customParseFormat from "dayjs/plugin/customParseFormat";

import { SERVER_TIMEZONE } from "./constants";
import DateHelperCore from "./src/core";
import QueryDateHelper from "./src/query";
import DisplayDateHelper from "./src/display";
import LocalTimezoneHelper from "./src/local_tz";
import ServerTimezoneHelper from "./src/server_tz";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

class DateHelper {
  public _serverTimezone: string = SERVER_TIMEZONE;

  public setServerTimezone(tz: string) {
    this._serverTimezone = tz;
  }

  /**
   * Display module
   */
  public Display = DisplayDateHelper;

  /**
   * Query module
   */
  public Query = QueryDateHelper;

  /**
   * ServerTimezone module
   */
  public LocalTimezone = LocalTimezoneHelper;

  /**
   * ServerTimezone module
   */
  public ServerTimezone = ServerTimezoneHelper;

  //
  public toDayJs = DateHelperCore.toDayJs;

  /**
   * expose DateHelperCore.format
   */
  public format = DateHelperCore.format;

  /**
   * 取得輸入date的startOf('day'), 並回傳複製的 Date 物件。
   * 若失敗，則會回傳用戶端當天的startOf('day')
   * @returns Date
   */
  public toStartOfDayAsDate = DateHelperCore.toStartOfDayAsDate;

  /**
   * 取得輸入date的endOf('day'), 並回傳複製的 Date 物件。
   * 若失敗，則會回傳用戶端當天的endOf('day')
   * @returns Date
   */
  public toEndOfDayAsDate = DateHelperCore.toEndOfDayAsDate;
}

const instance = new DateHelper();

export * from "./constants";

export default instance;
