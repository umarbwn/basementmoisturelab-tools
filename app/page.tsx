'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";

export default function Page() {

    return (
        <div className={'container min-vh-100'}>
            <div className="row min-vh-100">
                <div className="col-12 mt-3 col-sm-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Dehumidifier Calculator</h5>
                            <p className="card-text">A Dehumidifier Calculator estimates the right dehumidifier size
                                based on room size and humidity to effectively remove excess moisture.</p>
                            <Link href="/tools/dehumidifier-calculator" className="btn btn-primary">Calculate</Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3 col-sm-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Basement Humidity Level Checker</h5>
                            <p className="card-text">Monitor and check basement humidity levels to help prevent mold, dampness, and damage, keeping your storage area dry and safe.</p>
                            <Link href="/tools/basement-humidity-checker" className="btn btn-primary">Calculate</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}