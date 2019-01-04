app.post("/api/mirror/get", function (req, res) {
    // check if id | email | mirror code is set

    // get mirror by id | mirror code

    // send response as JSON
});

app.post("/api/mirror/add", function (req, res) {
    // check if all info of mirror is set

    // check if user was deleted and is reactivating

    // add new mirror to db

    // get id of mirror

    // send response as JSON
});

app.post("/api/mirror/edit", function (req, res) {
    // check if id | mirror code is set

    // update mirror in db

    // send response as JSON
});

app.post("/api/mirror/delete", function (req, res) {
    // check if id | mirror code is set

    // update flag deleted in mirror table in db

    // send response as JSON
});