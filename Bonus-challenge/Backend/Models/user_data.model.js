const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const user_data_schema = new Schema(
    {
        nickname:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            minlenght:3
        },
        password:{
            type:String,
            required:true,
            minlenght:8,
            match:/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%@_ ]*[!#%@_ ])[A-Za-z0-9!#@%_ ]{8,32}$/
        },
        sleep_data_id:{
            type: Schema.Types.ObjectId, ref: 'sleep_data'
        }
    }
)


// This function will encrypt passwords to protect integrity of credential.
// This will execute at the time of new document creation
user_data_schema.pre('save', async function (next) {
    try {
      if (this.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
      }
      next();
    } catch (error) {
      next(error);
    }
  })

const user_data = mongoose.model('user_data', user_data_schema);

module.exports = user_data;