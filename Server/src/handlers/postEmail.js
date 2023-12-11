const nodemailer = require("nodemailer");

const postEmail = async (userEmail, totalUSD, booksName) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pflibrosgrupo07@gmail.com",
      pass: "xtzpuqnfgidcaksq",
    },
  });

  const mailOptions = {
    from: "Factura <pflibrosgrupo07@gmail.com>",
    to: `${userEmail}`,
    subject: "Factura pf-libros",
    text: `Este es el cuerpo del correo que lleva el ${totalUSD} y el ${booksName}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });

  return transporter;
};
module.exports = postEmail;
