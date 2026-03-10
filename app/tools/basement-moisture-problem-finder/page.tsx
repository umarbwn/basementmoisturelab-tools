'use client'

import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

type Symptom = {
    id: string;
    label: string;
    causes: string[];
};

const symptomsData: Symptom[] = [
    {
        id: "wet_walls",
        label: "Wet walls",
        causes: ["Poor drainage", "Hydrostatic pressure", "Cracked foundation"]
    },
    {
        id: "musty_smell",
        label: "Musty smell",
        causes: ["Condensation", "Poor drainage"]
    },
    {
        id: "water_on_floor",
        label: "Water on floor",
        causes: ["Hydrostatic pressure", "Cracked foundation", "Poor drainage"]
    },
    {
        id: "efflorescence",
        label: "Efflorescence",
        causes: ["Hydrostatic pressure", "Poor drainage"]
    }
];

const allCauses = [
    "Poor drainage",
    "Hydrostatic pressure",
    "Cracked foundation",
    "Condensation"
];

export default function BasementMoistureFinder() {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

    const toggleSymptom = (id: string) => {
        setSelectedSymptoms((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const calculateCauses = () => {
        const causeScore: Record<string, number> = {};

        allCauses.forEach((c) => (causeScore[c] = 0));

        symptomsData.forEach((symptom) => {
            if (selectedSymptoms.includes(symptom.id)) {
                symptom.causes.forEach((cause) => {
                    causeScore[cause] += 1;
                });
            }
        });

        const sorted = Object.entries(causeScore)
            .filter(([, score]) => score > 0)
            .sort((a, b) => b[1] - a[1]);

        return sorted;
    };

    const results = calculateCauses();

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <div className="card shadow-lg border-0">
                        <div className="card-body p-4">

                            <h2 className="mb-4 text-center fw-bold">
                                Basement Moisture Problem Finder
                            </h2>

                            <p className="text-muted text-center mb-4">
                                Select the symptoms you see in your basement.
                            </p>

                            <div className="list-group mb-4">
                                {symptomsData.map((symptom) => (
                                    <label
                                        key={symptom.id}
                                        className={`list-group-item list-group-item-action d-flex align-items-center ${
                                            selectedSymptoms.includes(symptom.id)
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="form-check-input me-3"
                                            checked={selectedSymptoms.includes(symptom.id)}
                                            onChange={() => toggleSymptom(symptom.id)}
                                        />
                                        {symptom.label}
                                    </label>
                                ))}
                            </div>

                            <div className="card bg-light border-0">
                                <div className="card-body">

                                    <h5 className="mb-3">Possible Causes</h5>

                                    {results.length === 0 && (
                                        <p className="text-muted mb-0">
                                            Select symptoms to see possible causes.
                                        </p>
                                    )}

                                    {results.map(([cause, score]) => (
                                        <div key={cause} className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <strong>{cause}</strong>
                                                <span>{score} match</span>
                                            </div>

                                            <div className="progress mt-1" style={{height: 8}}>
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{width: `${score * 25}%`}}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
