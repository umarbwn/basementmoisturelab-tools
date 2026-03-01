'use client'

import {useRef, useState} from "react";
import {Stepper} from "primereact/stepper";
import {StepperPanel} from "primereact/stepperpanel";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Ruler} from "lucide-react";
import {Dropdown} from "primereact/dropdown";

export default function DehumidifierCalculator() {
    const ceilingHeights = [
        {value: 'low', label: 'Less than 8 ft', height: 7, multiplier: 0.9},
        {value: 'standard', label: '8 ft (Standard)', height: 8, multiplier: 1.0},
        {value: 'high', label: '9 ft', height: 9, multiplier: 1.125},
        {value: 'very_high', label: '10 ft+', height: 10, multiplier: 1.25}
    ];

    const [selectedCity, setSelectedCity] = useState(null);

    const stepperRef = useRef<any>(null);

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
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                    onClick={() => stepperRef.current.nextCallback()}/>
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
        <div className={'flex flex-cols-2 gap-6 px-6'}>
            <div className={'w-full'}>
                <Stepper ref={stepperRef} style={{flexBasis: '50rem'}} orientation="vertical">
                    <StepperPanel header="Basement Size">
                        <Card footer={footer}>
                            <div className="flex flex-column gap-2 mb-6">
                                <label htmlFor="username">Square Footage</label>
                                <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                                    <InputText placeholder="Square Footage"/>
                                </div>
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="username">Ceiling Height</label>
                                <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                                    <Dropdown
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.value)}
                                        options={ceilingHeights}
                                        optionLabel="label"
                                        placeholder="Select Ceiling Height" className="w-full"/>
                                </div>
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </Card>
                    </StepperPanel>
                    <StepperPanel header="Moisture Condition">
                        <Card footer={footer1}>
                            <div className="flex flex-column gap-2 mb-6">
                                <label htmlFor="username">Square Footage</label>
                                <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                                    <InputText placeholder="Square Footage"/>
                                </div>
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="username">Ceiling Height</label>
                                <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                                    <Dropdown
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.value)}
                                        options={ceilingHeights}
                                        optionLabel="label"
                                        placeholder="Select Ceiling Height" className="w-full"/>
                                </div>
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </Card>
                    </StepperPanel>
                    <StepperPanel header="Space Type">
                        <Card footer={footer2}>
                            <div className="flex flex-column gap-2 mb-6">
                                <label htmlFor="username">Square Footage</label>
                                <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                                    <InputText placeholder="Square Footage"/>
                                </div>
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="username">Ceiling Height</label>
                                <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                                    <Dropdown
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.value)}
                                        options={ceilingHeights}
                                        optionLabel="label"
                                        placeholder="Select Ceiling Height" className="w-full"/>
                                </div>
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </Card>
                    </StepperPanel>
                    <StepperPanel header="Additional Sources">
                        <Card footer={footer3}>
                            <div className="flex flex-column gap-2 mb-6">
                                <label htmlFor="username">Square Footage</label>
                                <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                                    <InputText placeholder="Square Footage"/>
                                </div>
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="username">Ceiling Height</label>
                                <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                                    <Dropdown
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.value)}
                                        options={ceilingHeights}
                                        optionLabel="label"
                                        placeholder="Select Ceiling Height" className="w-full"/>
                                </div>
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </Card>
                    </StepperPanel>
                    <StepperPanel header="Drainage Options">
                        <Card footer={footer4}>
                            <div className="flex flex-column gap-2 mb-6">
                                <label htmlFor="username">Square Footage</label>
                                <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                                    <InputText placeholder="Square Footage"/>
                                </div>
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="username">Ceiling Height</label>
                                <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                                    <Dropdown
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.value)}
                                        options={ceilingHeights}
                                        optionLabel="label"
                                        placeholder="Select Ceiling Height" className="w-full"/>
                                </div>
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </Card>
                    </StepperPanel>
                </Stepper>
            </div>
            <div className={'w-full'}>
                <Card title={'Your Results'} footer={footer5} className={'max-w-full'}>
                    <div className="flex flex-column gap-2 mb-6">
                        <label htmlFor="username">Square Footage</label>
                        <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                            <InputText placeholder="Square Footage"/>
                        </div>
                        <small id="username-help">
                            Enter your username to reset your password.
                        </small>
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">Ceiling Height</label>
                        <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <Ruler/>
                                </span>
                            <Dropdown
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.value)}
                                options={ceilingHeights}
                                optionLabel="label"
                                placeholder="Select Ceiling Height" className="w-full"/>
                        </div>
                        <small id="username-help">
                            Enter your username to reset your password.
                        </small>
                    </div>
                </Card>
            </div>
        </div>
    );

}