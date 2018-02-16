'use strict';
const functions  = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

let transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'leotecnico777@gmail.com',
        pass: 'Shacker@12'
    }
});

exports.enviarEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    console.log('BODY => ', req.body);
    let remetente = req.body['name'];

    let assunto = 'Solicitação de Orçamento';
    let destinatarios = 'barbosasolucoesdigitais@gmail.com';
    // let corpo = req.body['corpo'];
    let corpoHtml = '<b>Nome:</b> ' + req.body['name'] + '<br /> <b>E-mail:</b> ' + req.body['email'] + '<br/><b>Compania:</b> ' + req.body['company'] + '<br/><b>Mensagem:</b> ' + req.body['message'];

    let email = {
        from: remetente,
        to: destinatarios,
        subject: assunto,
        // text: corpo,
        html: corpoHtml
    };

    transporter.sendMail(email, (err, info) => {
        console.log(info, err);
    });

  });
});