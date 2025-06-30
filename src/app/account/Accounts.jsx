import React, { useContext, useEffect, useState } from 'react'
import { createBankAccounts, createBeneficiaryAccounts, getBankAccounts, getBeneficiaryAccounts, getUserDetails } from '../../apiService/ApiService';
import { userContext } from '../../contexts/UserContext';
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import Table from '../../components/Table';

export default function Accounts() {
    const { setLoader } = useContext(userContext);
    const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm();
    const [userDetails, setUserDetails] = useState({});
    const [bankType, setBankType] = useState("");
    const [bankAccounts, setBankAccounts] = useState([]);
    const [beneficiaryAccounts, setBeneficiaryAccounts] = useState([]);
    const [modelVisible, setModelVisible] = useState(false);
    const [modalTitile, setModalTitile] = useState("");

    const fetchUserDetails = async () => {
        setLoader(true);
        await getUserDetails()
            .then((res) => {
                let data = res.data.user;
                setUserDetails(data);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            })
            .finally(() => {
                setLoader(false);
            });
    }

    const fetchBankAccounts = async (page, pageSize) => {
        let payload = {
            page,
            pageSize
        }
        setLoader(true);
        await getBankAccounts(payload)
            .then((res) => {
                let data = res.data.bankAccounts;
                setBankAccounts(data);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            })
            .finally(() => {
                setLoader(false);
            });
    }

    const fetchBeneficiaryAccounts = async (page, pageSize) => {
        let payload = {
            page,
            pageSize
        }
        setLoader(true);
        await getBeneficiaryAccounts(payload)
            .then((res) => {
                let data = res.data.beneficiaryAccount;
                setBeneficiaryAccounts(data);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            })
            .finally(() => {
                setLoader(false);
            });
    }

    useEffect(() => {
        fetchUserDetails();
        fetchBankAccounts();
        fetchBeneficiaryAccounts();
    }, []);

    const handleOnEdit = (data) => {
        console.log(data);
    }

    const handleOnDelete = (data) => {
        console.log(data);
    }

    const handleModalClick = (type) => {
        setModelVisible(true);
        clearErrors();
        setBankType(type)
        if (type === "bank") {
            setModalTitile("Add Bank Account");
        } else if (type === "beneficiary") {
            setModalTitile("Add Beneficiary Account");
        }
    }

    const onSubmitForm = (data) => {
        setLoader(true);
        let payload = {};
        try {
            if (bankType !== "bank") {
                let { balance, ...restData } = data;
                payload = restData;
                createBeneficiaryAccounts(payload)
            }
            else {
                createBankAccounts(data)
            }
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoader(false);
            reset();
            setModelVisible(false);
            fetchBankAccounts();
            fetchBeneficiaryAccounts();
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row gx-2 my-3'>
                <div className='col-md-3 mb-3'>
                    <div className='card border-0 shadow'>
                        <div className='card-header'>
                            <h5 className='mb-0 text-center'>Account Details</h5>
                        </div>
                        <div className='card-body'>
                            <div className='text-center'>
                                <img className='w-50 img-fluid rounded-circle mb-3' src={userDetails.profilePicture || '/images/UserImage.webp'} alt="Profile" />
                            </div>
                            <div className='table-responsive'>
                                <table className='table table-borderless table-sm'>
                                    <tbody>
                                        <tr>
                                            <th className='text-nowrap'>Name</th>
                                            <td>{userDetails.firstName + " " + userDetails.lastName}</td>
                                        </tr>
                                        <tr>
                                            <th className='text-nowrap'>Nick Name</th>
                                            <td>{userDetails.nickName}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{userDetails.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <td>{userDetails.mobile}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='text-end'>
                                <button className='btn btn-sm btn-warning fw-bold' onClick={() => alert('Edit Profile Clicked')}>Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-9 mb-3'>
                    <div className='card border-0 shadow p-2'>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item me-3" role="presentation">
                                <button className="nav-link active btn-sm" id="pills-bankAccounts-tab" data-bs-toggle="pill" data-bs-target="#pills-bankAccounts" type="button" role="tab" aria-controls="pills-bankAccounts" aria-selected="true">Bank Accounts</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link  btn-sm" id="pills-beneficiaryAccounts-tab" data-bs-toggle="pill" data-bs-target="#pills-beneficiaryAccounts" type="button" role="tab" aria-controls="pills-beneficiaryAccounts" aria-selected="false">Beneficiary Accounts</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-bankAccounts" role="tabpanel" aria-labelledby="pills-bankAccounts-tab" tabindex="0">
                                <div className='text-end mb-3'>
                                    <button className='btn btn-primary' onClick={() => handleModalClick("bank")}><i className="bi bi-plus-circle me-2"></i>Add Bank Account</button>
                                </div>
                                <div className='container-fluid'>
                                    <Table dataSource={bankAccounts} onEdit={handleOnEdit} onDelete={handleOnDelete} handlePageChange={fetchBankAccounts} />
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-beneficiaryAccounts" role="tabpanel" aria-labelledby="pills-beneficiaryAccounts-tab" tabindex="0">
                                <div className='text-end mb-3'>
                                    <button className='btn btn-primary' onClick={() => handleModalClick("beneficiary")}><i className="bi bi-plus-circle me-2"></i>Add Beneficiary Account</button>
                                </div>
                                <div className='container-fluid'>
                                    <Table dataSource={beneficiaryAccounts} onEdit={handleOnEdit} onDelete={handleOnDelete} handlePageChange={fetchBeneficiaryAccounts} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    title={modalTitile}
                    centered
                    open={modelVisible}
                    className='modalWidth'
                    onCancel={() => setModelVisible(false)}
                    footer={null}
                >
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div className='container-fluid row'>
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="accountHolderName" className='form-label'>Account Holder Name</label>
                                <input type="text" className='form-control' id="accountHolderName" {...register("accountHolderName", { required: true })} />
                                {errors.accountHolderName && <span className='text-danger'>Account Holder Name is required</span>}
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="accountHolderNickName" className='form-label'>Account Holder Nick Name</label>
                                <input type="text" className='form-control' id="accountHolderNickName" {...register("accountHolderNickName", { required: true })} />
                                {errors.accountHolderNickName && <span className='text-danger'>Account Holder Nick Name is required</span>}
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="accountNumber" className='form-label'>Account Number</label>
                                <input type="number" className='form-control' id="accountNumber" {...register("accountNumber", { required: true })} />
                                {errors.accountNumber && <span className='text-danger'>Account Number is required</span>}
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="accountType" className='form-label'>Account Type</label>
                                <select className='form-select' id="accountType" {...register("accountType", { required: true })}>
                                    <option value="">Select Account Type</option>
                                    <option value="savings">Savings</option>
                                    <option value="current">Current</option>
                                </select>
                                {errors.accountType && <span className='text-danger'>Account Type is required</span>}
                            </div>
                            {modalTitile === "Add Bank Account" && (
                                <div className='col-md-6 mb-3'>
                                    <label htmlFor="balance" className='form-label'>Balance</label>
                                    <input type="number" className='form-control' id="balance" {...register("balance", { required: true })} />
                                    {errors.balance && <span className='text-danger'>Balance is required</span>}
                                </div>
                            )}
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="bankName" className='form-label'>Bank Name</label>
                                <input type="text" className='form-control' id="bankName" {...register("bankName", { required: true })} />
                                {errors.bankName && <span className='text-danger'>Bank Name is required</span>}
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="branchName" className='form-label'>Branch</label>
                                <input type="text" className='form-control' id="branchName" {...register("branch", { required: true })} />
                                {errors.branchName && <span className='text-danger'>Branch Name is required</span>}
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="ifscCode" className='form-label'>IFSC Code</label>
                                <input type="text" className='form-control' id="ifscCode" {...register("ifscCode", { required: true })} />
                                {errors.ifscCode && <span className='text-danger'>IFSC Code is required</span>}
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="pinCode" className='form-label'>Pin Code</label>
                                <input type="text" className='form-control' id="pinCode" {...register("pincode", { required: true })} />
                                {errors.pinCode && <span className='text-danger'>Pin Code is required</span>}
                            </div>
                        </div>
                        <div className='text-end'>
                            <button type="button" className='btn btn-warning me-3' onClick={() => setModelVisible(false)}>Cancel</button>
                            <button type="submit" className='btn btn-success'>Submit</button>
                        </div>
                    </form>
                </Modal>
            </div >
        </div >
    )
}
