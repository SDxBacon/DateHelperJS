/**
 * DateHelper format相關API所接受的型態
 */
export type DateHelperFormatterOption = {
  /** 顯示"小時、分鐘、秒、毫秒、AM/PM" */
  containTime?: boolean;
  /** 顯示milliseconds */
  containMilliseconds?: boolean;
  /** 是否為 12小時制 */
  is12HourClock?: boolean;
  /** 客製化format template */
  customTemplate?: string;
};

/** 伺服器時區 (UTC-4) */
export const SERVER_TIMEZONE = "America/Manaus";

/** 基礎 format string template prefix */
export const BASIC_FORMAT_PREFIX = "DD/MM/YYYY";

/** format失敗時的fallback字串 */
export const FORMAT_FALLBACK = "";
