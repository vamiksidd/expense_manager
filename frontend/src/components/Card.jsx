import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast"

const categoryColorMap = {
	saving: "from-green-700 to-green-400",
	expense: "from-pink-800 to-pink-600",
	investment: "from-blue-700 to-blue-400",
	// Add more categories and corresponding color classes as needed
};

const Card = ({ cardType, transaction }) => {
	const cardClass = categoryColorMap[cardType];
	const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
		refetchQueries: ["GetTransactions","GetTransactionsStatistics"]
	});

	const handleDelete = async (e) => {
		try {
			const transactionId = transaction._id;

			await deleteTransaction({
				variables: {
					transactionId
				}
			});
			toast.success("Transaction deleted")
		} catch (error) {
			toast.error(error.message)
			console.log("Error message", error)
		}
	}

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{transaction.category}</h2>
					<div className='flex items-center gap-2'>
						<FaTrash className={"cursor-pointer"} onClick={handleDelete} />
						<Link to={`/transaction/${transaction._id}`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />

					{transaction.description}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					{transaction.paymentType}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					{transaction.amount}
				</p>
				<p className='text-white flex items-center gap-1'>
					{transaction.location ? <FaLocationDot /> : <></>}
					{transaction.location}
				</p>
			</div>
		</div>
	);
};
export default Card;