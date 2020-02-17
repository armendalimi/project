// class User {
//     constructor(name, surname, email, age, isActive, posts) {
//         this.name = name;
//         this.surname = surname;
//         this.email = email;
//         this.age = age;
//         this.isActive = isActive;
//         this.posts = posts
//     }
// }
class Room {
    constructor(id,name,windowofroom,doorofroom,Homeid){
        this.id = id;
        this.name = name,
        this.windowofroom = windowofroom;
        this.doorofroom = doorofroom;
        this.Homeid = Homeid;
    }
}

class Teacher {
    constructor(name, id, email, languageid) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.languageid = languageid
    }
}
class Language {
    constructor(id, name, studentid) {
        this.id = id;
        this.name = name;
        this.studentid = studentid
    }
}
class Student {
    constructor(id, name,lastname, teacherid) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.teacherid = teacherid
    }
}

class Post {
    constructor(text, likes, createdOn) {
        this.text = text,
        this.createdOn = createdOn,
        this.likes = likes
    }
}

module.exports = {
    Post,
    Teacher,
    Language,
    Student,
    Room
}