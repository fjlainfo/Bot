var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function(session) {
    switch (session.message.text) {
        case "Bom dia":
            session.send("Bom dia, tudo bem?");
            break;
        case "Tudo bem e com você":
            session.send("Tudo ótimo, em que posso ajudar?");
            break;
        case "Não estou conseguindo recuperar minha senha":
            session.send("Qual o erro que o sistema reporta quando vc tentar recuperar sua senha?");
            break;
        case "E-mail inválido":
            session.send("Tente alterar seu e-mail e tentar novamente");
            break;
        case "OK":
            session.send("Ajudo em mais alguma coisa?");
            break;
        case "Não Obrigado":
            session.send("Qualquer dúvida estou à disposição!");
            break;
        default:
            break;
    }

    // if (session.message.text === "Bom dia") {
    //     //session.send("Você disse: %s", session.message.text);
    //     session.send("Bom dia, tudo bem?");
    // } else {
    //     session.send("Não entendi o que vc disse");
    // }
});