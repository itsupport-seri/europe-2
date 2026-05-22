export function getBrowserDetail() {
  var nAgt = navigator.userAgent;
  var browserName = navigator.appName;
  var fullVersion = "" + parseFloat(navigator.appVersion);
  var majorVersion = parseInt(navigator.appVersion, 10);
  var nameOffset, verOffset, ix;
  if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) != -1)
      fullVersion = nAgt.substring(verOffset + 8);
  } else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset + 5);
  } else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset + 7);
  } else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) != -1)
      fullVersion = nAgt.substring(verOffset + 8);
  } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset + 8);
  } else if (
    (nameOffset = nAgt.lastIndexOf(" ") + 1) <
    (verOffset = nAgt.lastIndexOf("/"))
  ) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }

  if ((ix = fullVersion.indexOf(";")) != -1)
    fullVersion = fullVersion.substring(0, ix);
  if ((ix = fullVersion.indexOf(" ")) != -1)
    fullVersion = fullVersion.substring(0, ix);

  majorVersion = parseInt("" + fullVersion, 10);
  if (isNaN(majorVersion)) {
    fullVersion = "" + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }

  return {
    name: browserName,
    fullVersion: fullVersion,
    shortVersion: majorVersion,
    navAppName: navigator.appName,
    uAgentFull: navigator.userAgent,
  };
}

export function fillBrowserDetail() {
  var browserDetails = getBrowserDetail();
  if (browserDetails != undefined && browserDetails != "") {
    return JSON.stringify(browserDetails);
  }
  return "{}";
}

export function getCookie(key) {
  if (!key) return false;
  const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
  return keyValue ? keyValue[2] : "N/A";
}

export function toTitleCase(str) {
  if (!str) return "";
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export function base64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function base64Decode(str) {
  return decodeURIComponent(escape(atob(str)));
}

export function extractNameParts(prefix, fullName) {
  var safeName = (fullName || "").trim();
  if (!safeName) {
    return {
      formattedName: "",
      lastName: "",
    };
  }
  var parts = safeName.split(/\s+/);
  var firstName = parts[0];
  var lastName = parts.length > 1 ? parts.slice(1).join(" ") : "N/A";
  var formattedName =
    prefix && prefix !== "--" ? prefix + " " + firstName : firstName;
  return {
    formattedName: formattedName,
    lastName: lastName,
  };
}

export function escapeCharacters(str) {
  return str
    .replace(/[\n\r]/g, "\\n")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'");
}
