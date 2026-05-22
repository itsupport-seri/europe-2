const PRO_IP_API_URL =
  "https://pro.ip-api.com/json/?key=9908tZlRhI0pK5W&fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query";

const DEFAUTL_LOCATION = {
  query: "219.75.27.16",
  status: "success",
  continent: "Asia",
  continentCode: "AS",
  country: "Singapore",
  countryCode: "SG",
  region: "01",
  regionName: "Central Singapore",
  city: "Singapore",
  district: "Queenstown",
  zip: "148943",
  lat: 1.29229,
  lon: 103.808,
  timezone: "Asia/Singapore",
  offset: 28800,
  currency: "SGD",
  isp: "Singapore Telecommunications Ltd, Magix Services",
  org: "SingNet Pte Ltd",
  as: "AS9506 Singtel Fibre Broadband",
  asname: "SINGTEL-FIBRE",
  mobile: false,
  proxy: false,
  hosting: false,
};
export async function getLocation() {
  try {
    const response = await fetch(PRO_IP_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return DEFAUTL_LOCATION;
  }
}

export async function getLocationEventForm() {
  try {
    const response = await fetch(
      "https://pro.ip-api.com/json/?key=9908tZlRhI0pK5W&fields=status,message,country,regionName,city,district,timezone",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return DEFAUTL_LOCATION;
  }
}
