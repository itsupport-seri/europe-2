"use client";
import React, { useEffect, useMemo, useState } from "react";

import TimeZones from "@constants/TimeZones";
import { getLocation } from "@utils/ApiUtils";
import CountriesConstant from "@constants/CountryConstant";
import Select from "@components/common/ClientSelect";
import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range.js";
import { GradesConstant } from "@constants/Constants";
import { PhoneOptionsConstants } from "@constants/FormConstants";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  base64Encode,
  extractNameParts,
  fillBrowserDetail,
  getCookie,
} from "@utils/BrowserUtils";
import { useRouter } from "next/navigation";
import { getNextDaysWithTimezone } from "@utils/DateUtils";
import { ChevronLeft, ChevronRight, Clock, Globe2, PenBox } from "lucide-react";

export default function CalenderForm({
  folderName = "demo",
  url = "https://leads.internationalschooling.org/api/v1/common/reqeust-demo-content",
  uiVariant = "legacy",
  meetingHost = "International Schooling UAE",
  meetingTitle = "Book Demo",
  meetingDurationMinutes = 30,
  meetingDescription = "",
}) {
  const router = useRouter();
  const [mode, setMode] = useState("demo");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const computeMode = () => {
      const hash = (window.location.hash || "").toLowerCase();
      setMode(hash === "#callback" ? "callback" : "demo");
    };
    computeMode();
    window.addEventListener("hashchange", computeMode);
    return () => window.removeEventListener("hashchange", computeMode);
  }, []);

  useEffect(() => {
    const handleMessage = function (e) {
      if (e.data && e.data.event && e.data.event === 'calendly.event_scheduled') {
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq('track', 'Lead');
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  const dateSkeletonBlocks = Array.from({ length: 8 });
  const [details, setDetails] = useState({
    name: "",
    prefix: "",
    email: "",
    phoneCode: "",
    phone: "",
    grade: "",
    standardId: "",
    os: "",
    ip: "",
    phoneCountryId: "",
    country: {},
    stage: 1,
    location: {},
    selectedSlot: {
      date: "",
      startTime: "",
      endTime: "",
      dateLabel: "",
    },
    dates: [],
    slots: [],
    timezone: "",
    language: "English",
    loading: false,
  });
  const [calendarMonth, setCalendarMonth] = useState(() =>
    moment().startOf("month"),
  );

  const timeSlotsRef = React.useRef(null);
  const stageTwoRef = React.useRef(null);

  const scrollToElementWithOffset = (element, offset = 0) => {
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const getStickyHeaderOffset = () => {
    if (typeof document === "undefined") return 96;
    const stickyHeader =
      document.querySelector("header.sticky") || document.querySelector("header");
    if (!stickyHeader) return 96;
    return stickyHeader.getBoundingClientRect().height + 16;
  };

  useEffect(() => {
    if (details.selectedSlot.date && timeSlotsRef.current) {
      if (window.innerWidth < 1024) {
        scrollToElementWithOffset(timeSlotsRef.current, getStickyHeaderOffset());
      }
    }
  }, [details.selectedSlot.date]);

  useEffect(() => {
    if (details.stage !== 2) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 1024) return;

    const node = stageTwoRef.current || document.getElementById("stage-two");
    if (!node) return;

    requestAnimationFrame(() => {
      scrollToElementWithOffset(node, getStickyHeaderOffset());
    });
  }, [details.stage]);

  const availableDateValues = useMemo(
    () => new Set(details.dates.map((item) => item.value)),
    [details.dates],
  );

  const selectedDateMoment = useMemo(() => {
    if (!details.selectedSlot.date) {
      return null;
    }

    if (details.timezone) {
      return moment.tz(details.selectedSlot.date, "MM-DD-YYYY", details.timezone);
    }

    return moment(details.selectedSlot.date, "MM-DD-YYYY");
  }, [details.selectedSlot.date, details.timezone]);

  const timeZoneOptions = TimeZones.map((item) => ({
    value: item.value,
    label: item.value,
  }));
  const inputClassName =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base md:text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
  const selectFieldClassName = `${inputClassName} pr-10`;
  const helperLabelClassName =
    "mb-2 flex items-center gap-2 text-xs font-semibold ml-4 text-slate-500";
  const getSelectControlStyles = (base, state) => ({
    ...base,
    backgroundColor: "#ffffff",
    borderColor: state.isFocused ? "#3b82f6" : "#cbd5e1",
    borderRadius: "1rem",
    boxShadow: state.isFocused
      ? "0 0 0 4px rgba(59,130,246,0.12)"
      : "0 1px 2px rgba(15,23,42,0.04)",
    minHeight: "3.25rem",
    paddingInline: "0.25rem",
    transition: "all 150ms ease",
    ":hover": {
      borderColor: state.isFocused ? "#3b82f6" : "#94a3b8",
    },
  });
  const sharedSelectStyles = {
    control: (base, state) => getSelectControlStyles(base, state),
    menu: (base) => ({
      ...base,
      marginTop: "0.5rem",
      borderRadius: "1rem",
      border: "1px solid #cbd5e1",
      overflow: "hidden",
      boxShadow: "0 20px 50px -30px rgba(15,23,42,0.45)",
      zIndex: 50,
    }),
    menuList: (base) => ({
      ...base,
      paddingBlock: "0.4rem",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#dbeafe"
        : state.isFocused
          ? "#eff6ff"
          : "#ffffff",
      color: "#0f172a",
      padding: "0.75rem 0.9rem",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#0f172a",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#64748b",
    }),
    input: (base) => ({
      ...base,
      color: "#0f172a",
    }),
    valueContainer: (base) => ({
      ...base,
      paddingInline: "0.5rem",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? "#2563eb" : "#64748b",
      paddingInline: "0.5rem",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };
  const phoneSelectStyles = {
    ...sharedSelectStyles,
    control: (base, state) => ({
      ...getSelectControlStyles(base, state),
      minHeight: "3.25rem",
      minWidth: "8rem",
    }),
  };

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    let detectedOS = "Unknown";
    if (/Win/i.test(platform)) {
      detectedOS = "Windows";
    } else if (/Mac/i.test(platform)) {
      detectedOS = "MacOS";
    } else if (/Linux/i.test(platform)) {
      detectedOS = "Linux";
    } else if (/Android/i.test(userAgent)) {
      detectedOS = "Android";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      detectedOS = "iOS";
    }
    const fetchLocation = async () => {
      try {
        const result = await getLocation();
        const countryDetails = CountriesConstant.find(
          (item) => item.value === result.country,
        );
        setDetails((prev) => ({
          ...prev,
          location: result,
          ip: result?.query || "",
          timezone: result?.timezone || prev.timezone || "",
          ...(countryDetails && {
            country: {
              id: countryDetails.custom_country_value,
              name: countryDetails.value,
            },
            phoneCode: countryDetails.custom_dial_code,
            phoneCountryId:
              countryDetails.custom_dial_code +
              " " +
              countryDetails.custom_country_value,
          }),
          os: detectedOS,
        }));
      } catch (e) {
        setDetails((prev) => ({ ...prev, os: detectedOS }));
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (!details.timezone) {
      return;
    }
    setDetails((prev) => ({
      ...prev,
      dates: getNextDaysWithTimezone(8, details.timezone),
      selectedSlot: {
        date: "",
        startTime: "",
        endTime: "",
        dateLabel: "",
      },
      slots: [],
    }));
  }, [details.timezone]);

  useEffect(() => {
    if (!details.timezone) {
      return;
    }

    if (details.selectedSlot.date) {
      setCalendarMonth(
        moment
          .tz(details.selectedSlot.date, "MM-DD-YYYY", details.timezone)
          .startOf("month"),
      );
      return;
    }

    if (details.dates.length > 0) {
      setCalendarMonth(
        moment.tz(details.dates[0].value, "MM-DD-YYYY", details.timezone).startOf(
          "month",
        ),
      );
      return;
    }

    setCalendarMonth(moment().tz(details.timezone).startOf("month"));
  }, [details.dates, details.selectedSlot.date, details.timezone]);

  useEffect(() => {
    if (!details.selectedSlot.date) return;

    const intervalMinutes = 30;
    const VIEW_WINDOW = { startH: 7, startM: 0, endH: 22, endM: 30 };
    const BASE_TZ = "Asia/Kolkata";
    const IST_BLOCK = { startH: 4, endH: 11 };

    const isoDate = moment(details.selectedSlot.date, [
      "MM-DD-YYYY",
      "YYYY-MM-DD",
    ]).format("YYYY-MM-DD");
    const tzNow = moment.tz(details.timezone);
    const dayStart = moment.tz(isoDate, details.timezone).startOf("day");

    if (dayStart.isBefore(tzNow.clone().startOf("day"))) {
      setDetails((prev) => ({ ...prev, slots: [] }));
      return;
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

    const overlapsISTBlock = (slotStartViewer) => {
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
    };

    const overlapsISTSunday = (slotStartViewer) => {
      const istStart = slotStartViewer.clone().tz(BASE_TZ);
      const istEnd = istStart.clone().add(intervalMinutes, "minutes");
      return istStart.day() === 0 || istEnd.day() === 0;
    };

    const out = [];
    for (
      let s = windowStart.clone();
      s.isSameOrBefore(windowEndStart);
      s.add(intervalMinutes, "minutes")
    ) {
      if (dayStart.isSame(tzNow, "day") && s.isSameOrBefore(tzNow)) continue;
      if (overlapsISTSunday(s)) continue;
      if (overlapsISTBlock(s)) continue;

      const e = s.clone().add(intervalMinutes, "minutes");
      out.push({
        meetingDate: s.format("MMMM DD, YYYY"),
        startTime: s.format("hh:mm A"),
        endTime: e.format("hh:mm A"),
        stTime: s.format("HH:mm:ss"),
      });
    }

    setDetails((prev) => ({ ...prev, slots: out }));
  }, [details.selectedSlot?.date, details.timezone]);

  function validateForm() {
    if (!details.selectedSlot.date || !details.selectedSlot.startTime) {
      toast.error("Please select a date and time slot.");
      return false;
    }

    if (!details.timezone) {
      toast.error("Please select your timezone.");
      return false;
    }

    if (!details.prefix || details.prefix === "--") {
      toast.error("Please select a prefix (Mr./Ms./Mrs.).");
      return false;
    }

    if (!details.name || !details.name.trim()) {
      toast.error("Please enter your full name.");
      return false;
    }

    var trimmedName = details.name.trim();
    var nameParts = trimmedName.split(/\s+/);
    var firstName = nameParts[0];

    if (firstName.length < 2) {
      toast.error("First name must be at least 2 characters.");
      return false;
    }

    if (!details.grade) {
      toast.error("Please choose the student's grade.");
      return false;
    }

    if (!details.email || !details.email.trim()) {
      toast.error("Please enter your email address.");
      return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(details.email.trim())) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!details.phoneCountryId) {
      toast.error("Please select your country code.");
      return false;
    }

    if (!details.phone || !details.phone.trim()) {
      toast.error("Please enter your mobile number.");
      return false;
    }

    if (details.phone.length < 7) {
      toast.error("Please enter a valid mobile number.");
      return false;
    }

    if (!details.language) {
      toast.error("Please select your preferred language.");
      return false;
    }

    return true;
  }
  function isSelectedSlotExpired() {
    if (
      !details.timezone ||
      !details.selectedSlot.date ||
      !details.selectedSlot.startTime
    ) {
      return false;
    }
    const isoDate = moment(details.selectedSlot.date, [
      "MM-DD-YYYY",
      "YYYY-MM-DD",
    ]).format("YYYY-MM-DD");
    const slotStart = moment.tz(
      `${isoDate} ${details.selectedSlot.startTime}`,
      "YYYY-MM-DD hh:mm A",
      details.timezone,
    );
    if (!slotStart.isValid()) return true;
    return slotStart.isSameOrBefore(moment.tz(details.timezone));
  }

  async function handleSubmit() {
    if (details.loading) return;
    if (isSelectedSlotExpired()) {
      toast.error("Selected slot is no longer available. Please choose again.");
      setDetails((prev) => ({
        ...prev,
        stage: 1,
        selectedSlot: {
          date: "",
          startTime: "",
          endTime: "",
          dateLabel: "",
        },
        slots: [],
      }));
      return;
    }

    var isValid = validateForm();
    if (!isValid) return;

    try {
      setDetails(function (prev) {
        return { ...prev, loading: true };
      });

      var names = extractNameParts(details.prefix, details.name);
      var meetingDate = details.selectedSlot.dateLabel;
      var meetingSlotTime =
        details.selectedSlot.startTime + "-" + details.selectedSlot.endTime;

      var isCallbackMode = mode === "callback";
      var endpoint = isCallbackMode
        ? "https://leads.internationalschooling.org/request-callback"
        : url;

      var requestPayload = isCallbackMode
        ? {
            firstName: names.formattedName,
            lastName: names.lastName,
            email: details.email,
            isdCode: details.phoneCode,
            contactNumber: details.phone,
            browserDetails: fillBrowserDetail(),
            timeZone: details.timezone,
            language: details.language,
            meetingDate: meetingDate,
            callSlotTime: details.selectedSlot.startTime,
            standardId: details.standardId,
            countryId:
              details.country && details.country.id ? details.country.id : "",
            location: JSON.stringify(details.location || {}),
            campaignName: folderName,
            grade: details.grade,
            os: details.os,
            ip: details.ip,
            source: getCookie("original_source"),
            landingUrl:
              getCookie("lu") ||
              `https://europe.internationalschooling.org/${folderName}`,
            servingBaseUrl:
              "https://sms.internationalschooling.org/international-schooling/",
            schoolId: 1,
            utmSource: getCookie("us"),
            utmMedium: getCookie("um"),
            utmDescription: getCookie("uc"),
            originalUrl: `https://europe.internationalschooling.org/${folderName}`,
            gclid: getCookie("gclid"),
            utmCampaign:
              getCookie("ucam") === "Test" ? folderName : getCookie("ucam"),
            utmTerm: getCookie("ut"),
          }
        : {
            name: names.formattedName,
            lastName: names.lastName,
            parentEmail: details.email,
            requestCallFrom: "DEMO",
            language: details.language,
            isdCode: details.phoneCode,
            contactNumber: details.phone,
            browserDetails: fillBrowserDetail(),
            demoCode: "",
            os: details.os,
            ip: details.ip,
            timeZone: details.timezone,
            studentTimeZone: details.timezone,
            meetingDate: meetingDate,
            meetingSlotTime: meetingSlotTime,
            moduleName: "BOOKMEETING_NEW",
            grade: details.grade,
            standardId: details.standardId,
            countryId:
              details.country && details.country.id ? details.country.id : "",
            countryName:
              details.country && details.country.name ? details.country.name : "",
            location: JSON.stringify(details.location || {}),
            campaignName: folderName,
            source: getCookie("original_source"),
            landingUrl:
              getCookie("lu") ||
              "https://europe.internationalschooling.org/" + folderName,
            servingBaseUrl:
              "https://sms.internationalschooling.org/international-schooling/",
            schoolId: 1,
            utmSource: getCookie("us"),
            utmMedium: getCookie("um"),
            utmDescription: getCookie("uc"),
            originalUrl: `https://europe.internationalschooling.org/${folderName}`,
            cu: `https://europe.internationalschooling.org/${folderName}`,
            gclid: getCookie("gclid"),
            utmCampaign:
              getCookie("ucam") === "Test" ? folderName : getCookie("ucam"),
            utmTerm: getCookie("ut"),
          };

      var res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      var result = await res.json();

      if (isCallbackMode) {
        if (result.status !== "success") {
          toast.error(result.message || "Unable to schedule callback. Please try again.");
          setDetails(function (prev) {
            return { ...prev, loading: false };
          });
          return;
        }

        toast.success(result.message || "Callback scheduled successfully!");

        var cbQuery = "";
        if (details.name) cbQuery += `?dn=${base64Encode(details.name)}`;
        if (details.timezone) cbQuery += `&tz=${base64Encode(details.timezone)}`;
        if (meetingDate)
          cbQuery += `&md=${base64Encode(meetingDate + " " + details.selectedSlot.startTime)}`;
        if (details.phoneCode) cbQuery += `&phc=${base64Encode(details.phoneCode)}`;
        if (details.phone) cbQuery += `&phn=${base64Encode(details.phone)}`;

        var cbRedirect = `https://internationalschooling.org/callback-thankyou/${cbQuery}`;

        if (typeof window !== "undefined") {
          if (window.fbq) {
            window.fbq("track", "Lead");
          }
          setTimeout(() => {
            window.location.replace(cbRedirect);
          }, 250);
          return;
        }

        router.replace(cbRedirect);
        return;
      }

      if (result.status === "0" || result.status === "2") {
        await sendNotification(requestPayload);
        toast.error(result.message);

        setDetails(function (prev) {
          return { ...prev, loading: false };
        });

        if (
          result.message ===
          "This time slot has been booked. Please select another time."
        ) {
          setDetails(function (prev) {
            return { ...prev, stage: 1 };
          });
        }
      } else {
        toast.success(result.message);

        var redirectUrl = "";
        var queryString = "";

        if (details.name) queryString += `?dn=${base64Encode(details.name)}`;
        if (details.grade) queryString += `&dg=${base64Encode(details.grade)}`;
        if (details.country)
          queryString += `&de=${base64Encode(details.country.countryName)}`;
        if (result.email) queryString += `&dc=${base64Encode(result.email)}`;
        if (result.type) queryString += `&t=${base64Encode(result.type)}`;
        if (result.schoolPersonId)
          queryString += `&spId=${base64Encode(result.schoolPersonId)}`;
        if (result.meetingId)
          queryString += `&mId=${base64Encode(result.meetingId)}`;
        if (result.timeZone)
          queryString += `&tz=${base64Encode(result.timeZone)}`;
        if (result.eventId)
          queryString += `&eId=${base64Encode(result.eventId)}`;
        if (details.phoneCode)
          queryString += `&phc=${base64Encode(details.phoneCode)}`;
        if (details.phone) queryString += `&phn=${base64Encode(details.phone)}`;
        if (result.startDate)
          queryString += `&sd=${base64Encode(result.startDate)}`;
        if (result.endDate)
          queryString += `&ed=${base64Encode(result.endDate)}`;
        if (getCookie("us")) queryString += `&utm_source=${getCookie("us")}`;
        if (getCookie("um")) queryString += `&utm_medium=${getCookie("um")}`;
        if (getCookie("ucam"))
          queryString += `&utm_campaign=${getCookie("ucam")}`;
        if (getCookie("uc")) queryString += `&utm_content=${getCookie("uc")}`;
        if (getCookie("ut")) queryString += `&utm_term=${getCookie("ut")}`;

        const gclidVal = getCookie("gclid");
        if (gclidVal) {
          if (getCookie("original_source") === "META") {
            queryString += `&fbclid=${gclidVal}`;
          } else {
            queryString += `&gclid=${gclidVal}`;
          }
        }
        redirectUrl = `https://internationalschooling.org/is-demo-thankyou/${queryString}`;
        if (folderName === "brochure") {
          redirectUrl = `https://internationalschooling.org/brochure-thankyou/${queryString}`;
        }

        if (typeof window !== "undefined") {
          if (window.fbq) {
            window.fbq('track', 'Lead');
          }
          // add a small timeout so the pixel fires before replacing location
          setTimeout(() => {
            window.location.replace(redirectUrl);
          }, 250);
          return;
        }

        router.replace(redirectUrl);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error && error.message
          ? error.message
          : "Unable to submit the form. Please try again.",
      );
      setDetails(function (prev) {
        return { ...prev, loading: false };
      });
    }
  }

  const renderCalendlyVariant = () => {
    const monthStart = calendarMonth.clone().startOf("month");
    const gridStart = monthStart.clone().startOf("isoWeek");
    const gridEnd = monthStart.clone().endOf("month").endOf("isoWeek");
    const gridDays = [];
    for (
      let day = gridStart.clone();
      day.isSameOrBefore(gridEnd, "day");
      day.add(1, "day")
    ) {
      gridDays.push(day.clone());
    }

    const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
      <div className="rounded-3xl border border-slate-200 bg-white ">
        <div className="grid md:grid-cols-[22rem_minmax(0,1fr)]">
          <aside className="border-b border-slate-200 p-6 md:border-b-0 md:border-r">
            <div className="space-y-3">
              {/* <div className="space-y-1 md:text-start text-center">
                <h2 className="text-2xl font-semibold text-blue-800">
                  {meetingTitle}
                </h2>
              </div> */}
              {details.selectedSlot.date && details.selectedSlot.startTime ? (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-slate-600">

                  <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    {details.selectedSlot.dateLabel}, {details.selectedSlot.startTime}
                  </span>
                </div>
              ) : null}
              <div className=" text-sm font-semibold text-slate-800 md:text-start text-center">
                In Just 30 Mins Live Meeting, you will get:
              </div>
              <ul className="mt-3 space-y-3 text-sm text-slate-700 w-max mx-auto md:mx-0">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> <span>School Accreditations & Recognition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> <span>Right Learning Program</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> <span>Benefits of the american curriculum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> <span>Transcript & High School Diploma</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> <span>Easy School Fee Options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> <span>College & University Support</span>
                </li>
              </ul>

              {meetingDescription ? (
                <p className="text-sm leading-6 text-slate-600">
                  {meetingDescription}
                </p>
              ) : null}

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">
                  Time Zone
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Globe2 size={16} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-800">
                    {details.timezone || "Detecting..."}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          <div className="p-6">
            <h3 id={"book-demo"} className="text-center md:text-start text-xl font-semibold text-slate-900">
              {!details.selectedSlot.date ? "Select a date" : ""}
            </h3>

            {details.selectedSlot.date ? (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:w-max">
                <div className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">
                    {details.selectedSlot.dateLabel}
                  </span>
                  {details.selectedSlot.startTime ? (
                    <>
                      <span className="mx-2 text-slate-400">•</span>
                      <span className="font-semibold text-slate-900">
                        {details.selectedSlot.startTime} - {details.selectedSlot.endTime}
                      </span>
                    </>
                  ) : null}
                </div>

                {details.stage === 2 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setDetails((prev) => ({
                        ...prev,
                        stage: 1,
                        selectedSlot: {
                          date: prev.selectedSlot.date,
                          dateLabel: prev.selectedSlot.dateLabel,
                          startTime: "",
                          endTime: "",
                        },
                      }));
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Edit slot
                    <PenBox size={14} />
                  </button>
                ) : null}
              </div>
            ) : null}

            {details.stage === 1 ? (
              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth((prev) => prev.clone().subtract(1, "month"))
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div className="text-sm font-semibold text-slate-900">
                      {monthStart.format("MMMM YYYY")}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth((prev) => prev.clone().add(1, "month"))
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
                      aria-label="Next month"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {weekDayLabels.map((label) => (
                      <div key={label} className="py-2">
                        {label}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {gridDays.map((dayMoment) => {
                      const inMonth = dayMoment.isSame(monthStart, "month");
                      const value = dayMoment.format("MM-DD-YYYY");
                      const isAvailable = availableDateValues.has(value);
                      const isSelected = details.selectedSlot.date === value;

                      if (!inMonth) {
                        return <div key={value} className="h-11" aria-hidden="true" />;
                      }

                      return (
                        <button
                          key={value}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => {
                            setDetails((prev) => ({
                              ...prev,
                              selectedSlot: {
                                date: value,
                                dateLabel: dayMoment.format("MMMM DD, YYYY"),
                                startTime: "",
                                endTime: "",
                              },
                            }));
                          }}
                          className={[
                            "h-11 rounded-full text-sm font-semibold transition",
                            isSelected
                              ? "bg-blue-600 text-white shadow-[0_18px_30px_-24px_rgba(37,99,235,0.9)]"
                              : isAvailable
                                ? "text-slate-900 hover:bg-blue-50"
                                : "cursor-not-allowed text-slate-300",
                          ].join(" ")}
                          aria-current={isSelected ? "date" : undefined}
                        >
                          {dayMoment.date()}
                        </button>
                      );
                    })}
                  </div>

                  <div className="hidden mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className={helperLabelClassName} htmlFor="timezone-select">
                      <Globe2 size={14} />
                      Time Zone
                    </label>
                    <Select
                      instanceId={"timezone-select"}
                      inputId="timezone-select"
                      options={timeZoneOptions}
                      value={
                        timeZoneOptions.find(
                          (option) => option.value === details.timezone,
                        ) || null
                      }
                      onChange={(selected) => {
                        setDetails((prev) => ({
                          ...prev,
                          timezone: selected?.value || "",
                          stage: 1,
                          selectedSlot: {
                            date: "",
                            startTime: "",
                            endTime: "",
                            dateLabel: "",
                          },
                          slots: [],
                        }));
                      }}
                      className="w-full text-sm"
                      classNamePrefix="react-select"
                      styles={sharedSelectStyles}
                      placeholder="Select your timezone"
                    />
                  </div>
                </div>

                <div className="lg:border-l lg:border-slate-200 lg:pl-6" ref={timeSlotsRef}>
                  {selectedDateMoment && <div className="text-center text-sm font-semibold text-slate-900">
                    {selectedDateMoment.format("dddd, MMMM D")}
                  </div>}
                  {selectedDateMoment && (
                    <p className="mt-1 text-center animate-bounce text-sm text-slate-500">
                      Select a time
                    </p>
                  )}
                  <div className="mt-3 max-h-[22rem] space-y-2 overflow-y-auto pr-1">
                    {details.selectedSlot.date ? (
                      details.slots.length > 0 ? (
                        details.slots.map((item, index) => (
                          <button
                            key={`${item.startTime}-${index}`}
                            type="button"
                            onClick={() => {
                              setDetails((prev) => ({
                                ...prev,
                                selectedSlot: {
                                  date: prev.selectedSlot.date,
                                  dateLabel: prev.selectedSlot.dateLabel,
                                  startTime: item.startTime,
                                  endTime: item.endTime,
                                },
                                stage: 2,
                              }));
                            }}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-blue-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
                          >
                            {item.startTime}
                          </button>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
                          No time slots are available for this date. Please choose
                          another date.
                        </div>
                      )
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
                        Pick a date on the left to see available times.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                id="stage-two"
                ref={stageTwoRef}
                className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex gap-2 md:gap-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <div>
                    <label className={helperLabelClassName} htmlFor="prefix">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="prefix"
                      id="prefix"
                      value={details.prefix}
                      onChange={(e) =>
                        setDetails((prev) => ({
                          ...prev,
                          prefix: e.target.value,
                        }))
                      }
                      className={`${selectFieldClassName} px-1! ${details.prefix === "" ? "text-gray-400!" : "text-black"
                        }`}
                    >
                      <option value="" disabled>
                        Mr/Mrs
                      </option>

                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className={helperLabelClassName} htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="fullName"
                      id="fullName"
                      placeholder="Enter your full name"
                      value={details.name}
                      onChange={(e) =>
                        setDetails((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className={helperLabelClassName} htmlFor="grade">
                    Student Grade <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    value={details.grade}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      const selectedGrade = GradesConstant.find(
                        (grade) => grade.value === selectedValue,
                      );
                      if (selectedGrade) {
                        setDetails((prev) => ({
                          ...prev,
                          standardId: selectedGrade.value,
                          grade: selectedGrade.value,
                        }));
                      }
                    }}
                    className={selectFieldClassName}
                  >
                    <option value="" disabled>
                      Choose Grade
                    </option>
                    {GradesConstant.map((grade, index) => (
                      <option key={index} value={grade.value}>
                        {grade.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <label htmlFor="email" className={helperLabelClassName}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    autoComplete="email"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={details.email}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className={inputClassName}
                  />
                </div>

                <div className="mt-4 grid items-start gap-4 sm:grid-cols-[10.5rem_minmax(0,1fr)]">
                  <div>
                    <label htmlFor="phoneCode" className={helperLabelClassName}>
                      Country Code <span className="text-red-500">*</span>
                    </label>
                    <Select
                      instanceId={"phonecode-select"}
                      inputId="phoneCode"
                      options={PhoneOptionsConstants}
                      value={PhoneOptionsConstants.find(
                        (opt) => opt.value === details.phoneCountryId,
                      )}
                      onChange={(option) =>
                        setDetails((prev) => ({
                          ...prev,
                          phoneCountryId: option.value,
                          phoneCode: option.value.split(" ")[0],
                        }))
                      }
                      classNamePrefix="react-select"
                      styles={phoneSelectStyles}
                    />
                  </div>

                  <div className="flex-1">
                    <label htmlFor="phone" className={helperLabelClassName}>
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      autoComplete="mobile tel"
                      maxLength={15}
                      id="phone"
                      placeholder="Enter your mobile number"
                      value={details.phone}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, "");
                        setDetails((prev) => ({
                          ...prev,
                          phone: numericValue,
                        }));
                      }}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className={helperLabelClassName} htmlFor="language">
                    Preferred Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="language"
                    id="language"
                    required
                    value={details.language}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        language: e.target.value,
                      }))
                    }
                    className={selectFieldClassName}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>

                <button
                  disabled={details.loading}
                  type="submit"
                  className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_-24px_rgba(37,99,235,0.9)] transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-blue-400"
                >
                  {details.loading ? "Submitting" : "Book Now"}
                  {details.loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : null}
                </button>

                <p className="mt-4 text-[11px] leading-5 text-slate-500">
                  By submitting this form, I am giving my consent to International
                  Schooling to contact me for further details related to their
                  programs. To know more about International Schooling, please
                  read our{" "}
                  <Link
                    target="_blank"
                    className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-2 transition hover:text-blue-800"
                    href={"https://internationalschooling.org/privacy-policy"}
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (uiVariant === "calendly") {
    return (
      <div className="relative z-20 overflow-hidden text-black">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          id="calender-form"
          className="py-5 text-start sm:py-6"
        >
          {renderCalendlyVariant()}
        </form>
      </div>
    );
  }

  return (
    <div className="relative z-20 overflow-hidden text-black">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        id="calender-form"
        className="space-y-5 py-5 text-start sm:py-6"
      >
        <section className="space-y-3 hidden">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
            <label className={helperLabelClassName} htmlFor="timezone-select">
              <Globe2 size={14} />
              Your Time Zone
            </label>
            <Select
              instanceId={"timezone-select"}
              inputId="timezone-select"
              options={timeZoneOptions}
              value={
                timeZoneOptions.find(
                  (option) => option.value === details.timezone,
                ) || null
              }
              onChange={(selected) => {
                setDetails((prev) => ({
                  ...prev,
                  timezone: selected?.value || "",
                  stage: 1,
                  selectedSlot: {
                    date: "",
                    startTime: "",
                    endTime: "",
                    dateLabel: "",
                  },
                  slots: [],
                }));
              }}
              className="w-full text-sm"
              classNamePrefix="react-select"
              styles={sharedSelectStyles}
              placeholder="Select your timezone"
            />
          </div>
        </section>

        <section className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-4 sm:p-5 space-y-4">
          {!details.selectedSlot.date && (
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="w-full">
                <h4 className="mt-1 md:text-lg font-medium text-slate-900 text-center">
                  Choose a Day & Time that works for you
                  <br />
                  We&apos;ll take care of the rest
                </h4>
              </div>
            </div>
          )}
          {details.selectedSlot.date && (
            <div className="rounded-[22px] border border-blue-100 bg-white px-4 py-4">
              <div
                aria-live="polite"
                className="flex flex-wrap items-center gap-2 text-sm"
              >
                {details.selectedSlot.date ? (
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 font-medium text-blue-700">
                    {details.selectedSlot.dateLabel}
                  </span>
                ) : (
                  <span className="text-slate-500">
                    Pick a date below to begin.
                  </span>
                )}
                {details.selectedSlot.startTime ? (
                  <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 font-medium text-emerald-700">
                    {details.selectedSlot.startTime} -{" "}
                    {details.selectedSlot.endTime}
                  </span>
                ) : details.selectedSlot.date ? (
                  <span className="text-slate-500">
                    Now choose a time slot.
                  </span>
                ) : null}

                {details.stage === 2 && (
                  <button
                    type="button"
                    onClick={() => {
                      setDetails((prev) => ({
                        ...prev,
                        stage: 1,
                        selectedSlot: {
                          date: prev.selectedSlot.date,
                          dateLabel: prev.selectedSlot.dateLabel,
                          startTime: "",
                          endTime: "",
                        },
                      }));
                    }}
                    className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    Edit slot
                    <PenBox size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {details.stage === 1 ? (
            <div className="mt-5 space-y-5">
              <div>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {details.dates.length > 0
                    ? details.dates.map((item, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => {
                          setDetails((prev) => ({
                            ...prev,
                            selectedSlot: {
                              date: item.value,
                              dateLabel: item.label,
                              startTime: "",
                              endTime: "",
                            },
                          }));
                        }}
                        className={`${details.selectedSlot.date === item.value
                          ? "border-blue-600 bg-blue-600 text-white shadow-[0_18px_30px_-24px_rgba(37,99,235,0.85)]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                          } rounded-[22px] border px-2 py-3 text-center transition`}
                      >
                        <h3
                          className={`text-2xl font-semibold leading-none ${details.selectedSlot.date === item.value
                            ? "text-white"
                            : "text-slate-900"
                            }`}
                        >
                          {item.date}
                        </h3>
                        <h4 className="mt-1 text-xs font-semibold uppercase tracking-[0.12em]">
                          {item.month.slice(0, 3)}
                        </h4>
                        <h4 className="mt-1 text-[11px]">{item.day}</h4>
                      </button>
                    ))
                    : dateSkeletonBlocks.map((_, index) => (
                      <div
                        key={`date-skeleton-${index}`}
                        className="h-22 animate-pulse rounded-[22px] border border-slate-200 bg-white"
                      />
                    ))}
                </div>
              </div>

              {details.selectedSlot.date && (
                <div>
                  <p className="text-xs mb-4 font-semibold uppercase text-center tracking-[0.16em] text-slate-500">
                    Select Time for Demo
                  </p>

                  <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
                    {details.slots.map((item, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => {
                          setDetails((prev) => ({
                            ...prev,
                            selectedSlot: {
                              date: prev.selectedSlot.date,
                              dateLabel: prev.selectedSlot.dateLabel,
                              startTime: item.startTime,
                              endTime: item.endTime,
                            },
                            stage: 2,
                          }));
                        }}
                        className={` ${details.selectedSlot?.startTime === item.startTime
                          ? "border-blue-600 bg-blue-600 text-white "
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                          } rounded-2xl border px-3 py-3 text-center text-sm font-medium transition`}
                      >
                        {item.startTime}
                      </button>
                    ))}

                    {details.slots.length === 0 && (
                      <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
                        No time slots are available for this date. Please choose
                        another date.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </section>

        {details.stage === 2 ? (
          <section
            id="stage-two"
            ref={stageTwoRef}
            className="rounded-[26px] border border-blue-100 bg-blue-50/40 p-4 sm:p-5"
          >
            <div className="mt-5 space-y-4 text-start">
              <div className="grid gap-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
                <div>
                  <label className={helperLabelClassName} htmlFor="prefix">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="prefix"
                    id="prefix"
                    value={details.prefix}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        prefix: e.target.value,
                      }))
                    }
                    className={selectFieldClassName}
                  >
                    <option value=""></option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className={helperLabelClassName} htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your full name"
                    value={details.name}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className={inputClassName}
                  />
                </div>
              </div>

              <div>
                <label className={helperLabelClassName} htmlFor="grade">
                  Student Grade <span className="text-red-500">*</span>
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={details.grade}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedGrade = GradesConstant.find(
                      (grade) => grade.value === selectedValue,
                    );
                    if (selectedGrade) {
                      setDetails((prev) => ({
                        ...prev,
                        standardId: selectedGrade.value,
                        grade: selectedGrade.value,
                      }));
                    }
                  }}
                  className={selectFieldClassName}
                >
                  <option value="" disabled>
                    Choose Grade
                  </option>
                  {GradesConstant.map((grade, index) => (
                    <option key={index} value={grade.value}>
                      {grade.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="email" className={helperLabelClassName}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  autoComplete="email"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={details.email}
                  onChange={(e) =>
                    setDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className={inputClassName}
                />
              </div>

              <div className="grid items-start gap-4 sm:grid-cols-[10.5rem_minmax(0,1fr)]">
                <div>
                  <label htmlFor="phoneCode" className={helperLabelClassName}>
                    Country Code <span className="text-red-500">*</span>
                  </label>
                  <Select
                    instanceId={"phonecode-select"}
                    inputId="phoneCode"
                    options={PhoneOptionsConstants}
                    value={PhoneOptionsConstants.find(
                      (opt) => opt.value === details.phoneCountryId,
                    )}
                    onChange={(option) =>
                      setDetails((prev) => ({
                        ...prev,
                        phoneCountryId: option.value,
                        phoneCode: option.value.split(" ")[0],
                      }))
                    }
                    classNamePrefix="react-select"
                    styles={phoneSelectStyles}
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="phone" className={helperLabelClassName}>
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    autoComplete="mobile tel"
                    maxLength={15}
                    id="phone"
                    placeholder="Enter your mobile number"
                    value={details.phone}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      setDetails((prev) => ({
                        ...prev,
                        phone: numericValue,
                      }));
                    }}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div>
                <label className={helperLabelClassName} htmlFor="language">
                  Preferred Language <span className="text-red-500">*</span>
                </label>
                <select
                  name="language"
                  id="language"
                  required
                  value={details.language}
                  onChange={(e) =>
                    setDetails((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                  className={selectFieldClassName}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>

              <button
                disabled={details.loading}
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_-24px_rgba(37,99,235,0.9)] transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {details.loading
                  ? "Submitting"
                  : mode === "callback"
                    ? "Book Free Callback"
                    : "Book Demo"}
                {details.loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : null}
              </button>

              <p className="text-[11px] leading-5 text-slate-500">
                By submitting this form, I am giving my consent to International
                Schooling to contact me for further details related to their
                programs. To know more about International Schooling, please
                read our{" "}
                <Link
                  target="_blank"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-2 transition hover:text-blue-800"
                  href={"https://internationalschooling.org/privacy-policy"}
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href={"https://internationalschooling.org/terms-of-use"}
                  target="_blank"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-2 transition hover:text-blue-800"
                >
                  Terms of Use
                </Link>
                .
              </p>
            </div>
          </section>
        ) : null}
      </form>
    </div>
  );
}
