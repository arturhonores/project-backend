const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
      required: true,
    },
     participants:[{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
