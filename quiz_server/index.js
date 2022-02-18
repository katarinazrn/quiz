const express = require("express");
const sqlite3 = require("sqlite3");
const parser = require("body-parser");
var formidable = require("formidable");

var cors = require("cors");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

var fs = require("fs");
app.use("/public", express.static(__dirname + "/public"));

let db = new sqlite3.Database("./quiz.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err.message);
  }
});

app.use(cors());

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get("/quizes", (req, res) => {
  db.all("SELECT * FROM quiz", (err, rows) => {
    res.json(rows);
  });
});

app.get("/quizes/:id", (req, res) => {
  db.all("SELECT * FROM quiz WHERE id=?", req.params.id, (err, rows) => {
    res.json(rows[0]);
  });
});

app.get("/quizes/:id/questions", (req, res) => {
  db.all(
    "SELECT * FROM question WHERE quiz_id=?",
    req.params.id,
    (err, rows) => {
      res.json(rows);
    }
  );
});

app.get("/quizes/:id/questions/:qid", (req, res) => {
  db.all("SELECT * FROM question WHERE id=?", req.params.qid, (err, rows) => {
    res.json(rows[0]);
  });
});

app.get("/quizes/:id/questions/:qid/answers", (req, res) => {
  db.all(
    "SELECT * FROM answer where question_id=?",
    req.params.qid,
    (err, rows) => {
      res.json(rows);
    }
  );
});

app.post("/quizes", (req, res) => {
  try {
    db.run(
      "INSERT INTO quiz (title,description) VALUES(?,?)",
      req.body.title,
      req.body.description,
      function (err) {
        if (err) {
          console.log(err);
        } else {
          res.json({ id: this.lastID });
        }
      }
    );
  } catch (ex) {
    console.log(ex.message);
  }
});

app.post("/questions", (req, res) => {
  try {
    db.run(
      "INSERT INTO question (content,quiz_id) VALUES(?,?)",
      req.body.content,
      req.body.quiz_id,
      function (err) {
        if (err) {
          console.log(err);
        } else {
          res.json({ id: this.lastID });
        }
      }
    );
  } catch (ex) {
    console.log(ex.message);
  }
});

app.post("/answers", (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return;
    }

    db.run(
      "INSERT INTO answer (content,question_id,is_correct,image_url) VALUES(?,?,?,?)",
      fields.content,
      fields.question_id,
      fields.is_correct,
      fields.image_url,
      function (err) {
        if (err) {
          console.log(err);
        } else {
          let id = this.lastID;
          if (files.file) {
            var ext = fields.filename.substr(
              fields.filename.lastIndexOf(".") + 1
            );

            var oldpath = files.file.filepath;
            var data = fs.readFileSync(oldpath);
            var newpath =
              fields.quiz_id + "-" + fields.question_id + "-" + id + "." + ext;

            fs.writeFile(
              __dirname + "/public/uploads/" + newpath,
              data,
              function (err) {
                if (err) {
                  console.log(err, "*****");
                } else {
                  db.run(
                    "UPDATE answer SET image_url = ? WHERE id = ?",
                    newpath,
                    id,
                    function (err) {
                      if (err) {
                        console.log(err);
                      } else {
                        res.json(newpath);
                      }
                    }
                  );
                }
              }
            );
          }
          else{
            res.json('');
          }
        }
      }
    );
  });
});




app.listen(port, () => {
  console.log("listening at port 3000...");
});


