const path = require("path");

const express = require("express");
const app = express();

const sendEmail = require("./utils/sendEmail");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("contact");
});

app.get("/sent", (req, res) => {
  res.render("sent");
});

app.post("/sendemail", (req, res) => {
  const { name, surname, email } = req.body;

  const from = "luis.valdivia.m@tecsup.edu.pe";
  const to = "luis.valdivia.m@tecsup.edu.pe";

  const subject = "Recuperación de cuenta";

  const output = `
    <p>Acción de recuperación de Cuenta de ${email}</p>
    <h3>Detalles del usuario</h3>
    <ul>
      <li>Nombre: ${name}</li>
      <li>Apellido: ${surname}</li>
      <li>Correo: ${email}</li>
    </ul>
  `;

  sendEmail(to, from, subject, output);
  res.redirect("/sent");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
