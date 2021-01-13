const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-notes.hbs')
});

router.post('/notes/new-notes', async (req, res) => {
    const {idVenta, descVenta, valorVenta} = req.body;
    const errors = [];
    if(!idVenta){
        errors.push({text: 'Ingresa un número de venta.'});
    }
    if(!descVenta){
        errors.push({text: 'Ingresa una descripción a la venta.'});
    }
    if(!valorVenta){
        errors.push({text: 'Ingresa el valor de la venta.'});
    }
    if(errors.length > 0){
        res.render('notes/new-notes.hbs', {
            errors,
            idVenta,
            descVenta,
            valorVenta
        });
    } else {
        const newNote = new Note({idVenta, descVenta, valorVenta});
        await newNote.save();
        res.redirect('/notes')
    }
});

router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notes/all-notes', {notes});
    
})

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note});
});

router.put('/note/edit-note/:id', async (req, res) => {
    const {idVenta, descVenta, valorVenta} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {idVenta, descVenta, valorVenta})
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
});

module.exports = router; 