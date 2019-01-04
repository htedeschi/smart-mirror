app.post("/api/user/get", function (req, res) {
    // check if id | email | mirror code is set

    // get user by id | email | mirror code

    // send response as JSON
});

app.post("/api/user/add", function (req, res) {
    // check if all info of user is set

    // check if user was deleted and is reactivating

    // add new user to db

    // get id of user

    // send response as JSON
});

app.post("/api/user/edit", function (req, res) {
    // check if id | email | mirror code is set

    // update user in db

    // send response as JSON
});

app.post("/api/user/delete", function (req, res) {
    // check if id | email | mirror code is set

    // update flag deleted in user table in db

    // send response as JSON
});