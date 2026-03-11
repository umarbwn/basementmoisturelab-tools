'use client'

import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

type SoilType = "Sandy" | "Clay" | "Loam" | "Rocky";

const BasementFloodRiskTool: React.FC = () => {
    const [rainfall, setRainfall] = useState<number>(0);
    const [soil, setSoil] = useState<SoilType>("Loam");
    const [slope, setSlope] = useState<number>(0);
    const [riskScore, setRiskScore] = useState<number | null>(null);
    const [message, setMessage] = useState<string>("");

    const calculateRisk = () => {
        let score = 0;

        // Rainfall weight
        score += rainfall * 0.4;

        // Soil weight
        switch (soil) {
            case "Clay":
                score += 30;
                break;
            case "Sandy":
                score += 10;
                break;
            case "Loam":
                score += 20;
                break;
            case "Rocky":
                score += 5;
                break;
        }

        // Slope weight
        if (slope < 5) score += 25;
        else if (slope < 15) score += 15;
        else score += 5;

        setRiskScore(score);

        if (score >= 60) setMessage("High risk of basement flooding! ⚠️");
        else if (score >= 30) setMessage("Moderate risk. Stay alert.");
        else setMessage("Low risk. ✅");
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    <div className={'card'}>
                        <div className="card-header">
                            <h5 className="card-title mb-0 text-center">Basement Flood Risk Tool</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Rainfall (mm in last 24h)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={rainfall}
                                    onChange={(e) => setRainfall(parseFloat(e.target.value))}
                                    min={0}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Soil Type</label>
                                <select
                                    className="form-select"
                                    value={soil}
                                    onChange={(e) => setSoil(e.target.value as SoilType)}
                                >
                                    <option value="Sandy">Sandy</option>
                                    <option value="Clay">Clay</option>
                                    <option value="Loam">Loam</option>
                                    <option value="Rocky">Rocky</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Slope (%) of land around basement</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={slope}
                                    onChange={(e) => setSlope(parseFloat(e.target.value))}
                                    min={0}
                                    max={50}
                                />
                            </div>

                            <button className="btn btn-primary w-100 mb-3" onClick={calculateRisk}>
                                Calculate Risk
                            </button>

                            {riskScore !== null && (
                                <div className="alert alert-info text-center">
                                    <h5>Risk Score: {riskScore.toFixed(1)}</h5>
                                    <p>{message}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasementFloodRiskTool;