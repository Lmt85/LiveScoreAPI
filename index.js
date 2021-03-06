const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Comment = require('./Schemas/PostSchemas')
require('dotenv/config')

app.use(bodyParser.json());

//ROUTES

app.get('/work-effort/:work_effort_id/comments', async (req, res) => {
    try { 
    var comment  = await Comment.find({ work_effort_id: req.params.work_effort_id });
    res.json(comment)
    } catch (err) {
        res.json({ message: err})
    }

})

app.post('/work-effort/:work_effort_id/comments', async (req, res) => {
    const comment = new Comment({
        work_effort_id : req.params.work_effort_id,
        comment :req.body.comment,
        left_at : req.body.left_at,
        user_id: req.body.user_id
    })
    try {
        const savedComment = await comment.save();
        res.json(savedComment)
    } catch (err){
        res.json({ message: err})

    }
})

app.delete('/work-effort/:work_effort_id/comments/:comment_id', async (req, res) => {
    try {
        const removedComment = await Comment.remove({work_effort_id:req.params.work_effort_id ,_id:req.params.comment_id});
        res.json(removedComment)
    } catch (err){
        res.json({ message: err})

    }
})



//Connect to DB

mongoose.connect(
process.env.DB_CONNECTION, 
{ useNewUrlParser: true }, 
() => console.log('Connected to Database')
)


app.listen(3000, ()=> console.log('Server started'))