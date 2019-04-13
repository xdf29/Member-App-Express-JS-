const express = require("express")
const router = express.Router()
const members = require("../../Members.js")
const uuid = require("uuid")

router.get("/", (req, res) => {
    res.json(members)
})

router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg:"Member with id:" + req.params.id + " does not exists."})
    }
})

//Add Member
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age,
        status: "active"
    }

    if(!newMember.name || !newMember.age){
        return (res.status(400).json({msg: "Name and Age is required !!!"}))
    }

    members.push(newMember)

    // res.json(members)
    res.redirect("/")
})

//Update Member
router.put("/:id", (req, res) => {

    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        const updateMember = req.body
        members.forEach((member) => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name,
                member.age = updateMember.age ? updateMember.age : member.age
            }
        })
        res.json({msg:"Member with id " + req.params.id + " is updated.", updateMember})
    }else{
        res.status(400).json({msg:"Member with id " + req.params.id + " does not exist."})
    }

})

//Delete Member
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json(
            {
                msg: "Member deleted",
                members: members.filter(member => member.id !== parseInt(req.params.id))
            }
        )
    }else{
        res.status(400).json({msg:"Member with id:" + req.params.id + " does not exists."})
    }
})

module.exports = router