const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
    },
    imageUrl: { type: String,  
    },
    location: {
      type: String,
      required: true,
      minlength: 3,
    },
    date: {
      type: Date,
      required: true,
    },
    attendees: {
      type: Number,
      
    },
     participants:[{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }]
  },
  {
    timestamps: true
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
