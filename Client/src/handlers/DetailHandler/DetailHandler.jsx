import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setEnviado } from "../../redux/reducers/BookDetail/BookDetailSlice";

export function DetailHandler() {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.bookDetail);
  const { id } = useSelector((state) => state.user);

  const { reset } = useForm();

  const onSubmit = async (commentation) => {
    try {
      if (commentation) {
        const { data } = await axios.post(
          `https://server-pf.onrender.com/comment?bookId=${detail.id}&userId=${id}`,
          commentation
        );

        if (data) {
          // reset();
          dispatch(setEnviado(true));
        }
      }
    } catch (error) {
      console.log("errorAxios", error.message);
    }
  };

  return { onSubmit };
}
