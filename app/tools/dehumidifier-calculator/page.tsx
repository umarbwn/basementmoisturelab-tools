'use client'

import {useEffect, useRef, useState} from "react";
import {Stepper} from "primereact/stepper";
import {StepperPanel} from "primereact/stepperpanel";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card as BsCard} from 'react-bootstrap'
import {
    AlertTriangle,
    ArrowRight,
    BookOpen,
    ChevronRight,
    Droplets,
    HelpCircle,
    Home,
    Mail,
    Ruler,
    Thermometer
} from "lucide-react";
import {Alert, Badge, Col, Form, ListGroup, Row} from "react-bootstrap";

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
            blog: {title: 'Diagnosing Basement Moisture', url: '/blog/diagnosing-basement-moisture'}
        },
        {
            value: 'very_damp',
            label: 'Very Damp',
            description: 'Visible sweating on pipes, damp spots',
            modifier: 1.3,
            blog: {title: 'Diagnosing Basement Moisture', url: '/blog/diagnosing-basement-moisture'}
        },
        {
            value: 'wet',
            label: 'Wet',
            description: 'Constant moisture, minor seepage',
            modifier: 1.6,
            blog: {title: 'Diagnosing Basement Moisture', url: '/blog/diagnosing-basement-moisture'}
        },
        {
            value: 'extreme',
            label: 'Extremely Wet / Post-Flood',
            description: 'Standing water, recent flooding',
            modifier: 2.0,
            blog: {title: 'Dehumidifier After Flood', url: '/blog/dehumidifier-after-flood'}
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
            blog: {title: 'Dirt Floor Vapor Barriers', url: '/blog/dirt-floor-vapor-barrier'}
        },
        {
            value: 'foundation_cracks',
            label: 'Visible foundation cracks',
            addition: 3,
            blog: {title: 'Sealing Foundation Cracks', url: '/blog/sealing-foundation-cracks'}
        },
        {
            value: 'sump_pit',
            label: 'Open sump pump pit',
            addition: 3,
            blog: {title: 'Sump Pump Humidity', url: '/blog/sump-pump-humidity'}
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
    const stepperRef = useRef<any>(null);

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

    const footer = (
        <>
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                    onClick={() => stepperRef.current.nextCallback()}/>
        </>
    );

    const footer1 = (
        <>
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                    onClick={() => stepperRef.current.prevCallback()}/>
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                    onClick={() => stepperRef.current.nextCallback()}/>
        </>
    );

    const footer2 = (
        <>
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                    onClick={() => stepperRef.current.prevCallback()}/>
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                    onClick={() => stepperRef.current.nextCallback()}/>
        </>
    );

    const footer3 = (
        <>
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                    onClick={() => stepperRef.current.prevCallback()}/>
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                    onClick={() => stepperRef.current.nextCallback()}/>
        </>
    );

    const footer4 = (
        <>
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                    onClick={() => stepperRef.current.prevCallback()}/>
            <Button
                onClick={handleCalculate}
                disabled={completedCount < 5}
                className="w-100 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
            >
                Calculate My Dehumidifier Size
                <ArrowRight size={20}/>
            </Button>
            {completedCount < 5 && (
                <Form.Text className="text-warning d-block text-center mt-2">
                    Please complete size, height, moisture, finish, and drainage to calculate
                </Form.Text>
            )}
        </>
    );

    const footer5 = (
        <>
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                    onClick={() => stepperRef.current.prevCallback()}/>
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                    onClick={() => stepperRef.current.nextCallback()}/>
        </>
    );

    return (
        <>
            <div className={'flex flex-cols-2 gap-6 px-6'}>
                <div className={'w-full'}>
                    <Stepper ref={stepperRef} style={{flexBasis: '50rem'}} orientation="vertical">
                        <StepperPanel header="Basement Size">
                            <Card footer={footer}>
                                <div className="mb-4 pb-3 border-bottom">
                                    <Row className="align-items-center mb-3">
                                        <Col>
                                            <div className="d-flex align-items-center gap-2">
                                                <Badge
                                                    bg={completedSteps[0] ? 'success' : 'primary'}
                                                    pill
                                                    className="rounded-circle p-2"
                                                    style={{width: '28px', height: '28px'}}
                                                >
                                                    {completedSteps[0] ? '✓' : '1'}
                                                </Badge>
                                                <h5 className="fw-semibold mb-0">Basement Size</h5>
                                            </div>
                                        </Col>
                                        <Col xs="auto">
                                            <Button
                                                onClick={() => setActiveBlogTip(activeBlogTip === 'size' ? null : 'size')}
                                                className="text-decoration-none"
                                            >
                                                <BookOpen size={16} className="me-1"/>
                                                Why size matters
                                            </Button>
                                        </Col>
                                    </Row>

                                    {activeBlogTip === 'size' && (
                                        <Alert variant="info" className="mb-3">
                                            <Button
                                                onClick={() => setActiveBlogTip(null)}
                                                className="float-end"
                                            />
                                            <h6 className="alert-heading">Why Volume Matters</h6>
                                            <p className="small mb-2">
                                                Ceiling height dramatically affects dehumidifier needs. A 1500 sq ft
                                                basement with 10ft ceilings
                                                has 25% more air to dehumidify than one with 8ft ceilings.
                                            </p>
                                            <a href="/blog/basement-volume-vs-square-feet" className="small fw-medium">
                                                Read full guide <ChevronRight size={14}/>
                                            </a>
                                        </Alert>
                                    )}

                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-medium">Square Footage</Form.Label>
                                        <div className="position-relative">
                                            <Ruler size={18}
                                                   className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"/>
                                            <Form.Control
                                                type="number"
                                                min="100"
                                                max="5000"
                                                value={inputs.sqFootage}
                                                onChange={(e) => handleInputChange('sqFootage', parseInt(e.target.value) || 100)}
                                                className="ps-5"
                                                placeholder="e.g., 1000"
                                            />
                                        </div>
                                        {inputs.sqFootage < 100 && (
                                            <Form.Text className="text-warning">Minimum recommended size is 100 sq
                                                ft</Form.Text>
                                        )}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="small fw-medium">Ceiling Height</Form.Label>
                                        <Form.Select
                                            value={inputs.ceilingHeight}
                                            onChange={(e) => handleInputChange('ceilingHeight', e.target.value)}
                                        >
                                            {TOOL_DATA.ceilingHeights.map(h => (
                                                <option key={h.value} value={h.value}>{h.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </Card>
                        </StepperPanel>
                        <StepperPanel header="Moisture Condition">
                            <Card footer={footer1}>
                                <div className="mb-4 pb-3 border-bottom">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <Badge
                                            bg={completedSteps[2] ? 'success' : 'primary'}
                                            pill
                                            className="rounded-circle p-2"
                                            style={{width: '28px', height: '28px'}}
                                        >
                                            {completedSteps[2] ? '✓' : '2'}
                                        </Badge>
                                        <h5 className="fw-semibold mb-0">Moisture Condition</h5>
                                    </div>

                                    <div className="space-y-3">
                                        {TOOL_DATA.moistureLevels.map(level => (
                                            <div key={level.value} className="position-relative mb-2">
                                                <Form.Check
                                                    type="radio"
                                                    id={`moisture-${level.value}`}
                                                    name="moistureLevel"
                                                    value={level.value}
                                                    checked={inputs.moistureLevel === level.value}
                                                    onChange={(e) => handleInputChange('moistureLevel', e.target.value)}
                                                    className="border rounded p-3 cursor-pointer"
                                                    style={{
                                                        backgroundColor: inputs.moistureLevel === level.value ? '#e6f2ff' : 'transparent',
                                                        borderColor: inputs.moistureLevel === level.value ? '#0d6efd' : '#dee2e6'
                                                    }}
                                                    label={
                                                        <div className="w-100">
                                                            <div
                                                                className="d-flex justify-content-between align-items-center">
                                                                <span className="fw-medium">{level.label}</span>
                                                                <Droplets size={18}
                                                                          className={inputs.moistureLevel === level.value ? 'text-primary' : 'text-muted'}/>
                                                            </div>
                                                            <small
                                                                className="text-muted d-block">{level.description}</small>
                                                        </div>
                                                    }
                                                />
                                                {level.blog && (
                                                    <a
                                                        href={level.blog.url}
                                                        className="position-absolute top-0 end-0 mt-3 me-3 small text-primary text-decoration-none"
                                                        target="_blank"
                                                        rel="noopener"
                                                    >
                                                        Learn more <ChevronRight size={12}/>
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </StepperPanel>
                        <StepperPanel header="Space Type">
                            <Card footer={footer2}>
                                <div className="mb-4 pb-3 border-bottom">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <Badge
                                            bg={completedSteps[3] ? 'success' : 'primary'}
                                            pill
                                            className="rounded-circle p-2"
                                            style={{width: '28px', height: '28px'}}
                                        >
                                            {completedSteps[3] ? '✓' : '3'}
                                        </Badge>
                                        <h5 className="fw-semibold mb-0">Space Type</h5>
                                    </div>

                                    <Row className="g-3">
                                        <Col sm={6}>
                                            <Form.Check
                                                type="radio"
                                                id="finish-finished"
                                                name="finishStatus"
                                                value="finished"
                                                checked={inputs.finishStatus === 'finished'}
                                                onChange={(e) => handleInputChange('finishStatus', e.target.value)}
                                                className="border rounded p-3 text-center h-100 cursor-pointer"
                                                style={{
                                                    backgroundColor: inputs.finishStatus === 'finished' ? '#e6f2ff' : 'transparent',
                                                    borderColor: inputs.finishStatus === 'finished' ? '#0d6efd' : '#dee2e6'
                                                }}
                                                label={
                                                    <div>
                                                        <Home size={32}
                                                              className={`mb-2 ${inputs.finishStatus === 'finished' ? 'text-primary' : 'text-muted'}`}/>
                                                        <div className="fw-medium">Finished</div>
                                                        <small className="text-muted d-block">Drywall, carpet,
                                                            livable</small>
                                                    </div>
                                                }
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Check
                                                type="radio"
                                                id="finish-unfinished"
                                                name="finishStatus"
                                                value="unfinished"
                                                checked={inputs.finishStatus === 'unfinished'}
                                                onChange={(e) => handleInputChange('finishStatus', e.target.value)}
                                                className="border rounded p-3 text-center h-100 cursor-pointer"
                                                style={{
                                                    backgroundColor: inputs.finishStatus === 'unfinished' ? '#e6f2ff' : 'transparent',
                                                    borderColor: inputs.finishStatus === 'unfinished' ? '#0d6efd' : '#dee2e6'
                                                }}
                                                label={
                                                    <div>
                                                        <AlertTriangle size={32}
                                                                       className={`mb-2 ${inputs.finishStatus === 'unfinished' ? 'text-primary' : 'text-muted'}`}/>
                                                        <div className="fw-medium">Unfinished</div>
                                                        <small className="text-muted d-block">Exposed concrete,
                                                            storage</small>
                                                    </div>
                                                }
                                            />
                                        </Col>
                                    </Row>

                                    {inputs.finishStatus === 'unfinished' && (
                                        <Alert variant="warning" className="mt-3">
                                            <strong>Note:</strong> Unfinished basements typically need 8+ more pints
                                            capacity due to exposed concrete and higher air exchange.
                                            <a href="/blog/unfinished-basement-dehumidifier"
                                               className="d-block mt-1 text-warning-emphasis">Learn more →</a>
                                        </Alert>
                                    )}
                                </div>
                            </Card>
                        </StepperPanel>
                        <StepperPanel header="Additional Sources">
                            <Card footer={footer3}>
                                <div className="mb-4 pb-3 border-bottom">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <Badge
                                            bg={completedSteps[4] ? 'success' : 'light'}
                                            text={completedSteps[4] ? 'white' : 'dark'}
                                            pill
                                            className="rounded-circle p-2"
                                            style={{width: '28px', height: '28px'}}
                                        >
                                            {completedSteps[4] ? '✓' : '4'}
                                        </Badge>
                                        <h5 className="fw-semibold mb-0">Additional Sources</h5>
                                        <Badge bg="light" text="dark" className="ms-2">Optional</Badge>
                                    </div>

                                    <div className="space-y-2">
                                        {TOOL_DATA.moistureSources.map(source => (
                                            <div key={source.value} className="position-relative mb-2">
                                                <Form.Check
                                                    type="checkbox"
                                                    id={`source-${source.value}`}
                                                    checked={inputs.moistureSources.includes(source.value)}
                                                    onChange={() => handleSourceToggle(source.value)}
                                                    className="border rounded p-3 cursor-pointer"
                                                    label={
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className="small">{source.label}</span>
                                                            <Badge bg="light" text="dark">+{source.addition} pints</Badge>
                                                        </div>
                                                    }
                                                />
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
                            </Card>
                        </StepperPanel>
                        <StepperPanel header="Drainage Options">
                            <Card footer={footer4}>
                                <div className="mb-4">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <Badge
                                            bg={completedSteps[5] ? 'success' : 'primary'}
                                            pill
                                            className="rounded-circle p-2"
                                            style={{width: '28px', height: '28px'}}
                                        >
                                            {completedSteps[5] ? '✓' : '5'}
                                        </Badge>
                                        <h5 className="fw-semibold mb-0">Drainage Options</h5>
                                    </div>

                                    <Row className="g-3">
                                        <Col sm={6}>
                                            <Form.Check
                                                type="radio"
                                                id="drain-yes"
                                                name="drainage"
                                                value="yes"
                                                checked={inputs.drainage === 'yes'}
                                                onChange={(e) => handleInputChange('drainage', e.target.value)}
                                                className="border rounded p-3 h-100 cursor-pointer"
                                                style={{
                                                    backgroundColor: inputs.drainage === 'yes' ? '#e6f2ff' : 'transparent',
                                                    borderColor: inputs.drainage === 'yes' ? '#0d6efd' : '#dee2e6'
                                                }}
                                                label={
                                                    <div>
                                                        <div className="fw-medium">Yes, floor drain</div>
                                                        <small className="text-muted">Can use gravity drainage</small>
                                                    </div>
                                                }
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Check
                                                type="radio"
                                                id="drain-no"
                                                name="drainage"
                                                value="no"
                                                checked={inputs.drainage === 'no'}
                                                onChange={(e) => handleInputChange('drainage', e.target.value)}
                                                className="border rounded p-3 h-100 cursor-pointer"
                                                style={{
                                                    backgroundColor: inputs.drainage === 'no' ? '#e6f2ff' : 'transparent',
                                                    borderColor: inputs.drainage === 'no' ? '#0d6efd' : '#dee2e6'
                                                }}
                                                label={
                                                    <div>
                                                        <div className="fw-medium">No drain</div>
                                                        <small className="text-muted">Will need pump model</small>
                                                    </div>
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </StepperPanel>
                    </Stepper>
                </div>
                <div className={'w-full'}>
                    <Card title={'Your Results'} footer={footer5} className={'max-w-full'}>
                        <h5 className="fw-semibold mb-4 d-flex align-items-center gap-2">
                                  <span className="bg-primary bg-opacity-10 text-primary p-2 rounded">
                                    <Thermometer size={20}/>
                                  </span>
                            Your Results
                        </h5>

                        {showResults && results ? (
                            <div className="space-y-4">
                                {/* Primary Result */}
                                <div className="text-center p-4 bg-primary bg-opacity-10 rounded">
                                    <h2 className="display-5 fw-bold text-primary mb-1">
                                        {results.minPints} - {results.maxPints}
                                    </h2>
                                    <p className="text-muted small mb-0">Pints per day</p>
                                </div>

                                {/* Type Recommendation */}
                                <BsCard className="bg-light border-0">
                                    <BsCard.Body>
                                        <h6 className="fw-semibold mb-2">Recommended Type</h6>
                                        {results.type === 'compressor' && (
                                            <p className="small text-muted mb-2">Standard compressor dehumidifier (best for
                                                60°F+)</p>
                                        )}
                                        {results.type === 'desiccant' && (
                                            <p className="small text-muted mb-2">Desiccant dehumidifier (better for cold
                                                basements)</p>
                                        )}
                                        {results.type === 'both' && (
                                            <p className="small text-muted mb-2">Either type works - choose based on your
                                                basement temperature</p>
                                        )}
                                        <a href="/blog/compressor-vs-desiccant"
                                           className="small text-primary text-decoration-none">
                                            Compare types →
                                        </a>
                                    </BsCard.Body>
                                </BsCard>

                                {/* Pump Recommendation */}
                                <BsCard className="bg-light border-0">
                                    <BsCard.Body>
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
                                    </BsCard.Body>
                                </BsCard>

                                {/* Calculation Breakdown */}
                                <div className="border-top pt-3">
                                    <h6 className="fw-semibold mb-2 small">How we calculated this</h6>
                                    <ListGroup variant="flush" className="small">
                                        <ListGroup.Item className="d-flex justify-content-between px-0">
                                            <span className="text-muted">Base capacity</span>
                                            <span className="fw-medium">{results.explanation.baseCapacity} pints</span>
                                        </ListGroup.Item>
                                        {results.explanation.modifiers.map((mod, idx) => (
                                            <ListGroup.Item key={idx} className="d-flex justify-content-between px-0">
                                                <span className="text-muted">{mod.factor}</span>
                                                <span className="fw-medium text-success">+{Math.round(mod.value)}</span>
                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item
                                            className="d-flex justify-content-between px-0 fw-semibold border-top">
                                            <span>Final range</span>
                                            <span className="text-primary">{results.explanation.finalRange}</span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>

                                {/* CTA to Pillar Post */}
                                <Button
                                    className="w-100"
                                >
                                    View Top Rated Dehumidifiers
                                </Button>

                                {/* Save Results */}
                                <Button className="w-100 d-flex align-items-center justify-content-center gap-2">
                                    <Mail size={16}/>
                                    Email My Results
                                </Button>
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
                                    <Button
                                        onClick={handleCalculate}
                                        className="mt-2"
                                    >
                                        Calculate Now
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Help Section */}
                        <div className="mt-4 pt-3 border-top">
                            <div className="d-flex gap-3">
                                <HelpCircle size={20} className="text-muted flex-shrink-0"/>
                                <div>
                                    <h6 className="small fw-semibold mb-1">Need help?</h6>
                                    <p className="small text-muted mb-0">
                                        Check out our guides or use the info buttons throughout the calculator.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Blog Integration Grid */}
            <Row className="mt-5 g-3">
                <Col md={6} lg={4} xl>
                    <BsCard className="h-100 border-0 shadow-sm">
                        <BsCard.Body>
                            <BsCard.Title as="h6" className="fw-semibold">Volume vs Square Feet</BsCard.Title>
                            <BsCard.Text className="small text-muted">Why ceiling height matters</BsCard.Text>
                            <BsCard.Link href="/blog/basement-volume-vs-square-feet" className="stretched-link"/>
                        </BsCard.Body>
                    </BsCard>
                </Col>
                <Col md={6} lg={4} xl>
                    <BsCard className="h-100 border-0 shadow-sm">
                        <BsCard.Body>
                            <BsCard.Title as="h6" className="fw-semibold">Moisture Levels</BsCard.Title>
                            <BsCard.Text className="small text-muted">Diagnose your basement</BsCard.Text>
                            <BsCard.Link href="/blog/diagnosing-basement-moisture" className="stretched-link"/>
                        </BsCard.Body>
                    </BsCard>
                </Col>
                <Col md={6} lg={4} xl>
                    <BsCard className="h-100 border-0 shadow-sm">
                        <BsCard.Body>
                            <BsCard.Title as="h6" className="fw-semibold">Unfinished Spaces</BsCard.Title>
                            <BsCard.Text className="small text-muted">Special considerations</BsCard.Text>
                            <BsCard.Link href="/blog/unfinished-basement-dehumidifier" className="stretched-link"/>
                        </BsCard.Body>
                    </BsCard>
                </Col>
                <Col md={6} lg={4} xl>
                    <BsCard className="h-100 border-0 shadow-sm">
                        <BsCard.Body>
                            <BsCard.Title as="h6" className="fw-semibold">Foundation Cracks</BsCard.Title>
                            <BsCard.Text className="small text-muted">Sealing guide</BsCard.Text>
                            <BsCard.Link href="/blog/sealing-foundation-cracks" className="stretched-link"/>
                        </BsCard.Body>
                    </BsCard>
                </Col>
                <Col md={6} lg={4} xl>
                    <BsCard className="h-100 border-0 shadow-sm">
                        <BsCard.Body>
                            <BsCard.Title as="h6" className="fw-semibold">Pump Guide</BsCard.Title>
                            <BsCard.Text className="small text-muted">Drainage options explained</BsCard.Text>
                            <BsCard.Link href="/blog/dehumidifier-pump-guide" className="stretched-link"/>
                        </BsCard.Body>
                    </BsCard>
                </Col>
            </Row>

            {/* FAQ Section */}
            <BsCard className="mt-5 border-0 bg-light">
                <BsCard.Body className="p-4">
                    <h5 className="fw-bold mb-4">Frequently Asked Questions</h5>
                    <Row className="g-4">
                        <Col md={6}>
                            <h6 className="fw-semibold">What size dehumidifier do I need for a 1000 sq ft basement?</h6>
                            <p className="small text-muted">For a moderately damp 1000 sq ft basement with 8ft ceilings,
                                you typically need a 30-40 pint dehumidifier. However, factors like unfinished space or
                                moisture sources can increase this to 45-50 pints.</p>
                        </Col>
                        <Col md={6}>
                            <h6 className="fw-semibold">Should I get a dehumidifier with a pump?</h6>
                            <p className="small text-muted">If you don&#39;t have a floor drain or want to avoid manually
                                emptying buckets, yes. Pump models automatically push water up and out through a hose or
                                to a sink.</p>
                        </Col>
                        <Col md={6}>
                            <h6 className="fw-semibold">Do I need a desiccant dehumidifier for my basement?</h6>
                            <p className="small text-muted">Only if your basement stays below 60°F consistently.
                                Desiccant models work better in cold conditions, while compressor models are more
                                energy-efficient for typical basements.</p>
                        </Col>
                        <Col md={6}>
                            <h6 className="fw-semibold">How do I know if my basement is very damp?</h6>
                            <p className="small text-muted">Look for condensation on pipes, musty odors, damp spots on
                                walls, or use a hygrometer. Readings consistently above 65% RH indicate a damp
                                basement.</p>
                        </Col>
                    </Row>
                </BsCard.Body>
            </BsCard>
        </>
    );

}