import axios from "axios";
import { setBookDetail } from "../../redux/reducers/BookDetail/BookDetailSlice";
import { useDispatch } from "react-redux";

export function DetailHandler() {
  const dispatch = useDispatch();

  const detailHandler = async (id) => {
    try {
      const { data } = await axios(`http://localhost:3001/book/${id}`);
      dispatch(setBookDetail(data));
    } catch (error) {
      console.log("error", error);
    }
  };

  return { detailHandler };
}
