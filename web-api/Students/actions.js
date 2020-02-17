const con = require('../database');

getAllStudentQuery = () => {
    const query = "SELECT * FROM Student";
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getAllStudent = async(req, res) => {
    try {
        const student = await getAllStudentQuery();
        res.status(200).send(student);  
    } catch (error) {
        res.status(500).send(error);
    }
};

getSpecificStudentQuery = (studentId) => {
    const query = 'SELECT * FROM student WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [studentId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getSpecificStudent= async(req, res, next) => {
    const studentid = req.params.id;

    if (studentId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const studentid = await getSpecificStudentQuery(studentid);
        res.status(200).send(student[0]);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};


createStudentQuery = (student) => {
    const query = 'INSERT INTO Student(Id, name,lastname,teacherid) VALUES (?, ?,?,?);';
    return new Promise((resolve, reject) => {
        con.query(query, [student.Id, student.name,student.lastname,student.teacherid], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

createStudent = async(req, res, next) => {
    let isValid = emailValidator(req.body.Email);
    if (!isValid) {
        var error = new Error("Create is not valid!");
        error.status = 401;
        next(error);
    }
    else {
        try {
            const studentRequest = req.body;
            await createStudentQuery(StudentRequest);
            res.status(201).send("Student has been created!");
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
};

updateStudentQuery = (id, student) => {
    const query = 'UPDATE student SET Id = ?, Name = ?,lastname=?, teacherid= ?,WHERE id = ?';
    const list = [student.id,student.name,student.lastname,student.teacherid];

    return new Promise((resolve, reject) => {
        con.query(query, list, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                if(results.affectedRows == 0) {
                    reject("Nema student so takvo id")
                }
                resolve(results);
            }
          });
    });
};

updateStudent = async(req, res) => {
    const StudentRequest = req.body;
    const StudentId = req.params.id
    try {
        const student = await updateStudentQuery(StudentId, StudentRequest);
        res.status(201).send("Student has been updated!");
    } catch (error) {
        res.status(500).send(error)
    }
};

getStudentByEmailQuery = (email) => {
    const query = "SELECT * FROM student WHERE email = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                //console.log(results);
                resolve(results);
            }
          });
    });
};

module.exports = {
    getAllStudent,
    getSpecificStudent,
    createStudent,
    updateStudent
}