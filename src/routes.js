const { addNoteHandler, getAllNoteHeader, getNoteByIdHandler, editByIdHandler, deleteByIdHandler } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNoteHeader,
  },
  {
    method: "GET",
    path: `/notes/{id}`,
    handler: getNoteByIdHandler,
  },
  {
    method: "PUT",
    path: `/notes/{id}`,
    handler: editByIdHandler,
  },
  {
    method: "DELETE",
    path: `/notes/{id}`,
    handler: deleteByIdHandler,
  },
];

module.exports = routes;
