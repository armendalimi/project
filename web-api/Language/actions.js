const con = require('../database');

getAllLanguageQuery = () => {
    const query = "SELECT * FROM language";
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

getAllLanguage = async(req, res) => {
    try {
        const language = await getAllLanguageQuery();
        res.status(200).send(language);  
    } catch (error) {
        res.status(500).send(error);
    }
};

getSpecificLanguageQuery = (languageId) => {
    const query = 'SELECT * FROM language WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [languageId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getSpecificLanguage= async(req, res, next) => {
    const languageId = req.params.id;

    if (languageId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const language = await getSpecificLanguageQuery(languageId);
        res.status(200).send(language[0]);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};


createLanguageQuery = (language) => {
    const query = 'INSERT INTO language(Id, name, studentid) VALUES (?, ?, ?);'
    return new Promise((resolve, reject) => {
        con.query(query, [language.Id, language.name, language.studentid,], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

createLanguage = async(req, res, next) => {
    let isValid = emailValidator(req.body.Email);
    if (!isValid) {
        var error = new Error("Language is not valid!");
        error.status = 401;
        next(error);
    }
    else {
        try {
            const languageRequest = req.body;
            await createTeacherQuery(languageRequest);
            res.status(201).send("language has been created!");
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
};

updateLanguageQuery = (id, language) => {
    const query = 'UPDATE language SET Id = ?, Name = ?, studentid = ? WHERE id = ?';
    const list = [language.Id, language.Name, language.studentid, id];

    return new Promise((resolve, reject) => {
        con.query(query, list, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                if(results.affectedRows == 0) {
                    reject("Nema language so takvo id")
                }
                resolve(results);
            }
          });
    });
};

updateLanguage = async(req, res) => {
    const languageRequest = req.body;
    const languageId = req.params.id
    try {
        const language = await updateLanguageQuery(languageId, languageRequest);
        res.status(201).send("Language has been updated!");
    } catch (error) {
        res.status(500).send(error)
    }
};

getLanguageByEmailQuery = (email) => {
    const query = "SELECT * FROM language WHERE email = ?";
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
    getAllLanguage,
    getSpecificLanguage,
    createLanguage,
    updateLanguage
}