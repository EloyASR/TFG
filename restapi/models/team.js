const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required: [true, "Type is required"],
            enum: {
                values: ['5_1','5_0'],
                message: "{VALUE} is not supported. Type must be 5_1 or 5_0",
            },
            trim: true
        },
        image: {
            type: String,
            required: false
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