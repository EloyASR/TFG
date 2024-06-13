import axios from 'axios'
import cloudinaryService from "./cloudinaryService";
import serieService from "./serieService";

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

const getResults = async (participants, phase) => {

    let series = [];

    //NOS MOVEMOS POR LAS RONDAS
    for (let round of phase.leagueData.rounds) {
        //NOS MOVEMOS POR LAS SERIES
        for (let serie of round.series) {
            //PARA CADA SERIE AÑADIMOS SUS DATOS
            if(serie.identifier !== undefined){
                let serieFound = await serieService.getSerie(serie.identifier);
                series.push(serieFound);
            }
        }
    }

    let results = []

    for(let i = 0; i < phase.leagueData.size; i++){
        if(participants[i]){
            results.push({
                participant: participants[i].id,
                wins: 0,
                losses: 0,
            })
        }
    }

    series.forEach((serie) => {
        let winner = serie.result.winner;
        let loser = undefined;

        if (serie.away_participant === winner) {
            loser = serie.home_participant;
        }

        if (serie.home_participant === winner) {
            loser = serie.away_participant;
        }

        if (winner) {
            let index = results.findIndex(result => result.participant !== undefined && result.participant === winner)
            if (index !== -1) {
                results[index].wins += 1;
            }
        }

        if (loser) {
            let index = results.findIndex(result => result.participant !== undefined && result.participant === loser)
            if (index !== -1) {
                results[index].losses += 1;
            }
        }
    });

    results.sort((a, b) => {
        if (b.wins !== a.wins) {
            return b.wins - a.wins;
        } else {
            const aGames = a.wins + a.losses;
            const bGames = b.wins + b.losses;
            return bGames - aGames; // Order by number of games played (descending)
        }
    });

    // Asignar posiciones
    let currentPosition = 1;

    for (let i = 0; i < results.length; i++) {
        if (i > 0 && (results[i].wins === results[i - 1].wins && (results[i].wins + results[i].losses) === (results[i - 1].wins + results[i - 1].losses))) {
            // Si el actual tiene los mismos resultados que el anterior, asignar la misma posición
            results[i].position = results[i - 1].position;
        } else {
            // Asignar la posición actual y actualizar la posición para el siguiente
            results[i].position = currentPosition;
        }
        currentPosition++;
    }

    console.log(results);

    return results;
}

