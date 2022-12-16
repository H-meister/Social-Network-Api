const {  Model, Types, Schema } = require('mongoose');
var date = new Date();

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
            get: (createdAtVal) => dateFormat(createdAtVal)
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
            get: (createdAtVal) => dateFormat(createdAtVal)
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


//get count
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

//create model
const Thought = Model('thought', thoughtSchema);

//export
module.exports = Thought;