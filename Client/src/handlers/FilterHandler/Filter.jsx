import { useSelector } from "react-redux";

export function Filter() {
  const { books, booksCopia } = useSelector((state) => state.book);

  const autoresUnicos = [];
  const yearsUnicos = [];
  const gendersUnicos = [];

  const autoresSet = new Set();
  const yearsSet = new Set();
  const gendersSet = new Set();

  booksCopia.forEach((book) => {
    const { author, year, gender } = book;

    // Verificar si el autor ya está en el conjunto
    if (!autoresSet.has(author)) {
      autoresSet.add(author);

      // Crear un nuevo objeto con la propiedad "nombre"
      const nuevoAutor = { nombre: author };

      // Agregar el nuevo objeto al array
      autoresUnicos.push(nuevoAutor);
    }

    if (!yearsSet.has(year)) {
      yearsSet.add(year);

      const newYear = { year };
      yearsUnicos.push(newYear);
    }

    if (!gendersSet.has(gender)) {
      gendersSet.add(gender);

      const newGender = { gender };
      gendersUnicos.push(newGender);
    }
  });

  const dataA = autoresUnicos.map((book) => ({
    value: book.nombre,
    label: book.nombre,
  }));
  const dataY = yearsUnicos.map((book) => ({
    value: book.year,
    label: book.year,
  }));
  const dataG = gendersUnicos.map((book) => ({
    value: book.gender,
    label: book.gender,
  }));

  return { dataA, dataY, dataG };
}
