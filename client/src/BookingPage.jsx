import { useLocation } from "react-router-dom";
import BookingForm from "./components/BookingForm";

export default function BookingPage() {
    const location = useLocation();
    const { serviceId, workerId } = location.state || {}; // Receive state from Home

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "hsl(var(--background))", padding: "40px 20px" }}>
            <div className="container" style={{ maxWidth: "600px", margin: "0 auto" }}>
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
    );
}
