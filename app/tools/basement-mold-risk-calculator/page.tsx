'use client'

import React, {useState} from "react";

type RiskLevel = "Low" | "Medium" | "High";

const BasementMoldRiskCalculator: React.FC = () => {
    const [humidity, setHumidity] = useState<number>(0);
    const [leaks, setLeaks] = useState<number>(0);
    const [smell, setSmell] = useState<number>(0);
    const [ventilation, setVentilation] = useState<number>(0);

    const calculateRisk = (): { level: RiskLevel; score: number } => {
        const score = humidity + leaks + smell + ventilation;

        if (score <= 3) return {level: "Low", score};
        if (score <= 6) return {level: "Medium", score};
        return {level: "High", score};
    };

    const result = calculateRisk();

    const riskColor = {
        Low: "success",
        Medium: "warning",
        High: "danger"
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-4">

                            <h2 className="mb-4 text-center">
                                Basement Mold Risk Calculator
                            </h2>

                            {/* Humidity */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">
                                    Humidity Level
                                </label>

                                <select
                                    className="form-select"
                                    onChange={(e) => setHumidity(Number(e.target.value))}
                                >
                                    <option value={0}>Low (Below 50%)</option>
                                    <option value={1}>Moderate (50–70%)</option>
                                    <option value={2}>High (Above 70%)</option>
                                </select>
                            </div>

                            {/* Water Leaks */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">
                                    Water Leaks
                                </label>

                                <select
                                    className="form-select"
                                    onChange={(e) => setLeaks(Number(e.target.value))}
                                >
                                    <option value={0}>No leaks</option>
                                    <option value={1}>Past leaks</option>
                                    <option value={2}>Active leaks</option>
                                </select>
                            </div>

                            {/* Musty Smell */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">
                                    Musty Smell
                                </label>

                                <select
                                    className="form-select"
                                    onChange={(e) => setSmell(Number(e.target.value))}
                                >
                                    <option value={0}>No smell</option>
                                    <option value={1}>Sometimes</option>
                                    <option value={2}>Strong smell</option>
                                </select>
                            </div>

                            {/* Ventilation */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">
                                    Ventilation
                                </label>

                                <select
                                    className="form-select"
                                    onChange={(e) => setVentilation(Number(e.target.value))}
                                >
                                    <option value={0}>Good ventilation</option>
                                    <option value={1}>Average ventilation</option>
                                    <option value={2}>Poor ventilation</option>
                                </select>
                            </div>

                            {/* Result */}
                            <div className="text-center">

                                <h4 className={`text-${riskColor[result.level]}`}>
                                    Mold Risk: {result.level}
                                </h4>

                                <div className="progress mt-3">
                                    <div
                                        className={`progress-bar bg-${riskColor[result.level]}`}
                                        style={{width: `${(result.score / 8) * 100}%`}}
                                    >
                                        {result.score}/8
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasementMoldRiskCalculator;