import express from 'express';
import './config/db.js'; 
import stationRoutes  from "./routes/stationRoutes.js"
import auth from './routes/auth.js'
import LocationRoutes from './routes/LocationRoutes.js'
import maintenanceLogs from './routes/MaintenanceLogs.js'
import usageLogsRoutes from './routes/UsageLogs.js';
import profitsRoutes from './routes/Profits.js';
import feedbackRoutes from './routes/Feedback.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('HELLO WORLD');

})
app.use('/api/auth',auth);
app.use('/api/station',stationRoutes);
app.use('/api/location',LocationRoutes);
app.use('/api/maintenance-logs', maintenanceLogs);
app.use('/api/usage-logs', usageLogsRoutes);
app.use('/api/profits', profitsRoutes);
app.use('/api/feedback', feedbackRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})