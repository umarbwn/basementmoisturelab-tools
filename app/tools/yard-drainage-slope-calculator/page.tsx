'use client'

import React, {useMemo, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Unit = "feet" | "meters";
type Mode = "distance" | "elevation";

const unitFactor = {
    feet: 1,
    meters: 3.28084
};

export default function YardDrainageSlopeCalculator() {
    const [mode, setMode] = useState<Mode>("distance");

    const [distance, setDistance] = useState<number>(20);
    const [drop, setDrop] = useState<number>(6);

    const [startElevation, setStartElevation] = useState<number>(100);
    const [endElevation, setEndElevation] = useState<number>(99.5);

    const [unit, setUnit] = useState<Unit>("feet");

    const slopeData = useMemo(() => {

        let slopePercent = 0;
        let slopeRatio = 0;
        let slopeAngle = 0;
        let dropValue = drop;

        if (mode === "distance") {
            slopePercent = (drop / (distance * 12)) * 100;
        } else {
            const elevationDrop = startElevation - endElevation;
            dropValue = elevationDrop * 12;
            slopePercent = (elevationDrop / distance) * 100;
        }

        slopeRatio = 100 / slopePercent;

        slopeAngle = Math.atan(slopePercent / 100) * (180 / Math.PI);

        const recommendation = getDrainageRecommendation(slopePercent);

        return {
            slopePercent,
            slopeRatio,
            slopeAngle,
            dropValue,
            recommendation
        };

    }, [distance, drop, startElevation, endElevation, mode]);

    function getDrainageRecommendation(slope: number) {

        if (slope < 1) {
            return {
                status: "Poor",
                color: "danger",
                message: "Water will likely pool. Increase slope or install drains."
            };
        }

        if (slope < 2) {
            return {
                status: "Acceptable",
                color: "warning",
                message: "Minimum drainage slope. Monitor water flow."
            };
        }

        if (slope < 5) {
            return {
                status: "Ideal",
                color: "success",
                message: "Excellent drainage for most residential yards."
            };
        }

        return {
            status: "Steep",
            color: "info",
            message: "Good drainage but may cause soil erosion."
        };
    }

    return (
        <div className="container py-4">

            <h2 className="mb-4 text-center">
                Realtime Yard Drainage Slope Calculator
            </h2>

            <div className="row g-4">

                {/* INPUT PANEL */}
                <div className="col-lg-5">

                    <div className="card shadow-sm">
                        <div className="card-body">

                            <h5 className="mb-3">Input Data</h5>

                            <div className="mb-3">
                                <label className="form-label">Calculation Mode</label>
                                <select
                                    className="form-select"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value as Mode)}
                                >
                                    <option value="distance">Distance + Drop</option>
                                    <option value="elevation">Elevation Points</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Distance</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={distance}
                                    onChange={(e) => setDistance(Number(e.target.value))}
                                />
                            </div>

                            {mode === "distance" && (
                                <div className="mb-3">
                                    <label className="form-label">
                                        Total Drop (inches)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={drop}
                                        onChange={(e) => setDrop(Number(e.target.value))}
                                    />
                                </div>
                            )}

                            {mode === "elevation" && (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Start Elevation
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={startElevation}
                                            onChange={(e) =>
                                                setStartElevation(Number(e.target.value))
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            End Elevation
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={endElevation}
                                            onChange={(e) =>
                                                setEndElevation(Number(e.target.value))
                                            }
                                        />
                                    </div>
                                </>
                            )}

                            <div className="mb-3">
                                <label className="form-label">Units</label>
                                <select
                                    className="form-select"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value as Unit)}
                                >
                                    <option value="feet">Feet</option>
                                    <option value="meters">Meters</option>
                                </select>
                            </div>

                        </div>
                    </div>

                </div>

                {/* RESULTS PANEL */}
                <div className="col-lg-7">

                    <div className="card shadow-sm">
                        <div className="card-body">

                            <h5 className="mb-4">Drainage Results</h5>

                            <div className="row g-3">

                                <div className="col-md-4">
                                    <div className="border rounded p-3 text-center">
                                        <h6>Slope %</h6>
                                        <h4>
                                            {slopeData.slopePercent.toFixed(2)}%
                                        </h4>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="border rounded p-3 text-center">
                                        <h6>Slope Ratio</h6>
                                        <h4>
                                            1 : {slopeData.slopeRatio.toFixed(1)}
                                        </h4>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="border rounded p-3 text-center">
                                        <h6>Slope Angle</h6>
                                        <h4>
                                            {slopeData.slopeAngle.toFixed(2)}°
                                        </h4>
                                    </div>
                                </div>

                            </div>

                            <hr className="my-4"/>

                            <div
                                className={`alert alert-${slopeData.recommendation.color}`}
                            >
                                <strong>
                                    {slopeData.recommendation.status}
                                </strong>
                                <br/>
                                {slopeData.recommendation.message}
                            </div>

                            <div className="mt-4">

                                <h6>Engineering Notes</h6>

                                <ul>
                                    <li>Minimum recommended yard slope: <strong>2%</strong></li>
                                    <li>Ideal slope range: <strong>2% – 5%</strong></li>
                                    <li>Minimum drop: <strong>6 inches per 10 feet</strong></li>
                                    <li>Ensure water drains away from house foundation</li>
                                </ul>

                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}