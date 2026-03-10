'use client';

import {useEffect, useState} from 'react';
import {AlertTriangle, ArrowRight, BookOpen, ChevronRight, Droplets, Home, Ruler, Thermometer} from 'lucide-react';

// Types and Interfaces
interface CalculatorInputs {
    sqFootage: number;
    ceilingHeight: string;
    moistureLevel: string;
    finishStatus: string;
    moistureSources: string[];
    drainage: string;
}

interface Result {
    minPints: number;
    maxPints: number;
    type: 'compressor' | 'desiccant' | 'both';
    needsPump: boolean;
    explanation: {
        baseCapacity: number;
        modifiers: Array<{ factor: string; value: number }>;
        finalRange: string;
    };
}

// Static data
const TOOL_DATA = {
    ceilingHeights: [
        {value: 'low', label: 'Less than 8 ft', height: 7, multiplier: 0.9},
        {value: 'standard', label: '8 ft (Standard)', height: 8, multiplier: 1.0},
        {value: 'high', label: '9 ft', height: 9, multiplier: 1.125},
        {value: 'very_high', label: '10 ft+', height: 10, multiplier: 1.25}
    ],

    moistureLevels: [
        {
            value: 'moderate',
            label: 'Moderately Damp',
            description: 'Musty odors, air feels heavy',
            modifier: 1.0,
            blog: {
                title: 'Diagnosing Basement Moisture',
                url: 'https://basementmoisturelab.com/diagnosing-basement-moisture-guide'
            }
        },
        {
            value: 'very_damp',
            label: 'Very Damp',
            description: 'Visible sweating on pipes, damp spots',
            modifier: 1.3,
            blog: {
                title: 'Diagnosing Basement Moisture',
                url: 'https://basementmoisturelab.com/diagnosing-basement-moisture-guide'
            }
        },
        {
            value: 'wet',
            label: 'Wet',
            description: 'Constant moisture, minor seepage',
            modifier: 1.6,
            blog: {
                title: 'Diagnosing Basement Moisture',
                url: 'https://basementmoisturelab.com/diagnosing-basement-moisture-guide'
            }
        },
        {
            value: 'extreme',
            label: 'Extremely Wet / Post-Flood',
            description: 'Standing water, recent flooding',
            modifier: 2.0,
            blog: {
                title: 'Dehumidifier After Flood',
                url: 'https://basementmoisturelab.com/post-flood-dehumidifier-guide-drying-tips/'
            }
        }
    ],

    baseCapacities: [
        {min: 100, max: 500, moderate: 20, very_damp: 30, wet: 40, extreme: 45},
        {min: 501, max: 800, moderate: 25, very_damp: 35, wet: 45, extreme: 50},
        {min: 801, max: 1200, moderate: 35, very_damp: 42, wet: 52, extreme: 55},
        {min: 1201, max: 1500, moderate: 42, very_damp: 47, wet: 57, extreme: 60},
        {min: 1501, max: 2000, moderate: 47, very_damp: 55, wet: 65, extreme: 70},
        {min: 2001, max: 5000, moderate: 55, very_damp: 70, wet: 80, extreme: 90}
    ],

    moistureSources: [
        {
            value: 'dirt_floor',
            label: 'Exposed dirt floors or crawlspaces',
            addition: 4,
            blog: {
                title: 'Dirt Floor Vapor Barriers',
                url: 'https://basementmoisturelab.com/blog/crawl-space-vapor-barrier-vs-dehumidifier'
            }
        },
        {
            value: 'foundation_cracks',
            label: 'Visible foundation cracks',
            addition: 3,
            blog: {
                title: 'Sealing Foundation Cracks',
                url: 'https://basementmoisturelab.com/blog/seal-foundation-cracks-before-dehumidifier'
            }
        },
        {
            value: 'sump_pit',
            label: 'Open sump pump pit',
            addition: 3,
            blog: {
                title: 'Sump Pump Humidity',
                url: 'https://basementmoisturelab.com/blog/sump-pump-humidity-basement-fix/'
            }
        },
        {
            value: 'plumbing_leaks',
            label: 'Plumbing leaks or fixtures',
            addition: 5,
            blog: null
        }
    ]
};

