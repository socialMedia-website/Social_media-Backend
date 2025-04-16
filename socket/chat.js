
const Message = require('../models/Message');
const Conversation = require('../models/conversations');


module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    

    socket.on('joinConversation', (conversationId) => {
      socket.join(conversationId);
      console.log(`User joined conversation: ${conversationId}`);
    });

   
    socket.on('sendMessage', async (data) => {
      const { senderId, receiverId, encryptedText } = data;

      try {
       
        let conversation = await Conversation.findOne({
          participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
          conversation = new Conversation({ participants: [senderId, receiverId] });
          await conversation.save();
        }

      
        const message = new Message({
          conversationId: conversation._id,
          senderId,
          receiverId,
          encryptedText,
        });

        await message.save();

      
        io.to(conversation._id.toString()).emit('receiveMessage', message);
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    });

   
    

   
    socket.on('markMessageSeen', async (messageId) => {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(
          messageId,
          { seen: true },
          { new: true }
        );

        if (updatedMessage) {
          io.emit('messageSeen', updatedMessage); 
        }
      } catch (error) {
        console.error('Error marking message as seen:', error.message);
      }
    });


   
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);

     
    });
  });
};
