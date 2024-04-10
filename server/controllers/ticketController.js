const Ticket = require('../models/ticketModel');

const ticketController = {};

ticketController.createTicket = async (req, res, next) => {
    const { name, email, message } = req.body;

    try {
        const ticket = await Ticket.create({name, email, message});
        return next();
    } catch (err) {
        return next({
          log: 'failed to create ticket',
          message: {err: `the error code: ${err}`}
        });
    }

}