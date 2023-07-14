const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const accountSid = 'AC0d1f5d7028d29e927ca17ee49d9c7e53';
const authToken = '866f66cfe5fed8a0d87c0cef3b7432cc';
const client = require('twilio')(accountSid, authToken);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.post('/send', (req, res) => {

    const { customerName, scheduleData, scheduleTime, services} = req.body;
  
    client.messages
      .create({
        body: `Olá Sr(a) ${customerName}, aqui estão os dados do seu agendamento que fez á pouco: \n\n📅Data: ${scheduleData}.\n⏰Horário:${scheduleTime}.\n🌸Serviços:${services}.\n\nDesde já agradecemos muito pelo seu agendamento!, para mais informações ou dúvidas, por favor entre em contato ou ligue.\n\nDany Terapia Corporal ✅`,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5511949098312'
      })
      .then(message => res.json({ message: 'Mensagem enviada com sucesso!' }))
      .catch(error => res.status(500).json({ message: 'Erro ao enviar mensagem', error }));
    }
);

app.listen(3000, () => {
  console.log('initate server')  
})