const { schema, model, Types, Schema } = require('mongoose');
var date = new Date();

//thought schema
const thoughtSchema = new Schema (
    {
        thoughttext:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: date.toDateString()
        },
        username:{
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJson: {
            virtuals: true,
            getters: true,
        },
        id:false,
    }
)

//reactions schema
const reactionSchema = new Schema (
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true, 
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type:Date,
            default: Date.now,
            get: date.toDateString()
        },
    },
    {
        toJson: {
            virtuals: true, 
            getters:true
        },
        id: false,
    }
)

//get count
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

//create model
const Thought = model('thought', thoughtSchema);

//export
module.exports = Thought;