const router = require("express").Router();
const { getSingleThought, getThought, createThought, updateThought, deleteThought } = require("../../controllers/thoughtController");

router.route("/").get(getThought).post(createThought);

router.route("/:thoughtId").get(getSingleThought).put(updateThought);

router.route("/:thoughtId/:userId").delete(deleteThought);

module.exports = router;
