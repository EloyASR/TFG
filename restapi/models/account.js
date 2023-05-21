const mongoose = require("mongoose");

const ValorantAccountInfoSchema = mongoose.Schema(

);

const PokemonAccountInfoSchema = mongoose.Schema(

);

const LeagueAccountInfoSchema = mongoose.Schema(
    {
        id:{
            type:String,
            required: true
        },
        accountId:{
            type:String,
            required: true
        },
        puuid:{
            type:String,
            required: true
        },
        name:{
            type:String,
            required: true
        },
        profileIconId:{
            type: Number,
            required: true
        },
        revisionDate:{
            type: Number,
            required: true,
        },
        summonerLevel:{
            type: Number,
            required: true,
        },
        games: {
            type: [mongoose.Types.ObjectId]
        }
    }
);

const AccountSchema = mongoose.Schema(
    {
        game: {
            type: String,
            enum: ["LEAGUE_OF_LEGENDS", "VALORANT", "POKEMONVGC"],
            required: true
        },
        leagueAccountInfo: {
            type: LeagueAccountInfoSchema,
            required: false
        },
        valorantAccountInfo: {
            type: ValorantAccountInfoSchema,
            required: false
        },
        pokemonAccountInfo: {
            type: PokemonAccountInfoSchema,
            required: false
        }
    }
)

MatchSchema.methods.toJSON = function () {
    const { __v, _id, ...match } = this.toObject()
    match.uid = _id
    return match;
}

module.exports = mongoose.model('Match', MatchSchema)