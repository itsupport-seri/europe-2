import CountriesConstant from "@constants/CountryConstant";
import TimeZones from "@constants/TimeZones";
import ReactCountryFlag from "react-country-flag";

export const GradesConstant = [
  { value: "11", label: "KG" },
  { value: "12", label: "Grade 1" },
  { value: "13", label: "Grade 2" },
  { value: "14", label: "Grade 3" },
  { value: "15", label: "Grade 4" },
  { value: "16", label: "Grade 5" },
  { value: "1", label: "Grade 6" },
  { value: "2", label: "Grade 7" },
  { value: "3", label: "Grade 8" },
  { value: "4", label: "Grade 9" },
  { value: "5", label: "Grade 10" },
  { value: "6", label: "Grade 11" },
  { value: "7", label: "Grade 12" },
  { value: "10", label: "Single | Flexy Course" },
  { value: "21", label: "Advance Placement" },
  { value: "22", label: "English Learning Program" },
  { value: "23", label: "Maths Learning Program" },
  { value: "24", label: "STEM Education" },
  { value: "25", label: "Looking for Tutors" },
];

export const PhoneCodeOptionsConstants = CountriesConstant.map((country) => ({
  value: country.custom_dial_code,
  label: (
    <div className="flex items-center gap-2">
      <ReactCountryFlag
        countryCode={country.custom_country_icon}
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
      <span>{country.custom_dial_code}</span>
    </div>
  ),
  raw: country,
}));

export const TimeZoneOptionsConstant = TimeZones.map((item) => ({
  value: item.value,
  label: `${item.value.replaceAll("_", " ").replaceAll("/", " | ")} (${
    item.extra
  })`,
}));
