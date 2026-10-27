"use client";
import { decodeVin } from "@/actions/vin";
import { useState } from "react";

export default function VinDecoder() {
  const [vin, setVin] = useState("");
  const [carResults, setCarResults] = useState<any>({});
  async function handleSearch(vin: string) {
    const res = await decodeVin(vin);
    console.log(res);
    setCarResults(res);
  }
  return (
    <div>
      {/* search bar here */}
      <input type='text' value={vin} onChange={(e) => setVin(e.target.value)} />
      <button onClick={() => handleSearch}>Search</button>
      {/* results here */}
      <div>
        Vin: {vin}
        Year: {carResults.ModelYear}
        Make: {carResults?.Make}
        Model: {carResults.Model}
        Engine: {carResults.DisplacementCC}
      </div>
    </div>
  );
}
