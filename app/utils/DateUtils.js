import moment from "moment-timezone";

export function getNextDays(limit = 5) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < limit; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const valueDate = date
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
    const displayDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = date.toLocaleDateString("en-US", { month: "short" });
    days.push({
      value: valueDate,
      label: displayDate,
      date: dayOfMonth,
      day: dayOfWeek,
      month: monthName,
    });
  }
  return days;
}
export function getNextDaysWithTimezone(limit = 5, timezone = "Asia/Kolkata") {
  const days = [];
  const today = moment().tz(timezone);

  const intervalMinutes = 30;
  const VIEW_WINDOW = { startH: 7, startM: 0, endH: 22, endM: 30 };
  const BASE_TZ = "Asia/Kolkata";
  const IST_BLOCK = { startH: 4, endH: 11 };

  function hasSlotsForDate(dateMoment) {
    const isoDate = dateMoment.clone().format("YYYY-MM-DD");
    const tzNow = moment.tz(timezone);
    const dayStart = moment.tz(isoDate, timezone).startOf("day");

    if (dayStart.isBefore(tzNow.clone().startOf("day"))) {
      return false;
    }

    const windowStart = dayStart
      .clone()
      .hour(VIEW_WINDOW.startH)
      .minute(VIEW_WINDOW.startM)
      .second(0);

    const windowEndStart = dayStart
      .clone()
      .hour(VIEW_WINDOW.endH)
      .minute(VIEW_WINDOW.endM)
      .second(0);

    function overlapsISTBlock(slotStartViewer) {
      const istStart = slotStartViewer.clone().tz(BASE_TZ);
      const istEnd = istStart.clone().add(intervalMinutes, "minutes");

      const istDayStart = istStart.clone().startOf("day");
      const blockStart = istDayStart
        .clone()
        .hour(IST_BLOCK.startH)
        .minute(0)
        .second(0);
      const blockEnd = istDayStart
        .clone()
        .hour(IST_BLOCK.endH)
        .minute(0)
        .second(0);

      return istStart.isBefore(blockEnd) && istEnd.isAfter(blockStart);
    }

    function overlapsISTSunday(slotStartViewer) {
      const istStart = slotStartViewer.clone().tz(BASE_TZ);
      const istEnd = istStart.clone().add(intervalMinutes, "minutes");
      return istStart.day() === 0 || istEnd.day() === 0; // 0 = Sunday
    }

    for (
      let s = windowStart.clone();
      s.isSameOrBefore(windowEndStart);
      s.add(intervalMinutes, "minutes")
    ) {
      if (dayStart.isSame(tzNow, "day") && s.isSameOrBefore(tzNow)) continue;
      if (overlapsISTSunday(s)) continue; // ✅ new rule
      if (overlapsISTBlock(s)) continue;

      return true; // found at least one valid slot
    }

    return false;
  }

  let added = 0;
  let i = 0;

  while (added < limit && i < limit + 10) {
    const date = today.clone().add(i, "days");

    if (hasSlotsForDate(date)) {
      days.push({
        value: date.format("MM-DD-YYYY"),
        label: date.format("MMMM DD, YYYY"),
        date: date.date(),
        day: date.format("ddd"),
        month: date.format("MMMM"),
      });

      added++;
    }

    i++;
  }

  return days;
}
