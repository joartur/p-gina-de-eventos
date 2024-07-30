const Event = require('../models/Event');

class EventController{
       static createEvent(req,res){
            res.render('events/create')
        }

        static async removeEvent(req, res) {
            const id = req.body.id
        
            await Event.destroy({where: { id: id}}) 
            res.redirect('/events')
        }

        static async updateEvent(req, res){
            const id = req.params.id

            const event = await Event.findOne({where: {id: id}, raw: true})
            res.render('events/edit', {event})
        }

        static async updateEventPost(req, res){
            const id = req.body.id;

            const event ={
                title: req.body.title,
                description: req.body.description,
                data: req.body.data,
                hora: req.body.hora,
                preco: req.body.preco,
                imagem: req.body.imagem 
            }

            await Event.update(event, {where: {id: id}})
            res.redirect('/events')
        }

        static async toggleEventStatus(req, res){
            const id = req.body.id;

            const event = {
                done: (req.body.done === '0')? true : false,
            }

            await Event.update(event, {where: {id: id}})
            res.redirect('/events')
        }

       static async showEvents(req,res){
            const events = await Event.findAll({raw:true})
            console.log()
            res.render('events/all', {events})
        }

        static async addEvent(req, res){
            const event = {
                title: req.body.title,
                description: req.body.description,
                data: req.body.data,
                hora: req.body.hora,
                preco: req.body.preco,
                imagem: req.body.imagem 
            }
            await Event.create(event);
            res.redirect('/events')

        }

}
module.exports = EventController;