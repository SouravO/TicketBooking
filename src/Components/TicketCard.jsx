import React, { useState, useEffect } from "react";
import bodyBg from "../assets/bodyBg.png";
import { useNavigate } from "react-router-dom";
import gitexCardLogo from "../assets/gitexCardLogo.png";
const cardsData = [
  {
    id: 1,
    title: "VISITOR 3 DAY ACCESS TICKET",
    color: "from-purple-700 via-purple-800 to-purple-900",
    header: "bg-purple-800",
    price: 32.5,
    currency: "USD",
    oldPrice: 43,
    vat: "Incl. 20% VAT",
    isExclusive: false,
    isBestSeller: false,
    isMain: true,
    features: [],
  },
  {
    id: 2,
    title: "VISITOR 3 DAY ACCESS TICKET",
    color: "from-orange-500 via-orange-600 to-red-600",
    header: "bg-orange-600",
    price: 0,
    currency: "USD",
    oldPrice: null,
    vat: "INCL. 19% VAT",
    isExclusive: false,
    isBestSeller: false,
    isMain: false,
    features: [
      { text: "Access to ConneXions & Investor Lounge", active: true },
      { text: "Network Events", active: true },
      { text: "All Conference Tracks", active: true },
      { text: "All Masterclasses", active: true },
      { text: "3 Days Access to the Show", active: true },
      { text: "Access to Dubai Internet City Lounge", active: true },
    ],
  },
  {
    id: 3,
    title: "VISITOR 3 DAY ACCESS TICKET",
    color: "from-green-600 via-green-700 to-green-900",
    header: "bg-green-700",
    price: 0,
    currency: "USD",
    oldPrice: null,
    vat: "INCL. 19% VAT",
    isExclusive: true,
    isBestSeller: false,
    isMain: false,
    features: [
      { text: "Access to ConneXions & Investor Lounge", active: true },
      { text: "Network Events", active: true },
      { text: "All Conference Tracks", active: true },
      { text: "All Masterclasses", active: true },
      { text: "3 Days Access to the Show", active: true },
      { text: "Access to Dubai Internet City Lounge", active: true },
    ],
  },
  {
    id: 4,
    title: "VISITOR 3 DAY ACCESS TICKET",
    color: "from-red-600 via-red-700 to-red-900",
    header: "bg-red-700",
    price: 0,
    currency: "USD",
    oldPrice: null,
    vat: "INCL. 19% VAT",
    isExclusive: false,
    isBestSeller: true,
    isMain: false,
    features: [
      { text: "Access to ConneXions & Investor Lounge", active: true },
      { text: "Network Events", active: true },
      { text: "All Conference Tracks", active: true },
      { text: "All Masterclasses", active: true },
      { text: "3 Days Access to the Show", active: true },
      { text: "Access to Dubai Internet City Lounge", active: true },
    ],
  },
  {
    id: 5,
    title: "VISITOR 3 DAY ACCESS TICKET",
    color: "from-green-500 via-green-600 to-green-700",
    header: "bg-green-600",
    price: 0,
    currency: "USD",
    oldPrice: null,
    vat: "INCL. 19% VAT",
    isExclusive: false,
    isBestSeller: false,
    isMain: false,
    features: [
      { text: "Access to ConneXions & Investor Lounge", active: true },
      { text: "Network Events", active: true },
      { text: "All Conference Tracks", active: true },
      { text: "All Masterclasses", active: true },
      { text: "3 Days Access to the Show", active: true },
      { text: "Access to Dubai Internet City Lounge", active: true },
    ],
  },
  {
    id: 6,
    title: "VISITOR 3 DAY ACCESS TICKET",
    color: "from-blue-600 via-blue-700 to-blue-900",
    header: "bg-blue-700",
    price: 0,
    currency: "USD",
    oldPrice: null,
    vat: "INCL. 19% VAT",
    isExclusive: false,
    isBestSeller: false,
    isMain: false,
    features: [
      { text: "Access to ConneXions & Investor Lounge", active: true },
      { text: "Network Events", active: true },
      { text: "All Conference Tracks", active: true },
      { text: "All Masterclasses", active: true },
      { text: "3 Days Access to the Show", active: true },
      { text: "Access to Dubai Internet City Lounge", active: true },
    ],
  },
];

