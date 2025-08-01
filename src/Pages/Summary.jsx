import React, { useState, useEffect } from "react";
import bgReg from "../assets/bgReg.png";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const [registrations, setRegistrations] = useState([]);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMsg, setPromoMsg] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const navigate = useNavigate();
  const [showTermsWarning, setShowTermsWarning] = useState(false);
  useEffect(() => {
    const regs = JSON.parse(
      localStorage.getItem("ticketRegistrations") || "[]"
    );
    setRegistrations(regs);
  }, []);

  // Ticket summary
  const ticketSummary = registrations.reduce((acc, reg) => {
    if (!reg || !reg.ticket) return acc;
    const key = reg.ticket.title;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Ticket prices (simulate)
  const ticketPrices = registrations.map((reg) => reg?.ticket?.price || 0);
  const total = ticketPrices.reduce((a, b) => a + b, 0);
  const vat = 0.19;
  const totalInclVat = (total * (1 + vat)).toFixed(2);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === "GITEX15") {
      setPromoApplied(true);
      setPromoMsg(
        'Promo code "GITEX15" applied successfully! Applied to 2 lowest-priced tickets!'
      );
    } else {
      setPromoApplied(false);
      setPromoMsg("Invalid promo code.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgReg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="max-w-full px-10 mx-auto bg-white/90 rounded-2xl shadow-lg border-2 border-green-200 p-0">
        {/* Progress Bar */}
        <div className="flex items-center justify-center pt-8 pb-2">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step, idx) => (
              <React.Fragment key={step}>
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#22C55E" />
                    <path
                      d="M6 10.5L9 13.5L14 8.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {idx < 3 && <div className="w-16 h-1 bg-green-400"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="border-2 border-green-700 rounded-t-lg bg-green-700 px-6 py-3 font-bold text-lg text-white">
          Registration Summary
        </div>
        <div className="border border-green-200 border-t-0 rounded-b-lg px-6 py-4 bg-white">
          {/* Ticket summary */}
          {Object.keys(ticketSummary).map((title, idx) => (
            <div
              key={title}
              className="flex justify-between items-center border-b border-dotted border-green-200 py-2 last:border-b-0"
            >
              <span className="font-semibold text-green-900">
                {title.toUpperCase()} x {ticketSummary[title]}
              </span>
              <span className="text-xs text-gray-700 font-bold">EUR 40.19</span>
            </div>
          ))}
          {/* Example for student ticket row */}
          <div className="flex justify-between items-center border-b border-dotted border-green-200 py-2 last:border-b-0">
            <span className="font-semibold text-green-900">
              Student Ticket Access On Day 3 Only
            </span>
            <span className="text-xs text-gray-700 font-bold">
              EUR 50 40 SUBJECT TO APPROVAL Incl. 19% VAT
            </span>
          </div>
        </div>
        {/* Promo code section */}
        <form
          className="border border-green-200 rounded px-6 py-4 bg-green-50 mb-4 mt-4 text-black"
          onSubmit={handleApplyPromo}
        >
          <div className="font-semibold mb-2 ">Have a promo code?</div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 border border-green-200 rounded px-3 py-2 bg-white text-gray-700"
              placeholder="Enter Promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              disabled={promoApplied}
            />
            <button
              className="bg-black text-white px-4 py-1 rounded font-bold text-xs"
              type="submit"
              disabled={promoApplied}
            >
              APPLY
            </button>
          </div>
          {promoMsg && (
            <div
              className={`text-xs mb-2 ${
                promoApplied
                  ? "text-green-700 bg-green-100 p-2 rounded"
                  : "text-red-700"
              }`}
            >
              {promoMsg}
            </div>
          )}
        </form>
        {/* Total section */}
        <div className="flex justify-end items-center border-b border-dotted border-green-200 py-2 mb-2">
          <span className="font-bold text-lg">
            Total: EUR 300{" "}
            <span className="text-xs font-normal">Incl. 19% VAT</span>
          </span>
        </div>
        {/* Terms checkboxes */}
        <div className="mt-4 border border-green-200 rounded px-4 py-3 bg-white">
          <div className="flex items-start gap-2 mb-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                if (e.target.checked) setShowTermsWarning(false);
              }}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-xs text-gray-700">
              I have read and accept the{" "}
              <a href="#" className="text-green-700 underline">
                terms and conditions
              </a>
              ,{" "}
              <a href="#" className="text-green-700 underline">
                Privacy Policy
              </a>
              , and consent that attendees under the age of 21 will not be
              admitted, and admission to the exhibition is restricted to trade
              and business professionals only, and students above 16 and below
              18 can attend only if accompanied by school or faculty member *
            </label>
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="marketing"
              checked={acceptMarketing}
              onChange={(e) => setAcceptMarketing(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="marketing" className="text-xs text-gray-700">
              I hereby consent the use of my data by the organiser, exhibitors
              and sponsors of DWTC & KAOUN international to delivering services
              and for marketing purposes. I am aware that I can object to the
              sending of newsletters at any time.
            </label>
          </div>
        </div>
        {/* Navigation buttons */}
        <div className="flex justify-center gap-1 mt-6 pb-4">
          <button className="bg-purple-900 text-white px-6 py-2 rounded font-bold">
            PREVIOUS
          </button>
          <button
            className="bg-green-700 text-white px-6 py-2 rounded font-bold"
            disabled={!acceptTerms}
            onClick={() => {
              if (!acceptTerms) {
                setShowTermsWarning(true);
              } else {
                setShowTermsWarning(false);
                navigate("/success");
              }
            }}
          >
            NEXT
          </button>
        </div>
        {showTermsWarning && !acceptTerms && (
          <div className="text-center text-red-600 text-xs font-semibold pb-4">
            Please accept the terms and conditions to proceed.
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
