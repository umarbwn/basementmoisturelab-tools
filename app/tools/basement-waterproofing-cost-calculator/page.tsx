'use client'

import React, {useState} from "react";

type ProblemType = "leak" | "cracks" | "flooding";
type MethodType = "interior" | "exterior";

interface ResultType {
    low: string;
    high: string;
    priceLow: number;
    priceHigh: number;
}

const pricing: Record<ProblemType, Record<MethodType, [number, number]>> = {
    leak: {
        interior: [3, 7],
        exterior: [8, 15]
    },
    cracks: {
        interior: [5, 10],
        exterior: [10, 20]
    },
    flooding: {
        interior: [8, 15],
        exterior: [15, 30]
    }
};

const BasementWaterproofingCalculator: React.FC = () => {

    const [sqft, setSqft] = useState<number | "">("");
    const [problem, setProblem] = useState<ProblemType | "">("");
    const [method, setMethod] = useState<MethodType | "">("");
    const [result, setResult] = useState<ResultType | null>(null);

    const calculateCost = () => {

        if (!sqft || !problem || !method) {
            alert("Please fill all fields");
            return;
        }

        const [lowRate, highRate] = pricing[problem][method];

        const low = sqft * lowRate;
        const high = sqft * highRate;

        setResult({
            low: low.toLocaleString(),
            high: high.toLocaleString(),
            priceLow: lowRate,
            priceHigh: highRate
        });
    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">
                <div className="col-lg-7">

                    <div className="card shadow-lg border-0">

                        <div className="card-header bg-primary text-white text-center">
                            <h3 className="mb-0">
                                Basement Waterproofing Cost Calculator
                            </h3>
                        </div>

                        <div className="card-body p-4">

                            <div className="mb-3">
                                <label className="form-label fw-bold">
                                    Basement Square Footage
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter square footage"
                                    value={sqft}
                                    onChange={(e) =>
                                        setSqft(e.target.value ? Number(e.target.value) : "")
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">
                                    Type of Problem
                                </label>

                                <select
                                    className="form-select"
                                    value={problem}
                                    onChange={(e) =>
                                        setProblem(e.target.value as ProblemType | "")
                                    }
                                >
                                    <option value="">Select Problem</option>
                                    <option value="leak">Water Leaks</option>
                                    <option value="cracks">Foundation Cracks</option>
                                    <option value="flooding">Basement Flooding</option>
                                </select>

                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">
                                    Waterproofing Method
                                </label>

                                <select
                                    className="form-select"
                                    value={method}
                                    onChange={(e) =>
                                        setMethod(e.target.value as MethodType | "")
                                    }
                                >
                                    <option value="">Select Method</option>
                                    <option value="interior">Interior Waterproofing</option>
                                    <option value="exterior">Exterior Waterproofing</option>
                                </select>

                            </div>

                            <div className="d-grid">
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={calculateCost}
                                >
                                    Calculate Cost
                                </button>
                            </div>

                        </div>

                    </div>

                    {result && (

                        <div className="card mt-4 shadow border-0">

                            <div className="card-body text-center">

                                <h4 className="mb-3 text-success">
                                    Estimated Cost Range
                                </h4>

                                <h2 className="fw-bold">
                                    ${result.low} – ${result.high}
                                </h2>

                                <p className="text-muted mt-3">
                                    Based on ${result.priceLow} – ${result.priceHigh} per sq ft
                                </p>

                                <div className="alert alert-info mt-3">

                                    Actual costs may vary depending on
                                    soil conditions, drainage system,
                                    labor costs, and structural repairs.

                                </div>

                            </div>

                        </div>

                    )}

                </div>
            </div>

        </div>

    );
};

export default BasementWaterproofingCalculator;