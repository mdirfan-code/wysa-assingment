const { default: mongoose, Schema } = require("mongoose");
const schema = mongoose.Schema;

const well_sleep_parameters = new Schema({
    sleep_easily: {
        type:Boolean,
        required:true
    },
    sleep_through_night: {
        type:Boolean,
        required:true
    },
    wakeup_ontime_refreshed: {
        type:Boolean,
        required:true
    }

})

const sleep_data_schema = new Schema(
    {
        well_sleep_changes:{
            type:well_sleep_parameters,
            required:true
        },
        struggling_with_sleep_since : {
            type: String,
            required:true,
            enum:["<2","2-8",">8"]
        },
        bed_time : {
            type : String,
            required:true,
            trim:true,
            match:/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/
        },
        wakeup_time : {
            type : String,
            required:true,
            trim:true,
            match:/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/
        },
        sleeping_hours: {
            type:Number,
            required:true,
            min:1,
            max:10
        },
        "sleep_efficiency": {
            type:Number,
            required:true,
            min:0,
            max:100
        }

    }
)

const sleep_data = mongoose.model('sleep_data', sleep_data_schema);

module.exports = sleep_data;