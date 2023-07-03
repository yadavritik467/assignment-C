import express from "express"
import Order from "../modal/orderModal.js";

const router = express.Router()

router.post("/newOrder", async (req,res)=>{
    let { orderId,title,description } = req.body

    try {
        const order = Order.create({orderId,title,description,createdAt:-1})
        return res.status(200).json({message:"order created successfully",order})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})

router.get("/getSeveneDaysOrder", async (req, res) => {
    try {
        // Calculate the date 7 days ago from now
        const last7DaysDate = new Date();
        last7DaysDate.setDate(last7DaysDate.getDate() - 7);

        // Find orders created in the past 7 days
        const orders = await Order.find({ createdAt: { $gte: last7DaysDate } });

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
}
)
router.get("/getOrder", async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json({message:"All order list",orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
}
)

export default router;