import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { data: payments=[] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
            <SectionTitle title={'Total Payment'} subTitle={'History'}></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payments.map(payment=><tr key={payment._id}>
                                <th>{payment.date}</th>
                                <td>{payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.status}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;