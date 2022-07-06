const router = require("express").Router();
const { auth } = require("../auth/controller");

const {
  show_building,
  create_building,
  update_building,
  delete_building,
  show_cover,
  create_cover,
  update_cover,
  delete_cover,
  show_room,
  create_room,
  delete_room,
  update_room,
  show_services,
  create_service,
  update_service,
  delete_service,
  show_comment,
  create_comment,
  delete_comment,
} = require("./controller");

router.get("/building", show_building);
router.post("/building", auth, create_building);
router.put("/building/:id", auth, update_building);
router.delete("/building/:id", auth, delete_building);

router.get("/cover/:id", show_cover);
router.post("/cover", auth, create_cover);
router.put("/cover/:id", auth, update_cover);
router.delete("/cover/:id", auth, delete_cover);

router.get("/rooms/:id", show_room);
router.post("/rooms", auth, create_room);
router.put("/rooms/:id", auth, update_room);
router.delete("/rooms/:id", auth, delete_room);

router.get("/service/:id", show_services);
router.post("/service", auth, create_service);
router.put("/service/:id", auth, update_service);
router.delete("/service/:id", auth, delete_service);

router.get("/comment/:id", show_comment);
router.post("/comment", auth, create_comment);
router.delete("/comment/:id", auth, delete_comment);

module.exports = router;
