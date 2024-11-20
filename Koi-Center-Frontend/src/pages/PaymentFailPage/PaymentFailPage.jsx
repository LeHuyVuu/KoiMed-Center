import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentFailPage.css';

const PaymentFailPage = () => {
    const navigate = useNavigate();

    const handleTryAgain = () => {
        navigate('/booking');
    };

    const handleContactSupport = () => {
        navigate('/support');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card border-danger">
                        <div className="card-header bg-danger text-white payment-fail-header">
                            <h3 className="mb-0">Payment Failed</h3>
                        </div>
                        <div className="card-body text-center">
                            <i className="fas fa-times-circle payment-fail-icon fa-5x mb-3"></i>
                            <h4 className="mb-3">Oops! Your payment was unsuccessful.</h4>
                            <p className="mb-4">
                                We're sorry, but we couldn't process your payment at this time. 
                                This could be due to insufficient funds, an expired card, or a temporary issue with your payment method.
                            </p>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-primary payment-fail-btn-primary" onClick={handleTryAgain}>
                                    Try Again
                                </button>
                                <button className="btn btn-outline-secondary payment-fail-btn-secondary" onClick={handleContactSupport}>
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailPage;