import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const Order = mongoose.model("Order",orderSchema)

export default Order
