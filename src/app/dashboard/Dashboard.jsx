import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../contexts/UserContext'
import { getDashBoradDetails } from '../../apiService/ApiService'
import Table from '../../components/Table'
import { useNavigate } from 'react-router';

export default function Dashboard() {
    const { setLoader } = useContext(userContext);
    const [dashboardDetails, setDashboardDetails] = useState({});
    const [totalPaymentPending, setTotalPaymentPending] = useState();
    const [totalPaymentCompleted, setTotalPaymentCompleted] = useState();
    const customKeysToExclude = ["amount", "description", "payeeEmail", "payeeContact", "status", "fromBankAccountId", "toBeneficiaryAccountId", "fromBankAccount", "toBeneficiaryAccount"];

    const navigate = useNavigate();

    useEffect(() => {
        setLoader(true);
        getDashBoradDetails()
            .then((res) => {
                let { dashboardDetails } = res.data;
                setDashboardDetails(dashboardDetails);
                setTotalPaymentPending(dashboardDetails.totalPendingPayments.length)
                setTotalPaymentCompleted(dashboardDetails.totalCompletedPayments.length)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoader(false);
            })
    }, [])

    const handleOnView = () => {
        navigate("/account");
    }

    return (
        <div className='container-fluid'>
            <div className='row my-3 d-flex justify-content-center'>
                <div className='col-md-3 mb-3'>
                    <div className='card border-0 shadow h-100 text-center'>
                        <div className='card-header'>
                            Total Accounts
                        </div>
                        <div className='card-body'>
                            <b>{dashboardDetails.totalAccounts}</b>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 mb-3'>
                    <div className='card border-0 shadow h-100 text-center'>
                        <div className='card-header'>
                            Total Balance Amount
                        </div>
                        <div className='card-body'>
                            <b>{dashboardDetails.totalAmount}</b>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 mb-3'>
                    <div className='card border-0 shadow h-100 text-center'>
                        <div className='card-header'>
                            Total Beneficiary Accounts
                        </div>
                        <div className='card-body'>
                            <b>{dashboardDetails.totalBeneficiary}</b>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 mb-3'>
                    <div className='card border-0 shadow h-100 text-center'>
                        <div className='card-header'>
                            Total Pending Payments
                        </div>
                        <div className='card-body'>
                            <b>{totalPaymentPending}</b>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 mb-3'>
                    <div className='card border-0 shadow h-100 text-center'>
                        <div className='card-header'>
                            Total Completed Payments
                        </div>
                        <div className='card-body'>
                            <b>{totalPaymentCompleted}</b>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <div className='col-md-6 mb-3'>
                    <div className='card border-0'>
                        <div className='card-header text-center'>
                            Upcoming payments
                        </div>
                        <div className='card-body'>
                            {
                                dashboardDetails.totalPendingPayments ??
                                <Table dataSource={dashboardDetails.totalPendingPayments} customKeysToExclude={customKeysToExclude} onView={handleOnView} viewDelete={false} viewEdit={false} viewView={true} />
                            }
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-3'>
                    <div className='card border-0'>
                        <div className='card-header text-center'>
                            Completed payments
                        </div>
                        <div className='card-body'>
                            {
                                dashboardDetails.totalCompletedPayments ??
                                <Table dataSource={dashboardDetails.totalCompletedPayments} customKeysToExclude={customKeysToExclude} onView={handleOnView} viewDelete={false} viewEdit={false} viewView={true} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