export default function DehumidifierCalculator() {
    // State management
    const [inputs, setInputs] = useState<CalculatorInputs>({
        sqFootage: 1000,
        ceilingHeight: 'standard',
        moistureLevel: 'moderate',
        finishStatus: 'finished',
        moistureSources: [],
        drainage: 'yes'
    });

    const [results, setResults] = useState<Result | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [activeBlogTip, setActiveBlogTip] = useState<string | null>(null);

    // Progress tracking state
    const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, false, false]);

    // Update progress whenever inputs change
    useEffect(() => {
        const steps = [
            inputs.sqFootage >= 100,                           // Step 1: Valid size entered
            inputs.ceilingHeight !== '',                        // Step 2: Height selected
            inputs.moistureLevel !== '',                        // Step 3: Moisture selected
            inputs.finishStatus !== '',                         // Step 4: Finish selected
            true,                                               // Step 5: Sources always optional (counts as complete)
            inputs.drainage !== ''                              // Step 6: Drainage selected
        ];
        setCompletedSteps(steps);
    }, [inputs]);

    // Calculate progress percentage
    const completedCount = completedSteps.filter(Boolean).length;

    // Calculate results
    const calculateResults = (): Result => {
        // Find base capacity
        const sqft = inputs.sqFootage;
        const baseEntry = TOOL_DATA.baseCapacities.find(
            b => sqft >= b.min && sqft <= b.max
        ) || TOOL_DATA.baseCapacities[TOOL_DATA.baseCapacities.length - 1];

        const baseCapacity = baseEntry[inputs.moistureLevel as keyof typeof baseEntry] as number;

        // Get ceiling multiplier
        const ceilingData = TOOL_DATA.ceilingHeights.find(c => c.value === inputs.ceilingHeight);
        const ceilingMultiplier = ceilingData?.multiplier || 1.0;

        // Apply finish addition
        const finishAddition = inputs.finishStatus === 'unfinished' ? 8 : 0;

        // Sum source additions
        const sourceAddition = inputs.moistureSources.reduce((sum, source) => {
            const sourceData = TOOL_DATA.moistureSources.find(s => s.value === source);
            return sum + (sourceData?.addition || 0);
        }, 0);

        // Calculate final capacity
        const calculatedCapacity = (baseCapacity * ceilingMultiplier) + finishAddition + sourceAddition;

        // Create modifiers list for explanation
        const modifiers = [
            {factor: 'Base Capacity', value: baseCapacity},
            ...(ceilingMultiplier !== 1.0 ? [{
                factor: 'Ceiling Height Adjustment',
                value: (baseCapacity * ceilingMultiplier) - baseCapacity
            }] : []),
            ...(finishAddition > 0 ? [{factor: 'Unfinished Space', value: finishAddition}] : []),
            ...(sourceAddition > 0 ? [{factor: 'Additional Sources', value: sourceAddition}] : [])
        ].filter(m => m.value !== 0 && m.factor !== 'Base Capacity');

        // Determine dehumidifier type
        let type: 'compressor' | 'desiccant' | 'both' = 'compressor';
        if (calculatedCapacity > 70) {
            type = 'both';
        } else if (inputs.moistureLevel === 'extreme' && calculatedCapacity > 50) {
            type = 'both';
        }

        return {
            minPints: Math.round(calculatedCapacity * 0.9),
            maxPints: Math.round(calculatedCapacity * 1.1),
            type,
            needsPump: inputs.drainage === 'no',
            explanation: {
                baseCapacity,
                modifiers,
                finalRange: `${Math.round(calculatedCapacity * 0.9)} - ${Math.round(calculatedCapacity * 1.1)} pints/day`
            }
        };
    };

    const handleCalculate = () => {
        const newResults = calculateResults();
        setResults(newResults);
        setShowResults(true);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleInputChange = (field: keyof CalculatorInputs, value: any) => {
        setInputs(prev => ({...prev, [field]: value}));
        setShowResults(false);
    };

    const handleSourceToggle = (source: string) => {
        setInputs(prev => ({
            ...prev,
            moistureSources: prev.moistureSources.includes(source)
                ? prev.moistureSources.filter(s => s !== source)
                : [...prev.moistureSources, source]
        }));
        setShowResults(false);
    };

    return (
        <div className="bg-light min-vh-100">
            {/* Hero Section */}
            <div className="bg-primary text-white py-5">
                <div className="container">
                    <h1 className="display-4 fw-bold mb-3">
                        Basement Dehumidifier Size Calculator
                    </h1>
                    <p className="lead text-white-50 mb-0">
                        Find the perfect dehumidifier for your basement in 60 seconds.
                        Get personalized recommendations based on your specific conditions.
                    </p>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-4">
                    {/* Calculator Form - Left Column */}
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0">

                            <div className="card-body">
                                {/* Step 1: Square Footage */}
                                <div className="mb-4 pb-3 border-bottom">
                                    <div className="row align-items-center mb-3">
                                        <div className="col">
                                            <div className="d-flex align-items-center gap-2">
                                                <span
                                                    className={`badge rounded-circle p-2 d-flex align-items-center justify-content-center ${
                                                        completedSteps[0] ? 'bg-success' : 'bg-primary'
                                                    }`}
                                                    style={{width: '28px', height: '28px'}}
                                                >
                                                  {completedSteps[0] ? '✓' : '1'}
                                                </span>
                                                <h5 className="fw-semibold mb-0">Basement Size</h5>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <button
                                                className="btn btn-link btn-sm text-decoration-none p-0"
                                                onClick={() => setActiveBlogTip(activeBlogTip === 'size' ? null : 'size')}
                                            >
                                                <BookOpen size={16} className="me-1"/>
                                                Why size matters
                                            </button>
                                        </div>
                                    </div>

                                    {activeBlogTip === 'size' && (
                                        <div className="alert alert-info mb-3 position-relative">
                                            <button
                                                type="button"
                                                className="btn-close position-absolute top-0 end-0 mt-2 me-2"
                                                onClick={() => setActiveBlogTip(null)}
                                                aria-label="Close"
                                            />
                                            <h6 className="alert-heading">Why Volume Matters</h6>
                                            <p className="small mb-2">
                                                Ceiling height dramatically affects dehumidifier needs. A 1500 sq ft
                                                basement with 10ft ceilings
                                                has 25% more air to dehumidify than one with 8ft ceilings.
                                            </p>
                                            <a href="https://basementmoisturelab.com/blog/basement-dehumidifier-volume-guide/"
                                               className="small fw-medium">
                                                Read full guide <ChevronRight size={14}/>
                                            </a>
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label small fw-medium">Square Footage</label>
                                        <div className="position-relative">
                                            <Ruler size={18}
                                                   className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"/>
                                            <input
                                                type="number"
                                                className="form-control ps-5"
                                                min="100"
                                                max="5000"
                                                value={inputs.sqFootage}
                                                onChange={(e) => handleInputChange('sqFootage', parseInt(e.target.value) || 100)}
                                                placeholder="e.g., 1000"
                                            />
                                        </div>
                                        {inputs.sqFootage < 100 && (
                                            <div className="form-text text-warning">Minimum recommended size is 100 sq
                                                ft</div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="form-label small fw-medium">Ceiling Height</label>
                                        <select
                                            className="form-select"
                                            value={inputs.ceilingHeight}
                                            onChange={(e) => handleInputChange('ceilingHeight', e.target.value)}
                                        >
                                            {TOOL_DATA.ceilingHeights.map(h => (
                                                <option key={h.value} value={h.value}>{h.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Step 2: Moisture Level */}
                                <div className="mb-4 pb-3 border-bottom">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                    <span
                        className={`badge rounded-circle p-2 d-flex align-items-center justify-content-center ${
                            completedSteps[2] ? 'bg-success' : 'bg-primary'
                        }`}
                        style={{width: '28px', height: '28px'}}
                    >
                      {completedSteps[2] ? '✓' : '2'}
                    </span>
                                        <h5 className="fw-semibold mb-0">Moisture Condition</h5>
                                    </div>

                                    <div>
                                        {TOOL_DATA.moistureLevels.map(level => (
                                            <div key={level.value} className="position-relative mb-2">
                                                <div
                                                    className={`form-check d-flex align-items-center gap-3 border rounded p-3 ${
                                                        inputs.moistureLevel === level.value ? 'bg-primary bg-opacity-10 border-primary' : ''
                                                    }`}
                                                    style={{cursor: 'pointer'}}
                                                    onClick={() => handleInputChange('moistureLevel', level.value)}
                                                >
                                                    <input
                                                        type="radio"
                                                        className="d-none form-check-input"
                                                        name="moistureLevel"
                                                        id={`moisture-${level.value}`}
                                                        value={level.value}
                                                        checked={inputs.moistureLevel === level.value}
                                                        onChange={(e) => handleInputChange('moistureLevel', e.target.value)}
                                                    />
                                                    <Droplets size={18}
                                                              className={inputs.moistureLevel === level.value ? 'text-primary' : 'text-muted'}/>
                                                    <label className="form-check-label w-100"
                                                           htmlFor={`moisture-${level.value}`}>
                                                        <div
                                                            className="d-flex justify-content-start align-items-center">
                                                            <span className="fw-medium">{level.label}</span>
                                                        </div>
                                                        <small
                                                            className="text-muted d-block">{level.description}</small>
                                                    </label>
                                                    {level.blog && (
                                                        <a
                                                            href={level.blog.url}
                                                            className="d-flex items-center text-nowrap gap-2 small text-primary text-decoration-none"
                                                            target="_blank"
                                                            rel="noopener"
                                                        >
                                                            <span>Learn more</span> <span
                                                            className={'d-blcok'}><ChevronRight size={14}/></span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Step 3: Finish Status */}
                                <div className="mb-4 pb-3 border-bottom">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                    <span
                        className={`badge rounded-circle p-2 d-flex align-items-center justify-content-center ${
                            completedSteps[3] ? 'bg-success' : 'bg-primary'
                        }`}
                        style={{width: '28px', height: '28px'}}
                    >
                      {completedSteps[3] ? '✓' : '3'}
                    </span>
                                        <h5 className="fw-semibold mb-0">Space Type</h5>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <div
                                                className={`border rounded p-3 text-center h-100 ${
                                                    inputs.finishStatus === 'finished' ? 'bg-primary bg-opacity-10 border-primary' : ''
                                                }`}
                                                style={{cursor: 'pointer'}}
                                                onClick={() => handleInputChange('finishStatus', 'finished')}
                                            >
                                                <div className="form-check ps-0">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input d-none"
                                                        name="finishStatus"
                                                        id="finish-finished"
                                                        value="finished"
                                                        checked={inputs.finishStatus === 'finished'}
                                                        onChange={(e) => handleInputChange('finishStatus', e.target.value)}
                                                    />
                                                    <label className="form-check-label w-100" htmlFor="finish-finished">
                                                        <Home size={32}
                                                              className={`mb-2 ${inputs.finishStatus === 'finished' ? 'text-primary' : 'text-muted'}`}/>
                                                        <div className="fw-medium">Finished</div>
                                                        <small className="text-muted d-block">Drywall, carpet,
                                                            livable</small>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div
                                                className={`border rounded p-3 text-center h-100 ${
                                                    inputs.finishStatus === 'unfinished' ? 'bg-primary bg-opacity-10 border-primary' : ''
                                                }`}
                                                style={{cursor: 'pointer'}}
                                                onClick={() => handleInputChange('finishStatus', 'unfinished')}
                                            >
                                                <div className="form-check ps-0">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input d-none"
                                                        name="finishStatus"
                                                        id="finish-unfinished"
                                                        value="unfinished"
                                                        checked={inputs.finishStatus === 'unfinished'}
                                                        onChange={(e) => handleInputChange('finishStatus', e.target.value)}
                                                    />
                                                    <label className="form-check-label w-100"
                                                           htmlFor="finish-unfinished">
                                                        <AlertTriangle size={32}
                                                                       className={`mb-2 ${inputs.finishStatus === 'unfinished' ? 'text-primary' : 'text-muted'}`}/>
                                                        <div className="fw-medium">Unfinished</div>
                                                        <small className="text-muted d-block">Exposed concrete,
                                                            storage</small>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {inputs.finishStatus === 'unfinished' && (
                                        <div className="alert alert-warning mt-3">
                                            <strong>Note:</strong> Unfinished basements typically need 8+ more pints
                                            capacity due to exposed concrete and higher air exchange.
                                            <a href="https://basementmoisturelab.com/blog/unfinished-basement-dehumidifier-guide/"
                                               className="d-block mt-1 text-warning-emphasis">Learn more →</a>
                                        </div>
                                    )}
                                </div>

                                {/* Step 4: Additional Moisture Sources */}
                                <div className="mb-4 pb-3 border-bottom">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                    <span
                        className={`badge rounded-circle p-2 d-flex align-items-center justify-content-center ${
                            completedSteps[4] ? 'bg-success' : 'bg-light text-dark'
                        }`}
                        style={{width: '28px', height: '28px'}}
                    >
                      {completedSteps[4] ? '✓' : '4'}
                    </span>
                                        <h5 className="fw-semibold mb-0">Additional Sources</h5>
                                        <span className="badge bg-light text-dark ms-2">Optional</span>
                                    </div>

                                    <div>
                                        {TOOL_DATA.moistureSources.map(source => (
                                            <div key={source.value} className="position-relative mb-2">
                                                <div
                                                    className={`border rounded p-3 ${
                                                        inputs.moistureSources.includes(source.value) ? 'bg-primary bg-opacity-10' : ''
                                                    }`}
                                                    style={{cursor: 'pointer'}}
                                                    onClick={() => handleSourceToggle(source.value)}
                                                >
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={`source-${source.value}`}
                                                            checked={inputs.moistureSources.includes(source.value)}
                                                            onChange={() => handleSourceToggle(source.value)}
                                                        />
                                                        <label className="form-check-label w-100"
                                                               htmlFor={`source-${source.value}`}>
                                                            <div
                                                                className="d-flex justify-content-start gap-2 align-items-center">
                                                                <span className="small">{source.label}</span>
                                                                <span
                                                                    className="badge text-bg-light">+{source.addition} pints</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                                {source.blog && (
                                                    <a
                                                        href={source.blog.url}
                                                        className="position-absolute top-0 end-0 mt-3 me-3 small text-primary text-decoration-none"
                                                        target="_blank"
                                                        rel="noopener"
                                                    >
                                                        Guide
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Step 5: Drainage */}
                                <div className="mb-4">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                    <span
                        className={`badge rounded-circle p-2 d-flex align-items-center justify-content-center ${
                            completedSteps[5] ? 'bg-success' : 'bg-primary'
                        }`}
                        style={{width: '28px', height: '28px'}}
                    >
                      {completedSteps[5] ? '✓' : '5'}
                    </span>
                                        <h5 className="fw-semibold mb-0">Drainage Options</h5>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <div
                                                className={`border rounded p-3 h-100 ${
                                                    inputs.drainage === 'yes' ? 'bg-primary bg-opacity-10 border-primary' : ''
                                                }`}
                                                style={{cursor: 'pointer'}}
                                                onClick={() => handleInputChange('drainage', 'yes')}
                                            >
                                                <div className="form-check ps-0">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input d-none"
                                                        name="drainage"
                                                        id="drain-yes"
                                                        value="yes"
                                                        checked={inputs.drainage === 'yes'}
                                                        onChange={(e) => handleInputChange('drainage', e.target.value)}
                                                    />
                                                    <label className="form-check-label w-100" htmlFor="drain-yes">
                                                        <div className="fw-medium">Yes, floor drain</div>
                                                        <small className="text-muted">Can use gravity drainage</small>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div
                                                className={`border rounded p-3 h-100 ${
                                                    inputs.drainage === 'no' ? 'bg-primary bg-opacity-10 border-primary' : ''
                                                }`}
                                                style={{cursor: 'pointer'}}
                                                onClick={() => handleInputChange('drainage', 'no')}
                                            >
                                                <div className="form-check ps-0">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input d-none"
                                                        name="drainage"
                                                        id="drain-no"
                                                        value="no"
                                                        checked={inputs.drainage === 'no'}
                                                        onChange={(e) => handleInputChange('drainage', e.target.value)}
                                                    />
                                                    <label className="form-check-label w-100" htmlFor="drain-no">
                                                        <div className="fw-medium">No drain</div>
                                                        <small className="text-muted">Will need pump model</small>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Calculate Button */}
                                <button
                                    className={`btn btn-primary btn-lg w-100 fw-semibold d-flex align-items-center justify-content-center gap-2 ${
                                        completedCount < 5 ? 'disabled' : ''
                                    }`}
                                    onClick={handleCalculate}
                                    disabled={completedCount < 5}
                                >
                                    Calculate My Dehumidifier Size
                                    <ArrowRight/>
                                </button>

                                {completedCount < 5 && (
                                    <div className="form-text text-warning d-block text-center mt-2">
                                        Please complete size, height, moisture, finish, and drainage to calculate
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Results Section - Right Column */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 sticky-top" style={{top: '20px'}}>
                            <div className="card-body">
                                <h5 className="fw-semibold mb-4 d-flex align-items-center gap-2">
                  <span className="bg-primary bg-opacity-10 text-primary p-2 rounded">
                    <Thermometer size={20}/>
                  </span>
                                    Your Results
                                </h5>

                                {showResults && results ? (
                                    <div>
                                        {/* Primary Result */}
                                        <div className="text-center p-4 bg-primary bg-opacity-10 rounded mb-4">
                                            <h2 className="display-5 fw-bold text-primary mb-1">
                                                {results.minPints} - {results.maxPints}
                                            </h2>
                                            <p className="text-muted small mb-0">Pints per day</p>
                                        </div>

                                        {/* Type Recommendation */}
                                        <div className="card bg-light border-0 mb-3">
                                            <div className="card-body">
                                                <h6 className="fw-semibold mb-2">Recommended Type</h6>
                                                {results.type === 'compressor' && (
                                                    <p className="small text-muted mb-2">Standard compressor
                                                        dehumidifier (best for 60°F+)</p>
                                                )}
                                                {results.type === 'desiccant' && (
                                                    <p className="small text-muted mb-2">Desiccant dehumidifier (better
                                                        for cold basements)</p>
                                                )}
                                                {results.type === 'both' && (
                                                    <p className="small text-muted mb-2">Either type works - choose
                                                        based on your basement temperature</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Pump Recommendation */}
                                        <div className="card bg-light border-0 mb-3">
                                            <div className="card-body">
                                                <h6 className="fw-semibold mb-2">Pump Needed?</h6>
                                                <p className="small text-muted mb-2">
                                                    {results.needsPump
                                                        ? '✅ Yes - get a model with built-in pump for automatic drainage'
                                                        : '✅ No - standard gravity drain works with your floor drain'
                                                    }
                                                </p>
                                                {results.needsPump && (
                                                    <a href="/blog/dehumidifier-pump-guide"
                                                       className="small text-primary text-decoration-none">
                                                        Pump buying guide →
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Calculation Breakdown */}
                                        <div className="border-top pt-3 mb-3">
                                            <h6 className="fw-semibold mb-2 small">How we calculated this</h6>
                                            <ul className="list-unstyled small">
                                                <li className="d-flex justify-content-between py-1">
                                                    <span className="text-muted">Base capacity</span>
                                                    <span
                                                        className="fw-medium">{results.explanation.baseCapacity} pints</span>
                                                </li>
                                                {results.explanation.modifiers.map((mod, idx) => (
                                                    <li key={idx} className="d-flex justify-content-between py-1">
                                                        <span className="text-muted">{mod.factor}</span>
                                                        <span
                                                            className="fw-medium text-success">+{Math.round(mod.value)}</span>
                                                    </li>
                                                ))}
                                                <li className="d-flex justify-content-between py-1 fw-semibold border-top mt-2 pt-2">
                                                    <span>Final range</span>
                                                    <span
                                                        className="text-primary">{results.explanation.finalRange}</span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* CTA to Pillar Post */}
                                        <a
                                            href="https://basementmoisturelab.com/blog/best-dehumidifier-finished-basement-apartment/"
                                            className="btn btn-success w-100 mb-2"
                                        >
                                            View Top Rated Dehumidifiers
                                        </a>
                                    </div>
                                ) : (
                                    <div className="text-center py-5 px-3">
                                        <div className="text-muted mb-3">
                                            <Thermometer size={48} className="mx-auto"/>
                                        </div>
                                        <p className="text-muted small">
                                            Complete the calculator to see your personalized dehumidifier recommendation
                                        </p>
                                        {completedCount === 6 && (
                                            <button
                                                className="btn btn-primary btn-sm mt-2"
                                                onClick={handleCalculate}
                                            >
                                                Calculate Now
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="card mt-5 border-0 bg-light">
                    <div className="card-body p-4">
                        <h5 className="fw-bold mb-4">Frequently Asked Questions</h5>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <h6 className="fw-semibold">What size dehumidifier do I need for a 1000 sq ft
                                    basement?</h6>
                                <p className="small text-muted">For a moderately damp 1000 sq ft basement with 8ft
                                    ceilings, you typically need a 30-40 pint dehumidifier. However, factors like
                                    unfinished space or moisture sources can increase this to 45-50 pints.</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="fw-semibold">Should I get a dehumidifier with a pump?</h6>
                                <p className="small text-muted">If you don't have a floor drain or want to avoid
                                    manually emptying buckets, yes. Pump models automatically push water up and out
                                    through a hose or to a sink.</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="fw-semibold">Do I need a desiccant dehumidifier for my basement?</h6>
                                <p className="small text-muted">Only if your basement stays below 60°F consistently.
                                    Desiccant models work better in cold conditions, while compressor models are more
                                    energy-efficient for typical basements.</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="fw-semibold">How do I know if my basement is very damp?</h6>
                                <p className="small text-muted">Look for condensation on pipes, musty odors, damp spots
                                    on walls, or use a hygrometer. Readings consistently above 65% RH indicate a damp
                                    basement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}