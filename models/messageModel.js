import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Sender of the message
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Receiver of the message
        content: { type: String, required: true }, // Message content
        isSeen: { type: Boolean, default: false } // Whether the message has been seen
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
