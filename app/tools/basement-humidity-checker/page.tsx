'use client';

import React, {useState} from "react";

export default function Page() {
    const [humidity, setHumidity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [result, setResult] = useState<any>(null);

    const checkHumidity = () => {
        const h = parseFloat(humidity);
        const t = parseFloat(temperature);

        if (isNaN(h) || isNaN(t)) {
            setResult({
                safeRange: "30% – 50%",
                risk: "Invalid input",
                dehumidifier: "Enter valid numbers",
            });
            return;
        }

        let risk = "";
        let dehumidifier = "";

        if (h < 30) {
            risk = "Low mold risk";
            dehumidifier = "No dehumidifier needed";
        } else if (h >= 30 && h <= 50) {
            risk = "Safe humidity level";
            dehumidifier = "No dehumidifier needed";
        } else if (h > 50 && h <= 60) {
            risk = "Moderate mold risk";
            dehumidifier = "Consider using a dehumidifier";
        } else {
            risk = "High mold risk";
            dehumidifier = "Dehumidifier strongly recommended";
        }

        // Temperature slightly increases mold concern
        if (h > 55 && t > 70) {
            risk = "High mold risk (warm & humid environment)";
        }

        setResult({
            safeRange: "30% – 50%",
            risk,
            dehumidifier,
        });
    };

    return (
        <div className={'row'}>
            <div className="col-12 col-md-6 d-flex">
                <div className={'card w-100'}>
                    <div className="card-header">
                        <h5>Basement Humidity Level Checker</h5>
                    </div>
                    <div className="card-body">
                        <div className={'mb-3'}>
                            <label className={'form-label'}>Current Humidity (%)</label>
                            <input
                                className={'form-control'}
                                type="number"
                                value={humidity}
                                onChange={(e) => setHumidity(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={'form-label'}>Basement Temperature (°F)</label>
                            <input
                                type="number"
                                value={temperature}
                                onChange={(e) => setTemperature(e.target.value)}
                                className={'form-control'}
                            />
                        </div>
                    </div>
                    <div className={'card-body'}>
                        <button
                            onClick={checkHumidity}
                            className={'btn btn-primary'}
                        >
                            Check Humidity
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 mt-3 mt-md-0 d-flex">
                <div className="card w-100">
                    <div className="card-header">
                        <h5>Result</h5>
                    </div>
                    <div className="card-body">
                        {result && (
                            <div>
                                <p><strong>Safe Humidity Range:</strong> {result.safeRange}</p>
                                <p><strong>Mold Risk Level:</strong> {result.risk}</p>
                                <p><strong>Recommendation:</strong> {result.dehumidifier}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}