const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = { title, tags, body, id, createdAt, updatedAt };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteID: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "failed",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNoteHeader = (request, h) => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "failed",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Berhasil edit catatan",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "failed",
    message: "Gagal mengedit catatan",
  });
  response.code(404);
  return response;
};

const deleteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Berhasil menghapus catatan",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "failed",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = { addNoteHandler, getAllNoteHeader, getNoteByIdHandler, editByIdHandler, deleteByIdHandler };
