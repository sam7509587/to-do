const { client, ApiError } = require("../config")

exports.addTask = async (req, res, next) => {
    try {
        const { title, description } = req.body
        const findTask = await client.query(`SELECT * FROM todolist WHERE title ='${title}' AND userid = '${req.user.id}' `)
        if (findTask.rows.length > 0) {
            return next(new ApiError(409, "title already present"))
        }
        const addTask = await client.query(`INSERT INTO todolist (title,description,userid)
         VALUES('${title}','${description}','${req.user.id}') RETURNING *`)
        return res.status(201).json({
            statusCode: 201, message: "task has been added", data: addTask.rows
        })
    } catch (err) {
        return next(new ApiError(400, err.message))
    }
}

exports.editTask = async (req, res, next) => {
    const { title, description } = req.body;
    console.log(title,description)
    const { id } = req.params
    if (!title && !description) {
        return next(new ApiError(400, "nothing to change"))
    }
    try {
        const taskFound = await client.query(`SELECT * FROM todolist WHERE userid = '${req.user.id}' AND id='${id}' `);
        if (taskFound.rows.length === 0) {
            return next(new ApiError(400, `no task found with this id -${id}`))
        }
        const updatedData = await client.query(`UPDATE todolist SET title ='${title}',description ='${description}'
         WHERE userid = '${req.user.id}' AND id = ${id} RETURNING *`)
        return res.status(200).json({
            statusCode: 200, message: "task has been updated ", data: updatedData.rows[0]
        })
    } catch (err) {
        console.log(err)
        return next(new ApiError(400, err.message))
    }
}
exports.showTask = async (req, res, next) => {
    try {
        const fetchedTask = await client.query(`SELECT todolist.id,title,description,iscomplted,
    email FROM todolist LEFT  OUTER  JOIN todouser
    ON todolist.userid = todouser.id WHERE userid = '${req.user.id}' `);
        return res.status(200).json({ statusCode: 200, message: "task fetched", data: fetchedTask.rows })
    } catch (err) {
        return next(new ApiError(400, err.message))
    }
}
exports.singleTask = async (req, res, next) => {
    const { id } = req.params
    try {
        const fetchedTask = await client.query(`SELECT todolist.id,title,description,iscomplted ,
    email FROM todolist LEFT  OUTER  JOIN todouser
    ON todolist.userid = todouser.id WHERE userid = '${req.user.id}' AND todolist.id='${id}'`);
        return res.status(200).json({ statusCode: 200, message: "task fetched", data: fetchedTask.rows })
    } catch (err) {
        return next(new ApiError(400, err.message))
    }
}
exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const taskFound = await client.query(`SELECT title FROM  todolist  WHERE id ='${id}' AND userid = '${req.user.id}'`)
        if (taskFound.rows.length === 0) {
            return next(new ApiError(400, `task not found with id :- ${id}`))
        }
        await client.query(`DELETE FROM todolist WHERE id =${id} AND userid = '${req.user.id}'`)
        return res.status(200).json({
            statusCode: 200, message: `task has been deleted with id - ${id}`
        })
    } catch (err) {
        return next(new ApiError(400, err.message))
    }
}
exports.isCompleted = async (req, res, next) => {
    try {
        const { id } = req.params
        const taskFound = await client.query(`SELECT iscomplted FROM  todolist  WHERE id ='${id}' AND userid = '${req.user.id}'`)
        if (taskFound.rows.length === 0) {
            return next(new ApiError(400, `task not found with id :- ${id}`))
        }
        let updatedData;
        if (taskFound.rows[0].iscomplted === true) {
            updatedData = await client.query(`UPDATE todolist SET iscomplted=false WHERE userid = '${req.user.id}' AND id='${id}' RETURNING *`)
            return res.status(200).json({ statusCode: 200, message: "task set to incompleted", data: updatedData.rows[0] })
        } else {
            updatedData = await client.query(`UPDATE todolist SET iscomplted=true WHERE userid = '${req.user.id}'AND id='${id}' RETURNING *`)
            return res.status(200).json({ statusCode: 200, message: "task set to completed", data: updatedData.rows[0] })

        }
    } catch (err) {
        return next(new ApiError(400, err.message))
    }
}
