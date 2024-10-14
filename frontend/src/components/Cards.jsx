import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { GET_AUTH_USERS, GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";

const Cards = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  const {data:authUser} = useQuery(GET_AUTH_USERS)
  console.log(authUser);
  
  const {data:userAndTransactions} = useQuery(GET_USER_AND_TRANSACTIONS,{
    variables:{
      userId:authUser?.authUser?._id,
    }
  })
  console.log("userTransaction" , userAndTransactions);
  
  // console.log(data);

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl text-slate-100 font-bold text-center my-10">
        History
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data?.transactions.map((transaction) => (
            <Card
              key={transaction._id}
              cardType={transaction.category}
              transaction={transaction}
            />
          ))}
      </div>
      {!loading && data?.transactions.length === 0 && (
        <h2 className="text-white text-2xl">No transaction found</h2>
      )}
    </div>
  );
};
export default Cards;
