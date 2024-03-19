"use strict";

const uuid = require("uuid");
let Cat = require("../models/CatModel");

module.exports = {
  createCat: (event, context, callback) => {
    let body = JSON.parse(event.body); // Lấy các dữ liệu truyền lên từ body

    if (typeof body.name !== "string" || typeof body.kind !== "string") {
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: "The name & kind of cat must be string character.",
        }),
      });
    }

    let catObj = {
      id: uuid.v1(),
      name: body.name,
      kind: body.kind,
    };

    Cat.create(catObj, (err, catResult) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Succesfully created cat",
          cat: catResult.get(),
        }),
      });
    });
  },
  findAllCats: (event, context, callback) => {
    // let body = JSON.parse(event.body);
    Cat.getAll((err, catsResult) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Retrieved all cats",
          noOfCat: catsResult.Items.length,
          noOfCatv1: catsResult.Count,
          cats: catsResult,
        }),
      });
    });
  },
  findCatById: (event, context, callback) => {
    //let body = JSON.parse(event.body);
    let catId = event.pathParameters.id;

    Cat.getById(catId, (err, catResult) => {
      if (err) {
        return callback(err);
      }
      if (!catResult) {
        return callback(null, {
          statusCode: 404,
          body: JSON.stringify({
            error: "Cat not found!",
          }),
        });
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          catFound: catResult.get(),
        }),
      });
    });
  },
  updateCatById: (event, context, callback) => {
    let catId = event.pathParameters.id;
    console.log("Received catId:", catId);
    let body = JSON.parse(event.body);
    console.log("Received request body:", body);
    let catItem = {
      id: catId,
      name: body.name,
      kind: body.kind,
    };
    // Trong dự án thực tế thì hãy tìm con mèo trước, nếu tồn tại thì mới cho update.
    // Làm lun nhé :)
    Cat.getById(catId, (errGet, existingCat) => {
      if (errGet) {
        console.error("Error retrieving cat:", errGet);
        return callback(errGet);
      }
      if (!existingCat) {
        console.warn("Cat not found for ID:", catId);
        // If the cat with the specified ID does not exist, return an error
        //return callback(new Error("cat not found"));
        return callback(null, {
          statusCode: 404,
          body: JSON.stringify({
            errorMessage: "This cat was not found in database.",
          }),
        });
      }
      //Nếu tồn tại, mới update
      let existingCatData = existingCat.get();
      console.log("Received request body:", existingCatData);
      Cat.update(catItem, (updateErr, updatedCat) => {
        if (updateErr) {
          return callback(updateErr);
        }
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: "Updated successfully",
            fromCat: existingCatData,
            toCat: updatedCat.get(),
          }),
        });
      });
    });
  },
  deleteCatById: (event, context, callback) => {
    let catId = event.pathParameters.id;
    // Trong dự án thực tế thì hãy tìm con mèo trước, nếu tồn tại thì mới cho delete.
    Cat.deleteById(catId, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Delete cat sucessfully.",
          catIdWasDeleted: catId,
        }),
      });
    });
  },
};
