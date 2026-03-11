'use client'

import React, {useState} from "react";

type Units = "imperial" | "metric";

interface Result {
    inflowRateGPM: number;
    basinVolumeGallons: number;
    recommendedPumpGPM: number;
    horsepower: number;
    cycleTimeMinutes: number;
}

const SumpPumpCalculator: React.FC = () => {
    const [units, setUnits] = useState<Units>("imperial");

    const [roofArea, setRoofArea] = useState<number>(2000);
    const [rainfallRate, setRainfallRate] = useState<number>(1);
    const [basinDiameter, setBasinDiameter] = useState<number>(18);
    const [basinDepth, setBasinDepth] = useState<number>(24);

    const [result, setResult] = useState<Result | null>(null);

    const ftFromInput = (val: number) =>
        units === "metric" ? val * 3.28084 : val;

    const inchFromInput = (val: number) =>
        units === "metric" ? val / 25.4 : val;

    const sqftFromInput = (val: number) =>
        units === "metric" ? val * 10.7639 : val;

    const calculate = () => {
        const roofSqFt = sqftFromInput(roofArea);
        const rainInHr = rainfallRate;

        const inflowCubicFtHr = roofSqFt * (rainInHr / 12);
        const inflowGallonsHr = inflowCubicFtHr * 7.48;
        const inflowRateGPM = inflowGallonsHr / 60;

        const diameterFt = inchFromInput(basinDiameter) / 12;
        const depthFt = inchFromInput(basinDepth) / 12;

        const basinVolumeCubicFt =
            Math.PI * Math.pow(diameterFt / 2, 2) * depthFt;

        const basinVolumeGallons = basinVolumeCubicFt * 7.48;

        const recommendedPumpGPM = inflowRateGPM * 1.5;

        let horsepower = 0.25;

        if (recommendedPumpGPM > 40) horsepower = 0.5;
        if (recommendedPumpGPM > 80) horsepower = 0.75;
        if (recommendedPumpGPM > 120) horsepower = 1;

        const cycleTimeMinutes =
            basinVolumeGallons / recommendedPumpGPM;

        setResult({
            inflowRateGPM,
            basinVolumeGallons,
            recommendedPumpGPM,
            horsepower,
            cycleTimeMinutes,
        });
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Sump Pump Size Calculator</h4>
                        </div>

                        <div className="card-body">

                            <div className="mb-4">
                                <label className="form-label">Units</label>

                                <select
                                    className="form-select"
                                    value={units}
                                    onChange={(e) =>
                                        setUnits(e.target.value as Units)
                                    }
                                >
                                    <option value="imperial">Imperial (ft, inches)</option>
                                    <option value="metric">Metric (m, mm)</option>
                                </select>
                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Roof / Drainage Area ({units === "imperial" ? "sq ft" : "m²"})
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={roofArea}
                                        onChange={(e) =>
                                            setRoofArea(Number(e.target.value))
                                        }
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Rainfall Intensity (inches/hour)
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={rainfallRate}
                                        onChange={(e) =>
                                            setRainfallRate(Number(e.target.value))
                                        }
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Basin Diameter ({units === "imperial" ? "inches" : "mm"})
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={basinDiameter}
                                        onChange={(e) =>
                                            setBasinDiameter(Number(e.target.value))
                                        }
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Basin Depth ({units === "imperial" ? "inches" : "mm"})
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={basinDepth}
                                        onChange={(e) =>
                                            setBasinDepth(Number(e.target.value))
                                        }
                                    />
                                </div>

                            </div>

                            <button
                                className="btn btn-success w-100 mt-3"
                                onClick={calculate}
                            >
                                Calculate Pump Size
                            </button>

                            {result && (
                                <div className="mt-4">

                                    <div className="alert alert-info">
                                        Estimated Water Inflow:
                                        <strong>
                                            {" "}
                                            {result.inflowRateGPM.toFixed(2)} GPM
                                        </strong>
                                    </div>

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="card text-center">
                                                <div className="card-body">
                                                    <h6>Basin Volume</h6>
                                                    <h4>
                                                        {result.basinVolumeGallons.toFixed(1)} gal
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="card text-center">
                                                <div className="card-body">
                                                    <h6>Recommended Pump</h6>
                                                    <h4>
                                                        {result.recommendedPumpGPM.toFixed(1)} GPM
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="card text-center">
                                                <div className="card-body">
                                                    <h6>Pump Power</h6>
                                                    <h4>{result.horsepower} HP</h4>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="alert alert-warning mt-3">
                                        Estimated Pump Cycle Time:{" "}
                                        <strong>
                                            {result.cycleTimeMinutes.toFixed(2)} minutes
                                        </strong>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SumpPumpCalculator;