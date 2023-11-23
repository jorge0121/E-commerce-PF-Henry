const { Books } = require("../db");

const filtersAutYearGen = async () => {
  try {
    const filters = await Books.findAll({
      attributes: ["author", "year", "gender"],
    });
    const autoresUnicos = [];
    const yearsUnicos = [];
    const gendersUnicos = [];

    const autoresSet = new Set();
    const yearsSet = new Set();
    const gendersSet = new Set();

    filters.forEach((book) => {
      const { author, year, gender } = book;

      if (!autoresSet.has(author)) {
        autoresSet.add(author);

        const nuevoAutor = { nombre: author };
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
  } catch (error) {
    throw error;
  }
};

module.exports = filtersAutYearGen;
