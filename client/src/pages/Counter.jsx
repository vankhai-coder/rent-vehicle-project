import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../redux/features/counterSlice.js";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Counter: {count}</h1>
      <div className="flex gap-2">
        <button onClick={() => dispatch(increment())} className="px-4 py-2 bg-blue-500 text-white rounded">
          Increment
        </button>
        <button onClick={() => dispatch(decrement())} className="px-4 py-2 bg-red-500 text-white rounded">
          Decrement
        </button>
        <button onClick={() => dispatch(incrementByAmount(5))} className="px-4 py-2 bg-green-500 text-white rounded">
          +5
        </button>
      </div>
    </div>
  );
};

export default Counter;
