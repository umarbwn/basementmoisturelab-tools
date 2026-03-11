'use client'

import React, {useMemo, useState} from "react";

type Inputs = {
    length: number;
    width: number;
    height: number;
    occupants: number;
    humidity: number;
    radonRisk: "low" | "medium" | "high";
    targetACH: number;
};

function calculateVolume(l: number, w: number, h: number) {
    return l * w * h;
}

function calculateRequiredCFM(volume: number, ach: number) {
    return (volume * ach) / 60;
}

function recommendedACH(humidity: number, radon: Inputs["radonRisk"]) {
    let ach = 3;

    if (humidity > 60) ach += 1;
    if (humidity > 75) ach += 1;

    if (radon === "medium") ach += 1;
    if (radon === "high") ach += 2;

    return ach;
}

export default function BasementAirflowCalculator() {
    const [inputs, setInputs] = useState<Inputs>({
        length: 30,
        width: 20,
        height: 8,
        occupants: 2,
        humidity: 55,
        radonRisk: "low",
        targetACH: 4,
    });

    const volume = useMemo(() => {
        return calculateVolume(inputs.length, inputs.width, inputs.height);
    }, [inputs]);

    const requiredCFM = useMemo(() => {
        return calculateRequiredCFM(volume, inputs.targetACH);
    }, [volume, inputs.targetACH]);

    const smartACH = useMemo(() => {
        return recommendedACH(inputs.humidity, inputs.radonRisk);
    }, [inputs]);

    const smartCFM = useMemo(() => {
        return calculateRequiredCFM(volume, smartACH);
    }, [volume, smartACH]);

    const update = (field: keyof Inputs, value: any) => {
        setInputs({...inputs, [field]: value});
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Basement Airflow Calculator</h2>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Basement Dimensions</h5>

                            <div className="mb-3">
                                <label className="form-label">Length (ft)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={inputs.length}
                                    onChange={(e) => update("length", Number(e.target.value))}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Width (ft)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={inputs.width}
                                    onChange={(e) => update("width", Number(e.target.value))}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Ceiling Height (ft)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={inputs.height}
                                    onChange={(e) => update("height", Number(e.target.value))}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Occupants</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={inputs.occupants}
                                    onChange={(e) => update("occupants", Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Air Quality Factors</h5>

                            <div className="mb-3">
                                <label className="form-label">Humidity (%)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={inputs.humidity}
                                    onChange={(e) => update("humidity", Number(e.target.value))}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Radon Risk</label>
                                <select
                                    className="form-select"
                                    value={inputs.radonRisk}
                                    onChange={(e) =>
                                        update("radonRisk", e.target.value as Inputs["radonRisk"])
                                    }
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Target ACH</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={inputs.targetACH}
                                    onChange={(e) => update("targetACH", Number(e.target.value))}
                                />
                            </div>

                            <button
                                className="btn btn-primary w-100"
                                onClick={() => update("targetACH", smartACH)}
                            >
                                Use Smart ACH Recommendation
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 g-4">
                <div className="col-md-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h6>Basement Volume</h6>
                            <h3>{volume.toLocaleString()} ft³</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h6>Required Airflow</h6>
                            <h3>{requiredCFM.toFixed(0)} CFM</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h6>Smart Recommendation</h6>
                            <h3>{smartCFM.toFixed(0)} CFM</h3>
                            <small>{smartACH} ACH suggested</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4 shadow-sm">
                <div className="card-body">
                    <h5 className="mb-3">Fan Size Guide</h5>

                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Fan Size</th>
                            <th>Coverage</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>80 CFM</td>
                            <td>Small basements</td>
                        </tr>

                        <tr>
                            <td>120 CFM</td>
                            <td>Medium basements</td>
                        </tr>

                        <tr>
                            <td>200+ CFM</td>
                            <td>Large / humid basements</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
