/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import Statistics from "../../components/Statistics/Statistics";
import { useEffect } from "react";
import DispatchInterface from "../../types/DispatchInterface";
import { geOrdersCount } from "../../store/orderSlice/orderSlice";
const Home = () => {
  const { counts, isWaitingForGetCount } = useSelector(
    (state: any) => state.order
  );
  const dispatch: DispatchInterface = useDispatch();

  useEffect(() => {
    dispatch(geOrdersCount({ url: "order/count" }));
  }, [dispatch]);

  console.log(counts);
  return (
    <>
      <Statistics
        pending={counts && counts.pending ? counts.pending : 0}
        part={counts && counts.part ? counts.part : 0}
        deliver={counts && counts.deliver ? counts.deliver : 0}
        back={counts && counts.back ? counts.back : 0}
        loading={isWaitingForGetCount}
      />
      {/* <FilterTable /> */}
    </>
  );
};

export default Home;
