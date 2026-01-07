import { useLocation } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import floralPattern from './assets/floral_pattern.png';

export default function BookingPage() {
    const location = useLocation();
    const { serviceId, workerId } = location.state || {}; // Receive state from Home

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "40px 20px",
                backgroundImage: `url(${floralPattern})`,
                backgroundRepeat: 'repeat',
                backgroundSize: '400px'
            }}
        >
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-white/30 pointer-events-none" style={{ position: 'fixed', zIndex: 0 }}></div>

            <div className="container" style={{ maxWidth: "600px", margin: "0 auto", position: 'relative', zIndex: 10 }}>
                <div className="bg-white/80 backdrop-blur-md border border-white/40 p-8 rounded-2xl shadow-xl">
                    <h1 className="sectionTitle" style={{ textAlign: "center", marginBottom: "20px" }}>
                        Complete Your Booking
                    </h1>
                    <BookingForm
                        initialStep={2}
                        preselectedServiceId={serviceId}
                        preselectedWorkerId={workerId}
                    />
                </div>
            </div>
        </div>
    );
}
