// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { useNavigate, Outlet } from 'react-router-dom'; // Import useNavigate
// import './Header.css'; // Import custom CSS for responsiveness
// import { useAuth } from '../Auth/Auth';
// import { getBidding } from '../../actions/authService';

// function Header() {
//     const navigate = useNavigate(); // Initialize navigate
//     const { logout } = useAuth();
//     const [error, setError] = useState(null);
//     const [auctiondata, setAuctionData] = useState(null);

//     const items = [
//         { label: 'Auctions', icon: 'pi pi-briefcase', command: () => navigate('/home/auctions') },
//         { label: 'Bidding', icon: 'pi pi-dollar', command: () => navigate('/home') },
//         { label: 'About Us', icon: 'pi pi-info-circle' }
//     ];

//     const start = <Button label="Genix Auctions" className="" onClick={() => navigate('/home')} />
//     const end = (
//         <div className="p-mr-3">
//             <Button label="Logout" className="p-button-rounded p-button-danger" onClick={() => { logout(); navigate('/login') }} />
//         </div>
//     );
//     useEffect(() => {
//         const fetchBidding = async () => {
//             try {
//                 const response = await getBidding();
//                 if (response) {
//                     setAuctionData(response);
//                     setError(null);
//                     alert('data')
//                 } else {
//                     setError('Failed to fetch auction.');
//                 }
//             } catch (err) {
//                 alert('catch block')
//                 setError('An error occurred: ' + err.message);
//             }
//         };
//         fetchBidding(); // Call the async function
//     }, []);
//     console.log(auctiondata,'data')
//     return (
//         <div className="header">
//             <Menubar model={items} start={start} end={end} />
//             <Outlet />
//         </div>
//     );
// }

// export default Header;


// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { useNavigate, Outlet } from 'react-router-dom';
// import './Header.css';
// import { useAuth } from '../Auth/Auth';
// import { getBidding } from '../../actions/authService';
// import { Dialog } from 'primereact/dialog';
// import { Card } from 'primereact/card';

// function Header() {
//     const navigate = useNavigate();
//     const { logout } = useAuth();
//     const [auctionData, setAuctionData] = useState([]);
//     const [selectedAuction, setSelectedAuction] = useState(null);
//     const [showDialog, setShowDialog] = useState(false);

//     const items = [
//         { label: 'Auctions', icon: 'pi pi-briefcase', command: () => navigate('/home/auctions') },
//         { label: 'Bidding', icon: 'pi pi-dollar', command: () => navigate('/home') },
//         { label: 'About Us', icon: 'pi pi-info-circle' }
//     ];

//     const start = <Button label="Genix Auctions" onClick={() => navigate('/home')} />;
//     const end = (
//         <div className="p-mr-3">
//             <Button label="Logout" className="p-button-rounded p-button-danger" onClick={() => { logout(); navigate('/login'); }} />
//         </div>
//     );

//     useEffect(() => {
//         const fetchBidding = async () => {
//             try {
//                 const response = await getBidding();
//                 if (response) {
//                     setAuctionData(response);
//                 }
//             } catch (err) {
//                 console.error('An error occurred:', err);
//             }
//         };
//         fetchBidding();
//     }, []);

//     const handleBidNow = (auction) => {
//         setSelectedAuction(auction);
//         setShowDialog(true);
//     };

//     const hideDialog = () => {
//         setShowDialog(false);
//     };

//     return (
//         <div className="header">
//             <Menubar model={items} start={start} end={end} />
//             <div className="auction-grid">
//                 {auctionData.map((auction) => (
//                     <div key={auction._id} className="auction-card">
//                         <Card title={auction.title} className="auction-card">
//                             <p>Starting Bid: ${auction.startingBid}</p>
//                             <p>Current Bid: ${auction.currentBid}</p>
//                             <Button label="Bid Now" onClick={() => handleBidNow(auction)} />
//                         </Card>
//                     </div>
//                 ))}
//             </div>

//             {selectedAuction && (
//                 <Dialog header="Auction Details" visible={showDialog} style={{ width: '50vw' }} onHide={hideDialog}>
//                     <h2>{selectedAuction.title}</h2>
//                     <p>Description: {selectedAuction.description}</p>
//                     <p>Starting Bid: ${selectedAuction.startingBid}</p>
//                     <p>Current Bid: ${selectedAuction.currentBid}</p>
//                     <p>End Date: {new Date(selectedAuction.endDate).toLocaleString()}</p>
//                 </Dialog>
//             )}
//             <Outlet />
//         </div>
//     );
// }

// export default Header;


import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate, Outlet } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../Auth/Auth';
import { getBidding } from '../../actions/authService';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import AuctionForm from '../Auction/AuctionForm';

function Header() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [auctionData, setAuctionData] = useState([]);
    const [showAuctionForm, setShowAuctionForm] = useState(false); // New state for showing AuctionForm
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const items = [
        { label: 'Auctions', icon: 'pi pi-briefcase', command: () => setShowAuctionForm(true) }, // Show form when clicked
        { label: 'Bidding', icon: 'pi pi-dollar', command: () => navigate('/home') },
        { label: 'About Us', icon: 'pi pi-info-circle' }
    ];

    const start = <Button label="Genix Auctions" onClick={() => navigate('/home')} />;
    const end = (
        <div className="p-mr-3">
            <Button label="Logout" className="p-button-rounded p-button-danger" onClick={() => { logout(); navigate('/login'); }} />
        </div>
    );

    useEffect(() => {
        const fetchBidding = async () => {
            try {
                const response = await getBidding();
                if (response) {
                    setAuctionData(response);
                }
            } catch (err) {
                console.error('An error occurred:', err);
            }
        };
        fetchBidding();
    }, [showAuctionForm]);

    const handleBidNow = (auction) => {
        setSelectedAuction(auction);
        setShowDialog(true);
    };

    const hideDialog = () => {
        setShowDialog(false);
    };
alert(showAuctionForm)
    return (
        <div className="header">
            <Menubar model={items} start={start} end={end} />
            <div className="auction-grid">
                {auctionData.map((auction) => (
                    <div key={auction._id} className="auction-card">
                        <Card title={auction.title} className="auction-card">
                            <p>Starting Bid: ${auction.startingBid}</p>
                            <p>Current Bid: ${auction.currentBid}</p>
                            <Button label="Bid Now" onClick={() => handleBidNow(auction)} />
                        </Card>
                    </div>
                ))}
            </div>

            {selectedAuction && (
                <Dialog header="Auction Details" visible={showDialog} style={{ width: '50vw' }} onHide={hideDialog}>
                    <h2>{selectedAuction.title}</h2>
                    <p>Description: {selectedAuction.description}</p>
                    <p>Starting Bid: ${selectedAuction.startingBid}</p>
                    <p>Current Bid: ${selectedAuction.currentBid}</p>
                    <p>End Date: {new Date(selectedAuction.endDate).toLocaleString()}</p>
                </Dialog>
            )}

            {/* AuctionForm Dialog */}
            <Dialog header="Create Auction" visible={showAuctionForm} style={{ width: '50vw' }} onHide={() => setShowAuctionForm(false)}>
                <AuctionForm  closeForm={() => setShowAuctionForm(false)}/>
            </Dialog>

            <Outlet />
        </div>
    );
}

export default Header;
