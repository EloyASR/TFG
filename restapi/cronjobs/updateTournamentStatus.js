const cron = require('node-cron');
const Tournament = require('../models/tournament');

const updateTournamentStatus = () => {
    cron.schedule('* * * * *', async () => {
        const now = new Date();

        try {
            // Abrir torneos cuyo inicio es antes de ahora y no han sido cerrados
            await Tournament.updateMany(
                { startDate: { $lte: now }, endDate: { $gte: now }, status: 'close' },
                { status: 'open' }
            );

            // Cerrar torneos cuyo fin es antes de ahora y están abiertos
            await Tournament.updateMany(
                { endDate: { $lt: now }, status: 'open' },
                { status: 'close' }
            );
        } catch (error) {
        }
    });
};