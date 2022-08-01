const asyncHandler = require("../../middleware/asyncHandler");
const myError = require("../../utils/myError");
const path = require("path");
const fs = require("fs");
const isEmpty = require("is-empty");

const Building = require("../../models/building");
const Cover = require("../../models/cover");
const Rooms = require("../../models/rooms");
const Service = require("../../models/services");
const Comment = require("../../models/comments");
module.exports = {
  create_building: asyncHandler(async (req, res, next) => {
    const img = req.files.img;
    let building = req.body;
    const item = await Building.create(building);

    img.name = `/uploads/corporate/building/photo_${item._id}${
      path.parse(img.name).ext
    }`;
    let str = img.name.split("/").pop();
    item.img = img.name;
    img.mv(`${process.env.BUILDING_FILE_UPLOAD_PATH}/${str}`, (err) => {
      if (err) {
        throw new myError(
          "Файл хуулах явцад алдаа гарлаа :" + err.message,
          400
        );
      }
    });
    item.save();
    res.status(200).json({
      success: true,
    });
  }),
  show_building: asyncHandler(async (req, res, next) => {
    let query;
    query = Building.find();
    const item = await query;

    if (!item) {
      res.status(200).json({
        success: true,
        count: item.length,
        data: "",
      });
    } else {
      res.status(200).json({
        success: false,
        count: item.length,
        data: item,
      });
    }
  }),

  update_building: asyncHandler(async (req, res, next) => {
    let building;
    const item = await Building.findById(req.params.id);
    let data = req.body;
    if (item) {
      if (req.files) {
        const file = req.files.img;
        file.name = `/uploads/corporate/building/photo_${req.params.id}${
          path.parse(file.name).ext
        }`;
        str = item.img.split("/").pop();
        req.body.img = file.name;
        fs.unlink(`${process.env.BUILDING_FILE_UPLOAD_PATH}/${str}`, (err) => {
          if (err) {
            throw new myError(
              "Файл устгах явцад алдаа гарлаа :" + err.message,
              400
            );
          }
        });
        str1 = file.name.split("/").pop();
        file.mv(`${process.env.BUILDING_FILE_UPLOAD_PATH}/${str1}`, (err) => {
          if (err) {
            throw new myError(
              "Файл хуулах явцад алдаа гарлаа :" + err.message,
              400
            );
          }
        });

        building = await Building.findByIdAndUpdate(item._id, data, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({
          success: true,
          data: building,
        });
      } else {
        building = await Building.findByIdAndUpdate(item._id, data, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({
          success: true,
          data: building,
        });
      }
    } else {
      res.status(200).json({
        success: false,
        data: item,
      });
    }
  }),

  delete_building: asyncHandler(async (req, res, next) => {
    const building = await Building.findByIdAndRemove(req.params.id);
    if (!building) {
      throw new myError(`${req.params.id} тай зураг байхгүй байна`, 400);
    }

    str = building.img.split("/").pop();
    fs.unlink(`${process.env.BUILDING_FILE_UPLOAD_PATH}/${str}`, (err) => {
      if (err) {
        throw new myError(
          "Файл устгах явцад алдаа гарлаа :" + err.message,
          400
        );
      }
    });
    res.status(200).json({
      success: true,
      data: building,
    });
  }),

  create_cover: asyncHandler(async (req, res, next) => {
    const img = req.files.img;
    let cover = req.body;
    const item = await Cover.create(cover);

    img.name = `/uploads/corporate/cover/photo_${item._id}${
      path.parse(img.name).ext
    }`;
    let str = img.name.split("/").pop();
    item.img = img.name;
    img.mv(`${process.env.COVER_FILE_UPLOAD_PATH}/${str}`, (err) => {
      if (err) {
        throw new myError(
          "Файл хуулах явцад алдаа гарлаа :" + err.message,
          400
        );
      }
    });
    item.save();
    res.status(200).json({
      success: true,
    });
  }),

  show_cover: asyncHandler(async (req, res, next) => {
    let query;
    query = Cover.find({ buildingId: req.params.id });
    const item = await query;

    if (!item) {
      res.status(200).json({
        success: true,
        count: item.length,
        data: "",
      });
    } else {
      res.status(200).json({
        success: false,
        count: item.length,
        data: item,
      });
    }
  }),
  update_cover: asyncHandler(async (req, res, next) => {
    let cover;
    const item = await Cover.findById(req.params.id);
    let data = req.body;
    if (item) {
      if (req.files) {
        const file = req.files.img;
        file.name = `/uploads/corporate/cover/photo_${req.params.id}${
          path.parse(file.name).ext
        }`;
        str = item.img.split("/").pop();
        req.body.img = file.name;
        fs.unlink(`${process.env.COVER_FILE_UPLOAD_PATH}/${str}`, (err) => {
          if (err) {
            throw new myError(
              "Файл устгах явцад алдаа гарлаа :" + err.message,
              400
            );
          }
        });
        str1 = file.name.split("/").pop();
        file.mv(`${process.env.COVER_FILE_UPLOAD_PATH}/${str1}`, (err) => {
          if (err) {
            throw new myError(
              "Файл хуулах явцад алдаа гарлаа :" + err.message,
              400
            );
          }
        });

        cover = await Cover.findByIdAndUpdate(item._id, data, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({
          success: true,
          data: cover,
        });
      } else {
        cover = await Cover.findByIdAndUpdate(item._id, data, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({
          success: true,
          data: cover,
        });
      }
    } else {
      res.status(200).json({
        success: false,
        data: item,
      });
    }
  }),
  delete_cover: asyncHandler(async (req, res, next) => {
    const cover = await Cover.findByIdAndRemove(req.params.id);
    if (!cover) {
      throw new myError(`${req.params.id} тай зураг байхгүй байна`, 400);
    }

    str = cover.img.split("/").pop();
    fs.unlink(`${process.env.COVER_FILE_UPLOAD_PATH}/${str}`, (err) => {
      if (err) {
        throw new myError(
          "Файл устгах явцад алдаа гарлаа :" + err.message,
          400
        );
      }
    });
    res.status(200).json({
      success: true,
      data: cover,
    });
  }),
  create_room: asyncHandler(async (req, res, next) => {
    const files = [].concat(req.files.images);

    let data = {
      images: [],
    };
    const item = await Rooms.create({ images: [{ img: " " }], img: " " });
    for (i = 0; i < files.length; i++) {
      files[i].name = `/uploads/corporate/rooms/photo_${item._id}_${i}${
        path.parse(files[i].name).ext
      }`;
      data.images.push({ img: files[i].name });
      let str = files[i].name.split("/").pop();
      files[i].mv(`${process.env.ROOMS_FILE_UPLOAD_PATH}/${str}`, (err) => {
        if (err) {
          throw new myError(
            "Файл хуулах явцад алдаа гарлаа :" + err.message,
            400
          );
        }
      });
    }

    const room = await Rooms.findByIdAndUpdate(item._id, data, {
      new: true,
      runValidators: true,
    });
    data = req.body;
    const aa = await Rooms.findByIdAndUpdate(item._id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: aa,
    });
  }),
  update_room: asyncHandler(async (req, res, next) => {
    let rooms;
    const item = await Rooms.findById(req.params.id);
    let data = req.body;
    if (item) {
      if (req.files) {
        const file = req.files.images;
        file.name = req.body.imgName.split("/").pop();
        fs.unlink(
          `${process.env.ROOMS_FILE_UPLOAD_PATH}/${file.name}`,
          (err) => {
            if (err) {
              throw new myError(
                "Файл устгах явцад алдаа гарлаа :" + err.message,
                400
              );
            }
          }
        );
        file.mv(`${process.env.ROOMS_FILE_UPLOAD_PATH}/${file.name}`, (err) => {
          if (err) {
            throw new myError(
              "Файл хуулах явцад алдаа гарлаа :" + err.message,
              400
            );
          }
        });

        rooms = await Rooms.findByIdAndUpdate(item._id, data, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({
          success: true,
          data: rooms,
        });
      } else {
        rooms = await Rooms.findByIdAndUpdate(item._id, data, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({
          success: true,
          data: rooms,
        });
      }
    } else {
      res.status(200).json({
        success: false,
        data: item,
      });
    }
  }),
  show_room: asyncHandler(async (req, res, next) => {
    let query;
    query = Rooms.find({ buildingId: req.params.id });
    const item = await query;

    if (!item) {
      res.status(200).json({
        success: true,
        count: item.length,
        data: "",
      });
    } else {
      res.status(200).json({
        success: false,
        count: item.length,
        data: item,
      });
    }
  }),
  delete_room: asyncHandler(async (req, res, next) => {
    const room = await Rooms.findByIdAndRemove(req.params.id);
    if (!room) {
      throw new myError(`${req.params.id} тай зураг байхгүй байна`, 400);
    }

    str = room.img.split("/").pop();
    fs.unlink(`${process.env.ROOMS_FILE_UPLOAD_PATH}/${str}`, (err) => {
      if (err) {
        throw new myError(
          "Файл устгах явцад алдаа гарлаа :" + err.message,
          400
        );
      }
    });
    res.status(200).json({
      success: true,
      data: room,
    });
  }),

  create_service: asyncHandler(async (req, res, next) => {
    const files = [].concat(req.files.images);

    let data = {
      images: [],
    };

    const item = await Service.create({ images: [{ img: " " }], img: " " });
    for (i = 0; i < files.length; i++) {
      files[i].name = `/uploads/corporate/services/photo_${item._id}_${i}${
        path.parse(files[i].name).ext
      }`;
      data.images.push({ img: files[i].name });
      let str = files[i].name.split("/").pop();
      files[i].mv(`${process.env.SERVICES_FILE_UPLOAD_PATH}/${str}`, (err) => {
        if (err) {
          throw new myError(
            "Файл хуулах явцад алдаа гарлаа :" + err.message,
            400
          );
        }
      });
    }
    const room = await Rooms.findByIdAndUpdate(item._id, data, {
      new: true,
      runValidators: true,
    });
    data = req.body;
    const aa = await Rooms.findByIdAndUpdate(item._id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: aa,
    });
  }),
  show_services: asyncHandler(async (req, res, next) => {
    let query;
    query = Service.find({ buildingId: req.params.id });
    const item = await query;

    if (!item) {
      res.status(200).json({
        success: true,
        count: item.length,
        data: "",
      });
    } else {
      res.status(200).json({
        success: false,
        count: item.length,
        data: item,
      });
    }
  }),

  update_service: asyncHandler(async (req, res, next) => {
    let services;
    const item = await Service.findById(req.params.id);
    let data = req.body;
    if (item) {
      if (req.files) {
        const file = req.files.images;
        file.name = req.body.imgName.split("/").pop();
        fs.unlink(
          `${process.env.SERVICES_FILE_UPLOAD_PATH}/${file.name}`,
          (err) => {
            if (err) {
              throw new myError(
                "Файл устгах явцад алдаа гарлаа :" + err.message,
                400
              );
            }
          }
        );
        file.mv(
          `${process.env.SERVICES_FILE_UPLOAD_PATH}/${file.name}`,
          (err) => {
            if (err) {
              throw new myError(
                "Файл хуулах явцад алдаа гарлаа :" + err.message,
                400
              );
            }
          }
        );

        services = await Service.findByIdAndUpdate(item._id, data, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({
          success: true,
          data: services,
        });
      } else {
        services = await Service.findByIdAndUpdate(item._id, data, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({
          success: true,
          data: services,
        });
      }
    } else {
      res.status(200).json({
        success: false,
        data: item,
      });
    }
  }),

  delete_service: asyncHandler(async (req, res, next) => {
    const services = await Service.findByIdAndDelete(req.params.id);
    if (!services) {
      throw new myError(`${req.params.id}-id тай бараа байхгүй байна`, 400);
    }
    for (i = 0; i < services.images.length; i++) {
      let str = services.images[i].img.split("/").pop();
      fs.unlink(`${process.env.SERVICE_FILE_UPLOAD_PATH}/${str}`, (err) => {
        if (err) {
          throw new myError(
            "Файл устгах явцад алдаа гарлаа :" + err.message,
            400
          );
        }
      });
    }
    res.status(200).json({
      success: true,
      data: services,
    });
  }),

  create_comment: asyncHandler(async (req, res, next) => {
    const item = await Comment.create(req.body);
    res.status(200).json({
      success: true,
      data: item,
    });
  }),

  show_comment: asyncHandler(async (req, res, next) => {
    let query;
    query = Comment.find({ buildingId: req.params.id });
    const item = await query;

    if (!item) {
      res.status(200).json({
        success: true,
        count: item.length,
        data: "",
      });
    } else {
      res.status(200).json({
        success: false,
        count: item.length,
        data: item,
      });
    }
  }),
  delete_comment: asyncHandler(async (req, res, next) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      throw new myError(`${req.params.id}-id тай бараа байхгүй байна`, 400);
    }

    res.status(200).json({
      success: true,
      data: comment,
    });
  }),
};