const TicketCard = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(
    cardsData.reduce((acc, card) => {
      acc[card.id] = 0;
      return acc;
    }, {})
  );
  const [showCounter, setShowCounter] = useState(
    cardsData.reduce((acc, card) => {
      acc[card.id] = false;
      return acc;
    }, {})
  );

  const handleBuyNow = (id) => {
    setShowCounter((prev) => ({ ...prev, [id]: true }));
    setQuantities((prev) => ({ ...prev, [id]: 1 }));
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id) => {
    if (quantities[id] === 1) {
      setShowCounter((prev) => ({ ...prev, [id]: false }));
      setQuantities((prev) => ({ ...prev, [id]: 0 }));
    } else {
      setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
    }
  };

  // Save selected tickets and their quantities to localStorage whenever quantities change
  useEffect(() => {
    const selected = cardsData
      .filter((card) => quantities[card.id] > 0)
      .map((card) => ({ ...card, quantity: quantities[card.id] }));
    localStorage.setItem("selectedTickets", JSON.stringify(selected));
  }, [quantities]);

  // Notch: small, circular, subtle, matches screenshot
  const Notch = ({ side }) => (
    <div
      className={`absolute top-1/2 ${
        side === "left" ? "-left-4" : "-right-4"
      } transform -translate-y-1/2 w-10 h-10 bg-white rounded-full border border-gray-200 z-10`}
      style={{ boxShadow: "none" }}
    ></div>
  );

  // Badge
  const Badge = ({ label, color }) => (
    <div
      className={`absolute top-1 -left-9 px-8 py-4 text-xs font-bold transform -rotate-45 z-20 shadow ${color} text-white`}
    >
      {label}
    </div>
  );

  // Main Card (first card)
  const MainCard = (card) => (
    <div
      className={`relative w-full max-w-s bg-gradient-to-br ${card.color} rounded-2xl shadow-2xl overflow-hidden `}
    >
      <Notch side="left" />
      <Notch side="right" />
      <div
        className={`flex-col justify-between items-center ${card.header} rounded-t-2xl px-6 py-3`}
      >
        <h3 className="text-white text-base font-bold leading-tight">
          {card.title}
        </h3>
        <button className="text-yellow-400 text-sm font-medium">
          VIEW DETAILS →
        </button>
      </div>
      <div
        className="px-6 py-4 gap-12  bg-black/60 backdrop-blur-md flex flex-col  min-h-[220px] h-full"
        style={{ backgroundImage: `url(${bodyBg})`, backgroundSize: "cover" }}
      >
        <p className="text-white text-sm mt-10 leading-relaxed">
          Visitor Passes provide{" "}
          <span className="text-green-400 font-bold">3 DAYS ACCESS</span> to
          GITEX NIGERIA exhibition and all free conference
        </p>
        <div className="flex items-center justify-start px-2 mb-8">
          <div className="">
            {/* img display  */}
            <img
              src={gitexCardLogo}
              alt="Gitex Card Logo"
              className="w-auto h-16 mb-2"
            />
          </div>
        </div>
        <div className="flex items-end justify-between border-t border-gray-10 mt-20 h-15">
          <div className="flex items-baseline gap-1 ">
            <span className="text-red-400 text-lg font-bold">
              {card.currency}
            </span>
            <span className="text-red-400 text-lg line-through">
              {card.oldPrice}
            </span>
            <span className="text-white text-2xl font-bold">{card.price}</span>
            <span className="text-gray-400 text-xs ml-1">{card.vat}</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-900 rounded px-2 py-1">
            {showCounter[card.id] ? (
              <>
                <button
                  className="w-7 h-7 flex items-center justify-center text-white text-lg font-bold bg-gray-700 hover:bg-gray-600 rounded"
                  onClick={() => handleDecrement(card.id)}
                  aria-label="Decrease"
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 text-center bg-transparent text-white font-bold outline-none"
                  value={quantities[card.id]}
                  min={0}
                  onChange={(e) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [card.id]: Math.max(0, Number(e.target.value)),
                    }))
                  }
                />
                <button
                  className="w-7 h-7 flex items-center justify-center text-white text-lg font-bold bg-gray-700 hover:bg-gray-600 rounded"
                  onClick={() => handleIncrement(card.id)}
                  aria-label="Increase"
                >
                  +
                </button>
              </>
            ) : (
              <button
                className="bg-white text-gray-900 px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors"
                onClick={() => handleBuyNow(card.id)}
              >
                <span className="font-bold">Buy Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>  
  );

  // Standard Card
  const StandardCard = (card) => (
    <div
      className={`relative w-full max-w-s bg-gradient-to-br ${card.color} rounded-2xl  shadow-2xl overflow-hidden`}
    >
      {card.isExclusive && <Badge label="EXCLUSIVE" color="bg-green-600" />}
      {card.isBestSeller && <Badge label="BEST SELLER" color="bg-red-600" />}
      <Notch side="left" />
      <Notch side="right" />
      <div
        className={`flex-col justify-center items-center ${card.header} rounded-t-2xl px-16 py-3`}
      >
        <h3 className="text-white text-base font-bold leading-tight">
          {card.title}
        </h3>
        <button className="text-yellow-400 text-sm font-medium">
          VIEW DETAILS →
        </button>
      </div>
      <div
        className="px-6 py-4 bg-black/60 backdrop-blur-md flex flex-col min-h-[420px]"
        style={{ backgroundImage: `url(${bodyBg})`, backgroundSize: "cover" }}
      >
        <p className="text-white text-sm mb-6 leading-relaxed">
          Visitor Passes provide{" "}
          <span className="text-green-400 font-bold">3 DAYS ACCESS</span> to
          GITEX NIGERIA exhibition and all free conference
        </p>
        <div className="space-y-3 mb-8 ">
          {card.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 inset-0 bg-white/5 backdrop-blur-none px-2 rounded-2xl py-2">
              <span className="w-5 h-5 flex items-center justify-center bg-green-500 rounded-full">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="text-white text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto border-t border-gray-700 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-white text-2xl font-bold">
              {card.price === 0 ? "FREE" : `${card.currency} ${card.price}`}
            </span>
            <span className="text-gray-400 text-sm">{card.vat}</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-900 rounded px-2 py-1">
            {showCounter[card.id] ? (
              <>
                <button
                  className="w-7 h-7 flex items-center justify-center text-white text-lg font-bold bg-gray-700 hover:bg-gray-600 rounded"
                  onClick={() => handleDecrement(card.id)}
                  aria-label="Decrease"
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 text-center bg-transparent text-white font-bold outline-none"
                  value={quantities[card.id]}
                  min={0}
                  onChange={(e) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [card.id]: Math.max(0, Number(e.target.value)),
                    }))
                  }
                />
                <button
                  className="w-7 h-7 flex items-center justify-center text-white text-lg font-bold bg-gray-700 hover:bg-gray-600 rounded"
                  onClick={() => handleIncrement(card.id)}
                  aria-label="Increase"
                >
                  +
                </button>
              </>
            ) : (
              <button
                className="bg-white text-gray-900 px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors"
                onClick={() => handleBuyNow(card.id)}
              >
                <span className="font-bold">Buy Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Calculate total selected tickets and total amount
  const totalCount = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalAmount = cardsData.reduce(
    (sum, card) => sum + quantities[card.id] * (card.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br  p-6 flex flex-col items-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {cardsData.map((card) =>
            card.isMain ? (
              <MainCard key={card.id} {...card} />
            ) : (
              <StandardCard key={card.id} {...card} />
            )
          )}
        </div>
      </div>
      {/* Footer Checkout Bar */}
      {totalCount > 0 && (
        <div
          className="fixed bottom-0 left-0 w-full z-50"
          style={{
            background: "linear-gradient(90deg, #6AC045 0%, #0B3B1B 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-end py-3 px-6 relative">
            {/* Decorative squares */}
            <div className="absolute left-0 top-0 flex gap-1">
              <div className="w-4 h-2 bg-lime-300"></div>
              <div className="w-4 h-2 bg-lime-500"></div>
              <div className="w-4 h-2 bg-lime-700"></div>
            </div>
            <div className="flex flex-col items-end mr-4">
              <div className="text-white text-sm flex items-center gap-4">
                <span>
                  Total:{" "}
                  <span className="font-bold text-white text-lg">
                    EUR {totalAmount}
                  </span>
                  <span className="text-white text-xs font-normal ml-1">
                    Incl. 19% VAT
                  </span>
                </span>
                <span className="bg-white/20 text-white text-xs rounded px-3 py-1 font-semibold">
                  {totalCount} Ticket{totalCount > 1 ? "s" : ""} Selected
                </span>
              </div>
              <div className="text-white text-xs opacity-80">
                View Ticket summary
              </div>
            </div>
            <button
              className="bg-white text-green-900 font-bold rounded px-6 py-2 ml-2 shadow hover:bg-gray-100 transition-colors"
              onClick={() => navigate("/register")}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketCard;
