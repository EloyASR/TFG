const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");

const ValorantAccountInfoSchema = Schema(
    {
        puuid:{
            type:String,
            required: true
        },
        tagLine:{
            type:String,
            required: true
        },
        encryptedSummonerId:{
            type:String,
            required: true
        },
        accountId:{
            type:String,
            required: true
        }
    }
);

const PokemonAccountInfoSchema = Schema(
    {
        profileId:{
            type:String,
            required: true
        }
    }
);

const LeagueAccountInfoSchema = Schema(
    {
        puuid:{
            type:String,
            required: true
        },
        gameName:{
            type:String,
            required: true
        },
        tagLine:{
            type:String,
            required: true
        },
        summonerId:{
            type:String,
            required: true
        },
        accountId:{
            type:String,
            required: true
        }
    }
);

const AccountSchema = Schema(
    {
        game: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        leagueOfLegendsAccountInfo: {
            type: LeagueAccountInfoSchema,
            required: false
        },
        valorantAccountInfo: {
            type: ValorantAccountInfoSchema,
            required: false
        },
        pokemonVGCAccountInfo: {
            type: PokemonAccountInfoSchema,
            required: false
        }
    }
)

const UserSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique:true
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
            enum: ["USER", "ADMIN", "COMPANY"]
        },
        icon: {
            type: String,
            required: false
        },
        accounts: {
            type: [AccountSchema]
        }
    },
    {
        timestamps: true
    }
)

AccountSchema.methods.toJSON = function () {
    const { __v, _id, ...account } = this.toObject()
    account.uid = _id
    return account;
}

UserSchema.methods.toJSON = function () {
    const { __v, _id, ...user } = this.toObject()
    user.uid = _id
    delete user.password;
    return user
}

// Definición de los modelos
const Account = model('Account', AccountSchema);
const User = model('User', UserSchema);

module.exports = { User, Account };