'use client'

import styled from "styled-components";

const MainContainer = styled.div`
    display: grid;
    grid-template-columns: 3fr 5fr 4fr;
    gap: 24px;
    height: 100%;

    .stepper-container {
        background-color: #00000005;
        padding: 40px 16px 16px 16px;

        .nav {
            gap: 30px;
            width: 100%;
            
            .nav-item {
                display: flex;
                align-items: center;
                gap: 30px;
                cursor: pointer;
                
                .counter {
                    width: 40px;
                    height: 40px;
                    background-color: transparent;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #263238;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 16px;
                    border: 1px solid #263238;
                    transition: 200ms all ease-in-out;
                }
                
                .step-label {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    
                    .count {
                        font-size: 14px;
                        color: #263238;
                    }
                    
                    .label {
                        color: #1E1E1E;
                        font-weight: 600;
                    }
                    
                }

                &.active,
                &:hover {
                    
                    .counter {
                        background-color: var(--color-primary);
                        border-color: var(--color-primary);
                        color: var(--color-white);
                    }
                    
                }
                
            }
            
        }

    }
    
    .stepper-section {
        border: none;
        height: 100%;
        padding: 24px 0;
        
        .stepper-header {
            font-size: 24px;
            line-height: 24px;
            font-weight: 600;
            border: none;
            background-color: transparent;
            padding: 0;
            padding-bottom: 24px;
        }
        
        .card-body {
            padding: 0;
        }
        
        .card-footer {
            border: none;
            background-color: transparent;
            padding: 0;
            padding-top: 24px;
        }
        
    }
    
    .stepper-tabs {
        height: 100%;
    }

`;

export default function DehumidifierCalculator() {
    const stepData = [
        {
            label: 'Basement Size',
            value: 1
        },
        {
            label: 'Moisture Condition',
            value: 2
        },
        {
            label: 'Space Type',
            value: 3
        },
        {
            label: 'Additional Sources',
            value: 4
        },
        {
            label: 'Drainage Options',
            value: 5
        },
        {
            label: 'Your Results',
            value: 6
        }
    ];

    return (
        <MainContainer>
            <div className={'stepper-container'}>
                <ul className="nav flex-column">
                    {stepData.map((item) => (
                        <li key={item.value} className="nav-item">
                            <div className={'counter'}>
                                {item.value}
                            </div>
                            <div className="step-label">
                                <span className={'count'}>Step {item.value}</span>
                                <span className={'label'}>{item.label}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={'stepper-tabs'}>
                <div className={'card stepper-section'}>
                    <div className={'card-header stepper-header'}>Basement Size</div>
                    <div className="card-body section-body">
                        <div className="mb-3">
                            <label htmlFor={'squereFoot'} className={'form-label'}>Square Footage</label>
                            <input type="text" className={'form-control'} id={'squereFoot'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor={'ceilingHeight'} className={'form-label'}>Ceiling Height</label>
                            <select className="form-select" id={'ceilingHeight'}>
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="card-footer section-footer">
                        <button className={'btn btn-primary'}>Next</button>
                    </div>
                </div>
            </div>
            <div className={'blog-part'}></div>
        </MainContainer>
    );
}