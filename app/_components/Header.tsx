'use client'

import Link from "next/link";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    Basement Moisture Lab
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" href={'/tools/dehumidifier-calculator'}>
                                Dehumidifier Calculator
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" href={'/tools/basement-humidity-checker'}>
                                Basement Humidity Level Checker
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" href={'/tools/basement-waterproofing-cost-calculator'}>
                                Basement Waterproofing Cost Calculator
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}