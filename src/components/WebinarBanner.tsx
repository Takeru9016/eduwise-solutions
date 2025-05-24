import { useState } from "react";
import { X } from "lucide-react";

export default function WebinarBanner() {
  // Webinar Registration Modal State
  const [isWebinarModalOpen, setIsWebinarModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    number: "",
    email: "",
    isGraduate: "yes",
    gradYear: "",
  });
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Replace with your Google Apps Script endpoint
  const GOOGLE_SHEET_ENDPOINT =
    "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    try {
      const res = await fetch(GOOGLE_SHEET_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormStatus("success");
        setForm({
          name: "",
          dob: "",
          number: "",
          email: "",
          isGraduate: "yes",
          gradYear: "",
        });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="relative bg-gradient-to-r from-primary-75 to-primary-95 text-white py-10 px-4 md:px-0">
      <div className="container mx-auto flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">
          Why 90% of Graduates Struggle — and How You Can Be the 10%
        </h2>
        <p className="text-lg md:text-2xl font-semibold text-yellow-300 mb-2">
          "Skill Up. Stand Out. Get Hired."
        </p>
        <div className="bg-white bg-opacity-10 rounded-lg px-6 py-2 inline-block text-lg font-medium mb-4">
          Sunday : 7:30pm - 8:30pm
        </div>
        <button
          className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-primary-95 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg"
          onClick={() => setIsWebinarModalOpen(true)}
        >
          Register Now
        </button>
      </div>
      {/* Webinar Registration Modal */}
      {isWebinarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => {
                setIsWebinarModalOpen(false);
                setFormStatus(null);
              }}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-primary-75 mb-2 text-center">
              Webinar Registration
            </h3>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Kindly fill the details, our expert will share you the webinar
              G-meet link
            </p>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-75"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleFormChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-75"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Number</label>
                <input
                  type="tel"
                  name="number"
                  value={form.number}
                  onChange={handleFormChange}
                  required
                  pattern="[0-9]{10,15}"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-75"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mail ID
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-75"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Are you Graduate?
                </label>
                <select
                  name="isGraduate"
                  value={form.isGraduate}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-75"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Graduation year
                </label>
                <input
                  type="number"
                  name="gradYear"
                  value={form.gradYear}
                  onChange={handleFormChange}
                  min="1950"
                  max="2100"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-75"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-75 text-white font-bold py-2 rounded-lg hover:bg-primary-80 transition-colors disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              {formStatus === "success" && (
                <div className="text-green-600 text-center mt-2">
                  Thank you! Our expert will share the G-meet link soon.
                </div>
              )}
              {formStatus === "error" && (
                <div className="text-red-600 text-center mt-2">
                  Submission failed. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
