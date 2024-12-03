import "./App.css";
import AllRoutes from "./AllRoutes/AllRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initialGetRestaurantsByCity } from "./Redux/Reducers/RestaurantReducer/action";

function App() {
  const { initialLoading } = useSelector((state) => state.restaurantReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialGetRestaurantsByCity("pune", "asc"));
  }, []);

  return (
    <div className="App">
      {initialLoading ? (
        <div className="initial_loading_container">
          <img src="/Images/Eye_Catching_Creative_Loading Animations.gif" />
        </div>
      ) : (
        <AllRoutes />
      )}
    </div>
  );
}

export default App;
