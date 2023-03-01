import dayjs, { ConfigType } from "dayjs";
import {
  BASIC_FORMAT_PREFIX,
  FORMAT_FALLBACK,
  DateHelperFormatterOption,
} from "../constants";

abstract class DateHelperCore {
  public static toDayJs = (date?: ConfigType) => {
    return dayjs.isDayjs(date) ? date : dayjs(date);
  };

  /**
   * 最基本＆標準的 format 函式
   * @param date
   * @param option
   * @returns
   */
  public static format(date?: ConfigType, option?: DateHelperFormatterOption) {
    // 試圖轉換輸入的date為dayjs物件,
    // 如果無法轉換, 則回傳空字串
    const d = DateHelperCore.toDayJs(date);
    if (!d.isValid()) {
      return FORMAT_FALLBACK;
    }

    // Priority 1. 如果有帶入 customTemplate, 以手動帶入的為主
    if (option?.customTemplate) {
      return d.format(option.customTemplate);
    }

    // Priority 2. 只要不給option或是option.containTime為false, 就是只顯示 "日日/月月/年年年年"
    if (!option || !option.containTime) {
      return d.format(BASIC_FORMAT_PREFIX);
    }

    // Otherwise, 開始建構format用的template
    let template: string;
    const hhmmssTemplate = option?.is12HourClock ? "hh:mm:ss" : "HH:mm:ss"; // "時時:分分:秒秒"的顯示判斷
    const millsTemplate = option?.containMilliseconds ? ".SSS" : ""; // ".SSS"毫秒的顯示判斷
    const clockTemplate = option?.is12HourClock ? " A" : ""; // "AM/PM"的顯示判斷
    template = `${BASIC_FORMAT_PREFIX} ${hhmmssTemplate}${millsTemplate}${clockTemplate}`;

    return d.format(template);
  }

  /**
   * 取得輸入date的startOf('day'), 並回傳複製的 Date 物件。
   * 若失敗，則會回傳用戶端當天的startOf('day')
   * @returns Date
   */
  public static toStartOfDayAsDate(date?: ConfigType): Date {
    const d = DateHelperCore.toDayJs(date);
    if (d.isValid()) return d.startOf("day").toDate(); // 如果是合法的dayjs物件

    return dayjs().startOf("day").toDate(); // 否則用當天替代
  }

  /**
   * 取得輸入date的endOf('day'), 並回傳複製的 Date 物件。
   * 若失敗，則會回傳用戶端當天的endOf('day')
   * @returns Date
   */
  public static toEndOfDayAsDate(date?: ConfigType): Date {
    const d = DateHelperCore.toDayJs(date);
    if (d.isValid()) return d.endOf("day").toDate(); // 如果是合法的dayjs物件

    return dayjs().endOf("day").toDate(); // 否則用當天替代
  }
}

export default DateHelperCore;
