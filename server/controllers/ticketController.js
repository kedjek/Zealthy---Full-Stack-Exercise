const Ticket = require('../models/ticketModel');

const ticketController = {};


ticketController.createTicket = async (req, res, next) => {
console.log('does this show in vercel controller file?')
console.log('does this show in vercel controller file?')
console.log('does this show in vercel controller file?')


    const { name, email, message } = req.body;
    const status = 'new';
    try {
        const ticket = await Ticket.create({ name, email, message, status})
        res.locals.ticket = ticket;
        return next();
    } catch (err) {
        return next({
          log: 'failed to create ticket',
          message: {err: `the error code: ${err}`}
        });
    }

}

ticketController.getTicket = async (req, res, next) => {
    if (req.cookies.adminLoggedIn === 'true'){
        try {
            const ticket = await Ticket.find().exec();
            res.locals.ticket = ticket;
            return next();

        } catch (err) {
            return next({
                log: 'failed to create ticket',
                message: {err: `the error code: ${err}`}
            });
        }
    } else {
        console.log ('Admin is not logged in. Please login at /backendadminpanel')
        return next();
    }

}

ticketController.updateTicket = async (req, res, next) => {
    try {
        const updates = req.body; 

        // Loop through each update object
        for (const ticket of updates) {
            const { id, status, response } = ticket;

            // Find the ticket by ID and update its status and response
            await Ticket.findOneAndUpdate(
                { _id: id }, 
                { status, response }, 
            );
        }

        console.log('Tickets updated successfully');
        return next();
    } catch (err) {
        return next({
          log: 'failed to update ticket',
          message: {err: `the error code: ${err}`}
        });
    }

}


module.exports = ticketController;