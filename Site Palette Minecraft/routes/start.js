const express = require("express");
const fs = require("fs");
const path = require("path");

const UsersController = require("../controllers/UsersController");
const AuthentificationController = require("../controllers/AuthentificationController");
const { authenticateToken } = require("../middlewares/Auth");

const router = express.Router();

router.get("/users", UsersController.index); // GET /users
router.get("/users/:id", UsersController.show); // GET /users/:id
router.post("/users", UsersController.store); // POST /users
router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  authenticateToken,
  AuthentificationController.getMyProfile
);

// Route pour servir le fichier JSON
router.get("/api/data", (req, res) => {
    const jsonFilePath = path.join(__dirname, "../api/data/images.json"); // Chemin relatif vers le fichier JSON
  
    // Lire et renvoyer le contenu du fichier JSON
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Erreur lors de la lecture du fichier JSON" });
      }
      res.json(JSON.parse(data)); // Envoyer le contenu JSON comme réponse
    });
  });
  

module.exports = router;
