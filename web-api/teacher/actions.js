const con = require('../database');

getAllTeachersQuery = () => {
    const query = "SELECT * FROM teacher";
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

getAllTeachers = async (req, res) => {
    try {
        const teachers = await getAllTeachersQuery();
        res.status(200).send(teachers);
    } catch (error) {
        res.status(500).send(error);
    }
};

getSpecificTeacherQuery = (teacherId) => {
    const query = 'SELECT * FROM teacher WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [teacherId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getSpecificTeacher = async (req, res, next) => {
    const teacherId = req.params.id;

    if (teacherId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }

    try {
        const teacher = await getSpecificTeacherQuery(teacherId);
        res.status(200).send(teacher[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


createTeacherQuery = (teacher) => {
    const query = 'INSERT INTO teacher(Id,name,lastname, email, languageid) VALUES (?, ?, ?,?,?);';
    return new Promise((resolve, reject) => {
        con.query(query, [teacher.Id, teacher.name, teacher.lastname, teacher.email, teacher.languageid], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

createTeacher = async (req, res, next) => {
    let isValid = emailValidator(req.body.Email);
    if (!isValid) {
        var error = new Error("Email is not valid!");
        error.status = 401;
        next(error);
    }
    else {
        try {
            const teacherRequest = req.body;
            await createTeacherQuery(teacherRequest);
            res.status(201).send("Teacher has been created!");
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
};

updateTeacherQuery = (id, teacher) => {
    const query = 'UPDATE teacher SET Id = ?, name = ?, lastname = ?,email = ?, languageid = ?, WHERE id = ?';
    const list = [teacher.Id, teacher.name, teacher.lastname,teacher.email, teacher.languageid, id];

    return new Promise((resolve, reject) => {
        con.query(query, list, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                if (results.affectedRows == 0) {
                    reject("Nema teacher so takvo id")
                }
                resolve(results);
            }
        });
    });
};

updateTeacher = async (req, res) => {
    const teacherRequest = req.body;
    const teacherId = req.params.id
    try {
        const teacher = await updateTeacherQuery(teacherId, teacherRequest);
        res.status(201).send("Teacher has been updated!");
    } catch (error) {
        res.status(500).send(error)
    }
};

getTeacherByEmailQuery = (email) => {
    const query = "SELECT * FROM teacher WHERE email = ?";
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
    getAllTeachers,
    getSpecificTeacher,
    createTeacher,
    updateTeacher
}