import axios from "axios";
import { setBookDetail } from "../../redux/reducers/BookDetail/BookDetailSlice";
import { useDispatch } from "react-redux";

export function DetailHandler() {
  const dispatch = useDispatch();

  const detailHandler = async (id) => {
    try {
      const { data } = await axios(`https://server-pf.onrender.com/book/${id}`);
      dispatch(setBookDetail(data));
    } catch (error) {
      console.log("error", error);
    }
  };

  return { detailHandler };
}
