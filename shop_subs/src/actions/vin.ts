// const api_address = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/1FMJU1HT1HEA17770?format=json"

export async function decodeVin(vin: string) {
  const addr = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`;
  const res = await fetch(addr);
  if (res) {
    return res.json();
  } else {
    return { Error: "Coudl not find vin" };
  }
}
