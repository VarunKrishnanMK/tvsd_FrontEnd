import { Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Table from '../../components/Table';
import { getInvoices } from '../../apiService/ApiService';
import { userContext } from '../../contexts/UserContext';

export default function Payment() {
    const { setLoader } = useContext(userContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [openModal, setOpenModal] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [invoiceList, setInvoiceList] = useState([]);

    const onSubmitForm = (data) => {
        console.log(data);
    }

    const fetchInvoices = (page, pageSize) => {
        let payload = {
            page,
            pageSize
        }
        setLoader(true);
        getInvoices(payload)
            .then((res) => {
                let data = res.data.invoices;
                setInvoiceList(data);
            })
            .catch((error) => {
                console.error('Error fetching invoice details:', error);
            })
            .finally(() => {
                setLoader(false);
            });
    }

    useEffect(() => {
        fetchInvoices();
    }, [])

    const handleOnEdit = (data) => {
        console.log(data);
    }

    const handleOnDelete = (data) => {
        console.log(data);
    }

    return (
        <div className='container-fluid'>
            <div className='text-end my-3'>
                <button className='btn btn-primary' onClick={() => { setOpenModal(true), setModalTitle("Add Payment") }}>Add payment</button>
            </div>
            <Modal
                title={modalTitle}
                centered
                open={openModal}
                className='modalWidth'
                onCancel={() => setOpenModal(false)}
                footer={null}
            >
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className='container-fluid row'>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor="invoiceTitle" className='form-label'>Invoice Title</label>
                            <input type="text" className='form-control' id="invoiceTitle" {...register("invoiceTitle", { required: true })} />
                            {errors.invoiceTitle && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor="amount" className='form-label'>Amount</label>
                            <input type="text" className='form-control' id="amount" {...register("amount", { required: true })} />
                            {errors.amount && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor="description" className='form-label'>Description</label>
                            <input type="text" className='form-control' id="description" {...register("description", { required: true })} />
                            {errors.description && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor="accountHolderName" className='form-label'>Party Email</label>
                            <input type="email" className='form-control' id="accountHolderName" {...register("accountHolderName", { required: true })} />
                            {errors.accountHolderName && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor="accountHolderName" className='form-label'>Party Contact</label>
                            <input type="number" className='form-control' id="accountHolderName" {...register("accountHolderName", { required: true })} />
                            {errors.accountHolderName && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor="accountHolderName" className='form-label'>Payment Date</label>
                            <input type="date" className='form-control' id="accountHolderName" {...register("accountHolderName", { required: true })} />
                            {errors.accountHolderName && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor="toBeneficiaryAccountId" className='form-label'>Beneficiary Account</label>
                            <select className='form-select' id="toBeneficiaryAccountId" {...register("toBeneficiaryAccountId", { required: true })}>
                                <option value="">Select Account Type</option>
                                <option value="savings">Savings</option>
                                <option value="current">Current</option>
                            </select>
                            {errors.toBeneficiaryAccountId && <span className='text-danger'>This field is required</span>}
                        </div>
                    </div>
                    <div className='text-end'>
                        <button type="button" className='btn btn-warning me-3' onClick={() => setOpenModal(false)}>Cancel</button>
                        <button type="submit" className='btn btn-success'>Submit</button>
                    </div>
                </form>
            </Modal>
            <div className='card border-0 shadow p-2'>
                <Table dataSource={invoiceList} onEdit={handleOnEdit} onDelete={handleOnDelete} handlePageChange={fetchInvoices} />
            </div>
        </div>
    )
}
