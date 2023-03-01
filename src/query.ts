import { ConfigType } from "dayjs";
import DateHelperCore from "./core";
import DateHelper from "../index";

abstract class QueryDateHelper {
  /**
   * DateHelper.Query.format 函式
   * 將輸入的 Date 物件，輸出為前後端協定的時間字串格式。
   * 目前統一協調為 UTC＋0 格式。
   *
   * ### 範例
   * ---
   * [範例1]
   * - timezone: America/Manaus (UTC-4)
   * - date: `2023-02-22T00:00:00.000+08:00`
   * - keepLocalTime 為 `true`
   *
   * date 的年、月、日、時、分、秒保留，僅強制覆寫 timezone 到伺服器時區，也就是:
   * - `2023-02-22T00:00:00.000-04:00`
   *
   * 因此，輸出的 UTC+0 的值就是 `2023-02-22T04:00:00.000Z`
   *
   * [範例2]
   * - timezone: America/Manaus (UTC-4)
   * - date: `2023-02-22T00:00:00.000+08:00`
   * - keepLocalTime 為 `false`
   *
   * 轉換 date 到伺服器時區，同時會根據本地端時區、伺服器時區做小時的位移，也就是等同以下三個時間點:
   *   - `2023-02-22T00:00:00.000+08:00` (UTC+8)
   *   - `2023-02-21T16:00:00.000Z`      (UTC+0)
   *   - `2023-02-21T12:00:00.000-04:00` (UTC-4)
   *
   * 因此，輸出: `2023-02-21T16:00:00.000Z`
   */
  public static format(
    date?: ConfigType,
    /**
     * 是否維持當地時間的資訊
     * - 當 keepLocalTime 為 `true`, 將 date 的年、月、日、時、分、秒保留，僅強制覆寫 timezone 到伺服器時區
     * - 當 keepLocalTime 為 `false`,轉換 date 到伺服器時區，同時會根據本地端時區、伺服器時區做小時的位移
     */
    keepLocalTime: boolean = true
  ) {
    const d = DateHelperCore.toDayJs(date);

    return d.tz(DateHelper._serverTimezone, keepLocalTime).toISOString();
  }
}

export default QueryDateHelper;
