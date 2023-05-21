//Esquema que define el mmodelo de un usuario

const { Schema, model } = require('mongoose')

const UserSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["USER", "ADMINISTRATOR"]
        },
        icon: {
            type: String,
            required: false
        },
        accounts: {
            type: [
                {
                    game:{
                        type: String,
                        required: true
                    },
                    ids:{
                        type: [String]
                    }
                }
            ]
        }
    },
    {
        timestamps: true
    }
)

UserSchema.methods.toJSON = function () {
    const { __v, _id, ...user } = this.toObject()
    user.uid = _id
    delete user.password;
    return user
}

module.exports = model('User', UserSchema)