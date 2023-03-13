import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData:[
        {
            month: String,
            totalSales: Number,
            totalUnits: Number
        },
    ],
    dailyData: [
        {
            date: String,
            totalSales: Number,
            totalUnits: Number
        }
    ],
    salesByCategory: {
        type: Map, //way used in mongoose to create data of type object in mongodb
        of: Number // value in object will be of number type
    }
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;