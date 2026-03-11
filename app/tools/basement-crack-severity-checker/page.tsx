'use client'

import React, {useState} from 'react';

// Define crack severity types
type Severity = 'Low' | 'Moderate' | 'High' | 'Critical';

const BasementCrackSeverityChecker: React.FC = () => {
    const [length, setLength] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [pattern, setPattern] = useState<string>('vertical');
    const [moisture, setMoisture] = useState<boolean>(false);
    const [severity, setSeverity] = useState<Severity | null>(null);

    const calculateSeverity = () => {
        let score = 0;

        // Length impact
        if (length > 20) score += 2;
        else if (length > 10) score += 1;

        // Width impact
        if (width > 0.5) score += 3;
        else if (width > 0.25) score += 2;

        // Pattern impact
        if (pattern === 'horizontal') score += 3;
        else if (pattern === 'stair-step') score += 2;

        // Moisture impact
        if (moisture) score += 2;

        // Determine severity
        if (score <= 2) setSeverity('Low');
        else if (score <= 5) setSeverity('Moderate');
        else if (score <= 7) setSeverity('High');
        else setSeverity('Critical');
    };

    return (
        <div className="container mt-3 mb-5">
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    <h2 className="mb-4">Basement Crack Severity Checker</h2>
                    <div className="card p-4 shadow">
                        <div className="mb-3">
                            <label className="form-label">Crack Length (inches)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={length}
                                onChange={e => setLength(parseFloat(e.target.value))}
                                min={0}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Crack Width (inches)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={width}
                                onChange={e => setWidth(parseFloat(e.target.value))}
                                min={0}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Crack Pattern</label>
                            <select
                                className="form-select"
                                value={pattern}
                                onChange={e => setPattern(e.target.value)}
                            >
                                <option value="vertical">Vertical</option>
                                <option value="horizontal">Horizontal</option>
                                <option value="stair-step">Stair-Step</option>
                                <option value="diagonal">Diagonal</option>
                            </select>
                        </div>

                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={moisture}
                                onChange={e => setMoisture(e.target.checked)}
                            />
                            <label className="form-check-label">Moisture Present?</label>
                        </div>

                        <button className="btn btn-primary" onClick={calculateSeverity}>Check Severity</button>

                        {severity && (
                            <div className={`mt-4 alert ${getSeverityClass(severity)}`}>
                                <strong>Severity:</strong> {severity}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper to style severity result
const getSeverityClass = (severity: Severity) => {
    switch (severity) {
        case 'Low':
            return 'alert-success';
        case 'Moderate':
            return 'alert-warning';
        case 'High':
            return 'alert-danger';
        case 'Critical':
            return 'alert-dark';
        default:
            return 'alert-secondary';
    }
};

export default BasementCrackSeverityChecker;