const tournamentService = {

    getAllTournaments: async (status = "ALL", game = "ALL", page) => {
        try {
            let url = baseurl + '/tournaments?status=' + status + '&game=' + game + '&page=' + page;
            
            const {data} = await axios.get(url)

            return data
        } catch (error) {
            console.log("Error al recuperar los torneos")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    },

    getAllTournamentsByCreator: async (creator, status = "ALL", game = "ALL", page) => {
        try {
            let url = baseurl + '/tournaments?creator=' + creator + '&status=' + status + '&game=' + game + '&page=' + page;

            const {data} = await axios.get(url)

            return data
        } catch (error) {
            console.log("Error al recuperar los torneos")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    },

    getAllTournamentsBySponsor: async (sponsor, status = "ALL", game = "ALL", page) => {
        try {
            let url = baseurl + '/tournaments?sponsor=' + sponsor + '&status=' + status + '&game=' + game + '&page=' + page;

            const {data} = await axios.get(url)

            return data
        } catch (error) {
            console.log("Error al recuperar los torneos")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    },

    getTournament: async (tournamentId) => {
        try {
            let url = baseurl + '/tournaments/' + tournamentId
            
            const {data} = await axios.get(url)

            return data
        } catch (error) {
            console.log("Error no se ha podido encontrar el torneo")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    },

    createTournament: async (tournamentData) => {
        try{
            let url = baseurl + '/tournaments/'
            
            await axios.post(url, tournamentData)

            return {code:200, msg:"Torneo creado con éxito"};

        }catch(error){
            return {code:400, msg:"Se ha producido un error al crear el torneo"};
        }
    },

    updateTournament: async (tournamentId, values) => {
        try {
            let url = baseurl + '/tournaments/' + tournamentId;

            const baseData = {};

            baseData.name = values.name
            baseData.description = values.description
            baseData.rules = values.rules
            baseData.status = values.status

            if (values.prize) {
                baseData.prize = values.prize
            } else {
                baseData.prize = ""
            }

            await axios.put(url, {tournament: baseData})

            return {code:200, msg:"Torneo actualizado con éxito"};
        }catch(e) {
            console.log(e);
            return {code:400, msg: "Error al actualizar el torneo"};
        }
    },

    patrocinarTorneo: async (tournamentId, sponsor) => {
        try {

            let url = baseurl + '/tournaments/' + tournamentId;
            const result = await axios.get(url);

            let sponsoredBy = result.data.sponsoredBy;

            //COMPROBAMOS SI YA SE ESTÁ PATROCINANDO EL TORNEO
            if (!sponsoredBy.find((patrocinador) => patrocinador.id === sponsor.id)){
                let sponsorToAdd = {
                    id: sponsor.id,
                    status: "PENDING",
                }

                let urlBannersLaterales = [];
                //SUBIMOS LAS IMÁGENES DE LOS BANNERS LATERALES A CLOUDINARY
                for(let image of sponsor.banners300x600){
                    let url = await cloudinaryService.uploadFile(image);
                    urlBannersLaterales.push(url);
                }

                sponsorToAdd.banners300x600 = urlBannersLaterales;

                //SUBIMOS LA IMAGEN DEL BANNER HORIZONTAL A CLOUDINARY
                let urlBannerHorizontal = [];

                for(let image of sponsor.banners1100x300){
                    let url = await cloudinaryService.uploadFile(image);
                    urlBannerHorizontal.push(url);
                }

                sponsorToAdd.banners1100x300 = urlBannerHorizontal;

                //COMPROBAMOS QUE EXISTE EL PREMIO

                sponsorToAdd.prize = sponsor.prize;

                console.log(sponsorToAdd);

                sponsoredBy.push(sponsorToAdd);

                await axios.put(url, {tournament: {
                        prize: result.data.prize,
                        sponsoredBy: sponsoredBy
                }})

                return {code: 200, msg: "Torneo patrocinado con éxito"};

            } else {
                return {code:400, msg:"El torneo ya se está patrocinando"};
            }
        }catch(error){
            return {code: 400, msg: "Error al patrocinar el torneo"};
        }
    },

    dejarDePatrocinarTorneo: async (tournamentId, sponsorId) => {
        try {

            let url = baseurl + '/tournaments/' + tournamentId;
            let {data} = await axios.get(url);

            let sponsoredBy = data.sponsoredBy;

            //COMPROBAMOS SI YA SE ESTÁ PATROCINANDO EL TORNEO
            if (sponsoredBy.find((patrocinador) => patrocinador.id === sponsorId)){
                sponsoredBy = sponsoredBy.filter((patrocinador)=> patrocinador.id !== sponsorId)
            } else {
                return {code:400, msg:"El torneo no está patrocinado"};
            }

            await axios.put(url, {tournament: {
                    prize: data.prize,
                    sponsoredBy:sponsoredBy
            }})

            return {code: 200, msg: "Eliminado patrocinio con éxito"};

        }catch(error){
            return {code: 400, msg: "Error al eliminar patrocinio"};
        }
    },

    aprobarPatrocinio: async (tournamentId, sponsorId) => {
        try{
            console.log(tournamentId);
            console.log(sponsorId);
            let url = baseurl + '/tournaments/' + tournamentId;
            const result = await axios.get(url);
            console.log(result);

            let sponsoredBy = result.data.sponsoredBy.filter((patrocinador) => patrocinador.id !== sponsorId);

            console.log(sponsoredBy);

            let sponsor = result.data.sponsoredBy.find((patrocinador) => patrocinador.id === sponsorId)

            console.log(sponsor);

            if (sponsor){
                let sponsorToAdd = {
                    id: sponsor.id,
                    status: "ACCEPTED",
                    banners300x600: sponsor.banners300x600,
                    banners1100x300: sponsor.banners1100x300,
                    prize: sponsor.prize
                }

                sponsoredBy.push(sponsorToAdd);

                console.log(sponsoredBy);

                await axios.put(url, {tournament: {
                        prize: result.data.prize,
                        sponsoredBy:sponsoredBy
                }})

                return {code: 200, msg: "Patrocinio actualizado con éxito"};

            } else {
                return {code:400, msg:"Error al actualizar el patrocinio"};
            }
        }catch(error) {
            return {code: 400, msg: "Error al actualizar el patrocinio"};
        }
    },

    inscribirUsuario: async (tournamentId, userId) => {
        try{
            let url = baseurl + '/tournaments/' + tournamentId;
            let result = await axios.get(url);

            let participants = result.data.participants;

            //COMPROBAMOS SI YA SE ESTÁ INSCRITO EN EL TORNEO
            if (!participants.find((participant) => participant.id === userId)){
                let participantToAdd = {
                    id: userId,
                    participantType: "SINGLE",
                    status: "NOT_SELECTED",
                }

                participants.push(participantToAdd);

                await axios.put(url, {tournament: {
                        prize: result.data.prize,
                        participants:participants
                }})

                return {code: 200, msg: "Inscripción correcta"};
            }else {
                return {code: 400, msg: "Ya estás inscrito en el torneo"};
            }
        }catch (e) {
            return {code: 400, msg: "Error al inscribirse en el torneo"};
        }
    },

    darBajaUsuario: async (tournamentId, userId) => {
        try{

            let url = baseurl + '/tournaments/' + tournamentId;
            let result = await axios.get(url);

            let participants = result.data.participants;

            //COMPROBAMOS SI SE ENCUENTRA INSCRITO EN EL TORNEO
            if (participants.find((participant) => participant.id === userId)){
                participants = participants.filter((participant)=> participant.id !== userId)
            } else {
                return {code:400, msg:"No estás inscrito en el torneo"};
            }

            await axios.put(url, {tournament: {
                    prize: result.data.prize,
                    participants:participants
            }})

            return {code: 200, msg: "Baja del torneo correcta"};

        }catch (e) {
            return {code: 400, msg: "Error al darse de baja del torneo"};
        }
    },

    addBracketSerieToTournament: async (tournamentId, phaseNumber, round, serie, serieIdentifier) =>{
        try {
            let url = baseurl + '/tournaments/' + tournamentId;

            let result = await axios.get(url);

            let phases = result.data.phases;

            let phase = phases[phaseNumber];

            phase.bracketData.rounds[round].series[serie].identifier = serieIdentifier;

            let resultUpdate = await axios.put(url, {tournament: {
                prize: result.data.prize,
                phases: phases
            }})

            console.log(resultUpdate.data);

            return {code: 200, msg: "Serie actualizada con éxito"};
        }catch (e){
            console.log(e);
            console.log("Error al darse de baja del torneo");
            return {code: 400, msg: "Error al añadir serie al torneo"};
        }
    },

    addLeagueSerieToTournament: async (tournamentId, phaseNumber, round, serie, serieIdentifier) =>{
        try {
            let url = baseurl + '/tournaments/' + tournamentId;

            let result = await axios.get(url);

            let phases = result.data.phases;

            let phase = phases[phaseNumber];

            phase.leagueData.rounds[round].series[serie].identifier = serieIdentifier;

            let resultUpdate = await axios.put(url, {tournament: {
                    prize: result.data.prize,
                    phases:phases
            }})

            console.log(resultUpdate.data);

            return {code: 200, msg: "Serie actualizada con éxito"};
        }catch (e){
            console.log(e);
            console.log("Error al darse de baja del torneo");
            return {code: 400, msg: "Error al añadir serie al torneo"};
        }
    },

    closeActualPhase: async (tournamentId) => {
        try {
            let url = baseurl + '/tournaments/' + tournamentId;

            let result = await axios.get(url);

            let phases = result.data.phases;

            let phase = phases[result.data.currentPhase];

            switch (phase.formatType){
                case "LEAGUE_PHASE":
                    let results = await getResults(result.data.participants, phase);
                    phase.leagueData.topParticipants = results.map(r=>r.participant);
                    break;
                default:
                    break;
            }

            console.log(phases);

            let resultUpdate = await axios.put(url, {tournament: {
                    phases:phases,
                    currentPhase: result.data.currentPhase + 1,
                    prize: result.data.prize,
                }
            })

            console.log(resultUpdate.data);

            return {code: 200, msg: "Serie actualizada con éxito"};
        }catch (e){
            console.log(e);
            console.log("Error al darse de baja del torneo");
            return {code: 400, msg: "Error al añadir serie al torneo"};
        }
    }
}

export default tournamentService