import Banner from "../../Components/Banner/Banner";
import Topbar from "../../Components/Topbar/Topbar";
import Mysidebar from "../../Components/Mysidebar/Mysidebar";
import './view.css';

function View({ children }) {
    return (
        <div className="view">
            <Banner />
            <div className="view-container">
                <Mysidebar />
                <main className="view-content">
                    <Topbar />
                    {children}
                </main>
            </div>
        </div>
    );
}

export default View;
