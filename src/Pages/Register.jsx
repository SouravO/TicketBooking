import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import regBg from "../assets/bgReg.png";
import cardTop from "../assets/cardtop.png";
import badgeLogo from "../assets/badgeLogo.png";
const initialForm = {
  firstName: "",
  lastName: "",
  country: "",
  region: "",
  email: "",
  confirmEmail: "",
  nationality: "",
  mobile: "",
  company: "",
  job: "",
  companyType: "",
  industry: "",
  interests: [],
};

const workshops = [
  "Global Leaders Forum NEW (3 Days)",
  "GITEX Main Stage",
  "Artificial Intelligence & Robotics (1)",
  "Future Health NEW (2 Days)",
  "Cybersecurity (4 Days)",
  "Future Health NEW (2 Days)",
  "Digital Cities (1 Day)",
  "Edtech (1 Day)",
  "Energy Transition (1 Day)",
  "Intelligent Connectivity (1 Day)",
  "Digital Finance (1 Day)",
  "Future Mobility (1 Day)",
];

const Register = () => {
  // 1. Load selected tickets from localStorage
  const [selectedTickets, setSelectedTickets] = useState([]); // [{id, title, quantity, ...}]
  const [currentTicketIdx, setCurrentTicketIdx] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  const [allForms, setAllForms] = useState([]); // store all forms for all tickets
  const navigate = useNavigate();

  useEffect(() => {
    // Example: localStorage.setItem('selectedTickets', JSON.stringify([{id:1, title:'...', quantity:2}, ...]))
    const tickets = JSON.parse(localStorage.getItem("selectedTickets") || "[]");
    // Expand tickets by quantity, so each ticket gets a separate form
    let expanded = [];
    tickets.forEach((ticket) => {
      for (let i = 0; i < (ticket.quantity || 1); i++) {
        expanded.push(ticket);
      }
    });
    setSelectedTickets(expanded);
    setAllForms(Array(expanded.length).fill(null));
  }, []);

  useEffect(() => {
    // Reset form and workshops when moving to a new ticket
    setForm(initialForm);
    setSelectedWorkshops([]);
  }, [currentTicketIdx]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkshopChange = (e) => {
    const { value, checked } = e.target;
    setSelectedWorkshops((prev) => {
      if (checked) {
        if (prev.length < 6) return [...prev, value];
        return prev;
      } else {
        return prev.filter((w) => w !== value);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save this form's data
    const updatedForms = [...allForms];
    updatedForms[currentTicketIdx] = {
      ...form,
      workshops: selectedWorkshops,
      ticket: selectedTickets[currentTicketIdx],
    };
    setAllForms(updatedForms);
    // Save to localStorage
    localStorage.setItem("ticketRegistrations", JSON.stringify(updatedForms));
    // Go to next ticket or finish
    if (currentTicketIdx < selectedTickets.length - 1) {
      setCurrentTicketIdx(currentTicketIdx + 1);
    } else {
      navigate("/summary");
    }
  };

  // Progress bar steps
  const totalSteps = selectedTickets.length || 1;
  const currentStep = currentTicketIdx + 1;

  // Ticket title for current form
  const currentTicket = selectedTickets[currentTicketIdx] || {
    title: "Ticket",
  };

  return (
    <>
      <div className="mt-10">
        {/* Dynamic Progress Bar */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    idx < currentStep
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {idx + 1}
                </div>
                {idx < totalSteps - 1 && (
                  <div
                    className={`w-16 h-1 ${
                      idx < currentStep - 1 ? "bg-green-400" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-2 md:px-0"
          style={{ backgroundImage: `url(${regBg})` }}
        >
          <div className="w-full max-w-6xl bg-white/90 rounded-2xl shadow-lg border-2 border-green-200 p-0 md:p-6 flex flex-col md:flex-row gap-0 md:gap-6">
            {/* Left: Form */}
            <form className="flex-1 p-6" onSubmit={handleSubmit}>
              <div className="bg-green-700 text-white rounded-t-lg px-6 py-3 flex items-center justify-between space-x-3">
                <span className="font-bold text-lg">
                  Registration for information 1
                </span>
                <span className="bg-transparent border-1   px-4 py-1 rounded font-semibold text-xs text-white">
                  PREMIUM TICKET - FREEIncl. 19% VAT
                </span>
              </div>
              <div className="bg-white rounded-b-lg px-6 py-6 border border-t-0 border-green-200 text-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Country of residence{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    >
                      <option value="">Please Select</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Region
                    </label>
                    <input
                      name="region"
                      value={form.region}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Confirm Email address
                    </label>
                    <input
                      type="email"
                      name="confirmEmail"
                      value={form.confirmEmail}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Nationality
                    </label>
                    <select
                      name="nationality"
                      value={form.nationality}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="">Please Select</option>
                      <option value="Nigerian">Nigerian</option>
                      <option value="Ghanaian">Ghanaian</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Mobile number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 bg-gray-100 border border-r-0 rounded-l">
                        🇳🇬 +234
                      </span>
                      <input
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        className="w-full border rounded-r px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Company name
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Job title
                    </label>
                    <input
                      name="job"
                      value={form.job}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Company type
                    </label>
                    <select
                      name="companyType"
                      value={form.companyType}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="">Please Select</option>
                      <option value="Private">Private</option>
                      <option value="Public">Public</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="">Please Select</option>
                      <option value="Tech">Tech</option>
                      <option value="Finance">Finance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-1">
                    What products & services are you interested in?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    className="bg-red-900 text-white px-4 py-1 rounded font-bold text-xs mb-2 ml-2"
                  >
                    SELECT SOLUTIONS/PRODUCTS
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {workshops.map((w, i) => (
                      <label
                        key={w + "-" + i}
                        className="flex items-center gap-2 text-xs"
                      >
                        <input
                          type="checkbox"
                          value={w}
                          checked={selectedWorkshops.includes(w)}
                          onChange={handleWorkshopChange}
                          disabled={
                            !selectedWorkshops.includes(w) &&
                            selectedWorkshops.length >= 6
                          }
                        />
                        {w}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-700 text-white px-8 py-2 rounded font-bold hover:bg-green-800 transition-colors"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </form>
            {/* Right: Badge Preview */}
            <div className="w-full md:w-80 flex flex-col items-center p-6">
              {/* image badge */}
              <div
                className=""
                style={{
                  backgroundImage: `url(${cardTop})`,
                  backgroundSize: "200%",
                  backgroundRepeat: "no-repeat",
                  width: "auto",
                  borderRadius: "8px",
                }}
              >
                {/* display image badgeLogo */}
                <img
                  src={badgeLogo}
                  alt="Badge Logo"
                  className="w-auto h-auto mx-auto mt-4"
                />
                <div className="bg-white rounded-b-lg w-full p-4 flex flex-col gap-2 border border-t-0 border-green-200">
                  <div className="bg-green-700 text-white text-xs px-3 py-1 rounded font-bold w-max mb-2">
                    Registration Information {currentStep}
                  </div>
                  <div className="text-gray-700 font-bold text-xs">
                    {form.firstName || form.lastName
                      ? `${form.firstName} ${form.lastName}`.trim()
                      : "FULL NAME"}
                  </div>
                  <div className="text-gray-700 font-bold text-xs">
                    {form.job || "JOB TITLE"}
                  </div>
                  <div className="text-gray-700 font-bold text-xs">
                    {form.company || "COMPANY NAME"}
                  </div>
                  <div className="text-gray-700 font-bold text-xs mb-2">
                    {form.country || "COUNTRY OF RESIDENCE"}
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="text-center text-gray-700 text-xs font-semibold tracking-widest">
                    BADGE CATEGORY
                  </div>
                  <div className="text-center text-2xl font-extrabold tracking-widest text-black">
                    VISITOR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
