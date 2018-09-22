const smpp = require("smpp");
const config = require("./config");


// const session = smpp.connect(config.smpp.host, (error, status) => {
//   if(error){
//     consoloe.log("Connection error: ", error);
//   } else {
//     console.log("Connected", status);
//   }
// });

const session = smpp.connect(config.smpp.host);

const options = {
  system_id: config.smpp.systemId,
  password: config.smpp.password,
  system_type: config.smpp.systemType
};

session.bind_transceiver(options, pdu => {
  if(pdu.command_status == 0){
    console.log('Connected');

    //Sending message
    const sms = {
      destination_addr: '255713809050',
      short_message: 'From Home Wifi'
    };

    session.sumbit_sm(sms, pdu => {
      if(pdu.command_status == 0){
        console.log('Message successfully sent');
      } else {
        console.log('Send message failed');
        console.log('PDU status: ' + pdu.command_status);
      }
    })
  } else {
    console.log('Connection failed');
  }
})
