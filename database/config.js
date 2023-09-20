const mongoose = require('mongoose');

const dbConnection = async () => {
  try {

    await mongoose.connect(`mongodb+srv://user_cafe_node:FPRrApskfjdIkKBI@cafe-node.qtid19u.mongodb.net/MongoDB`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
   

    console.log(`Conectado a BD`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dbConnection,
};
