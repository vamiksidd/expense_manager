import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMutation } from "@apollo/client";

import Cards from "../../components/Cards";
import TransactionForm from "../../components/TransactionForm";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast"
import { LOGOUT } from "../../graphql/mutations/user.mutation";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const chartData = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "%",
        data: [6, 8, 3],
        backgroundColor: [
          "rgba(154, 233, 212, 0.99)",
          "rgba(226, 65, 65, 1)",
          "rgba(255, 255, 255)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(160, 158, 192, 0.8)",
        ],

        spacing: 10,
        cutout: 130,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white", // Change this to your desired font color
        },
      },
    },
    // Optional: You can set the font color for tooltips as well
    elements: {
      tooltip: {
        bodyColor: "white", // Tooltip text color
        titleColor: "white", // Tooltip title color
      },
    },
  };


  const [logout, { loading }] = useMutation(LOGOUT,{
    refetchQueries:["GetAuthUsers"]
  })
  const handleLogout = async () => {
    try {
      const tmp = await logout()

    } catch (error) {
      console.log("errorin logging out:", error);
      toast.error(error.message);
    }
  };



  return (
    <>


      <div className="flex mt-10 flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center translate-x-6">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-white to-red-800  inline-block text-transparent bg-clip-text backdrop-blur-sm rounded-full">
            Spend wisely, Track wisely
          </p>

          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout
              className="mx-2 w-5 h-5 text-white cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
            <Doughnut data={chartData} options={chartOptions} />
          </div>

          <TransactionForm />
        </div>
        <Cards />
      </div>


    </>
  );
};
export default HomePage;
