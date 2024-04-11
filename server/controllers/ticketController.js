const Ticket = require('../models/ticketModel');

const ticketController = {};

ticketController.createTicket = async (req, res, next) => {
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
        } catch (err) {
            return next({
                log: 'failed to create ticket',
                message: {err: `the error code: ${err}`}
            });
        }
    } else {
        console.log ('Admin is not logged in. Please login at /backendadminpanel')
    }

}

ticketController.updateTicket = async (req, res, next) => {
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


module.exports = ticketController;