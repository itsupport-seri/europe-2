import ReactCountryFlag from "react-country-flag";
import CountriesConstant from "./CountryConstant";

export const PhoneOptionsConstants = CountriesConstant.map((country) => ({
  value: country.custom_dial_code + " " + country.custom_country_value,
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
