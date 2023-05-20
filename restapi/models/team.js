const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        main:{
            type:[mongoose.Types.ObjectId]
        },
        substitutes:{
            type:[mongoose.Types.ObjectId]
        }
    }
)

TeamSchema.methods.toJSON = function () {
    const { __v, _id, ...team} = this.toObject()
    team.uid = _id;
    return team;
}

module.exports = mongoose.model('Team', TeamSchema)