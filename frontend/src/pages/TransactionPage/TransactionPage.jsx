import { useState } from "react";

import TransactionFormSkeleton from "../../components/skeletons/TransactionFormSkeleton";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_TRANSACTION } from "../../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { GET_TRANSACTION } from "../../graphql/queries/transaction.query";

const TransactionPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const{_,data}=useQuery(GET_TRANSACTION,{
    variables:{
      id:id
    }
  })
  console.log(data);
  

  const [formData, setFormData] = useState({
    description: data?.transaction?.description || "",
    paymentType: data?.transaction?.paymentType|| "",
    category: data?.transaction?.category|| "",
    amount: data?.transaction?.amount|| "",
    location: data?.transaction?.location|| "",
    date: data?.transaction?.date || "",
  });


  const [updateTransaction,{loading}] = useMutation(UPDATE_TRANSACTION,{
    refetchQueries:[{query:"GetTransactionsStatistics"}]
  })


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount)
    try {
      await updateTransaction({
        variables:{
          input:{
            ...formData,
            amount,
            transactionId:id
          }
        }
      })
      toast.success("Transaction updated")
      navigate("/")
    } catch (error) {
      toast.error(error.message)
      console.log("error in transaction update form",error);
      
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

 if(loading) return <TransactionFormSkeleton />;

  return (
    <div className="h-screen mt-10 max-w-4xl mx-auto flex flex-col items-center">
      <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r   from-cyan-300 via-white to-cyan-300 inline-block text-transparent bg-clip-text">
        Update this Transaction
      </p>
      <form
        className="translate-y-5 w-full max-w-lg flex flex-col gap-5 px-3 "
        onSubmit={handleSubmit}
      >
        {/* TRANSACTION */}
        <div className="flex flex-wrap">
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="description"
            >
              Transaction
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              name="description"
              type="text"
              placeholder="Rent, Groceries, Salary, etc."
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {/* PAYMENT TYPE */}
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="paymentType"
            >
              Payment Type
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="paymentType"
                name="paymentType"
                onChange={handleInputChange}
                defaultValue={formData.paymentType}
              >
                <option value={"card"}>Card</option>
                <option value={"cash"}>Cash</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight  focus:outline-none focus:bg-white focus:border-gray-500"
                id="category"
                name="category"
                onChange={handleInputChange}
                defaultValue={formData.category}
              >
                <option value={"saving"}>Saving</option>
                <option value={"expense"}>Expense</option>
                <option value={"investment"}>Investment</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase text-white text-xs font-bold mb-2"
              htmlFor="amount"
            >
              Amount($)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="amount"
              name="amount"
              type="number"
              placeholder="150"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="location"
              name="location"
              type="text"
              placeholder="New York"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          {/* DATE */}
          <div className="w-full flex-1">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white"
              placeholder="Select date"
              value={formData.date}
              onChange={handleInputChange}
             
            />
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <button
          className="font-bold w-full rounded px-4 py-2 
         text-white bg-cyan-500"
          type="submit"
        >
          Update Transaction
        </button>
      </form>
    </div>
  );
};
export default TransactionPage;
