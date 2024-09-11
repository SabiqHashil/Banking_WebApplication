import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TransactionList = ({ tran }) => {

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    console.log(tran);
    if (tran.length === 0) {
      setIsEmpty(true);
    }
  }, [tran.length]);


  if (isEmpty) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
        <div className="text-center">No transactions yet</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
      <ul className="space-y-2">
        {tran.map((transaction) => (
          <li key={transaction._id} className="border p-2 rounded-md shadow-sm">
            <div className="flex justify-between">
              <span className="font-medium">
                {" "}
                {new Date(transaction.createdAt).toLocaleDateString()}
              </span>
              <span
                className={`font-medium ${
                  transaction.type == "credit"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.amount}
              </span>
            </div>
            <div className="mt-1 text-gray-600">
              Balance: ${transaction.balance}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

TransactionList.propTypes = {
  tran: PropTypes.array.isRequired,
};

export default TransactionList;
