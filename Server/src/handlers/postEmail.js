const nodemailer = require("nodemailer");

const postEmail = async (
  userEmail,
  totalUSD,
  booksName,
  userName,
  userAddress
) => {
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
    text: `Hola, ${userName} tu compra de ${booksName} por un total de ${totalUSD} ha sido exitosa, tus productos seran enviados a la direccion ${userAddress}. Permanece atento a cualquier cambio en el estado del pedido.`,
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
