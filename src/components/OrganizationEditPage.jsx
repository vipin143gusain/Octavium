import React, { useState } from "react";

export default function OrganizationEditPage() {
  const [mode, setMode] = useState("edit");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-4 text-gray-400">Organization edit page</div>

      <div className="bg-white shadow border">
        {/* Top Bar */}
        <div className="flex items-center gap-3 p-4 border-b">
          <button className="text-2xl">☰</button>
          <img
            src="/logo.png"
            alt="logo"
            className="h-10 w-auto"
          />
        </div>

        <div className="grid grid-cols-12 gap-4 p-4">
          {/* LEFT SIDEBAR */}
          <div className="col-span-3 space-y-4">
            {/* Organization Logo */}
            <div className="border bg-gray-50">
              <div className="p-2 font-semibold border-b">Organization Logo</div>
              <div className="p-3">
                <img
                  src="/logo.png"
                  alt="org"
                  className="w-full mb-3"
                />
                <div className="flex">
                  <input className="border flex-1 px-2 py-1" placeholder="Select file..." />
                  <button className="bg-green-600 text-white px-4">Browse</button>
                </div>
              </div>
            </div>

            {/* Favicon */}
            <div className="border bg-gray-50">
              <div className="p-2 font-semibold border-b">Favicon</div>
              <div className="p-3">
                <img src="/logo.png" alt="fav" className="w-full mb-3" />
                <div className="flex">
                  <input className="border flex-1 px-2 py-1" placeholder="Select file..." />
                  <button className="bg-green-600 text-white px-4">Browse</button>
                </div>
              </div>
            </div>

            {/* Color Theme */}
            <div className="border bg-gray-50">
              <div className="p-2 font-semibold border-b">Set Color Theme</div>
              <div className="p-3 grid grid-cols-3 gap-2">
                {["#53B700", "#FF3F01", "#0E97F2", "#B715DE", "#1854E3", "#A0880B", "#6A0B31", "#FB8200", "#1E92A4"].map(
                  (c) => (
                    <div key={c} className="h-8 rounded" style={{ background: c }} />
                  )
                )}
              </div>
            </div>

            {/* Google Drive */}
            <div className="border bg-gray-50 p-3">
              <div className="font-semibold mb-2">Google Drive Integration</div>
              <button className="w-full bg-blue-600 text-white py-2 rounded">Sign in with Google</button>
              <div className="text-xs text-gray-500 mt-2">Status: Disconnected</div>
            </div>

            {/* WhatsApp API */}
            <div className="border bg-gray-50 p-3">
              <div className="font-semibold mb-2">Whatsapp Business API</div>
              <table className="w-full text-xs border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-1">Business</th>
                    <th className="border px-1">Mobile</th>
                    <th className="border px-1">Status</th>
                    <th className="border px-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-center p-2">No records found</td>
                  </tr>
                </tbody>
              </table>
              <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded">Login with Facebook</button>
            </div>

            {/* Storage */}
            <div className="border bg-gray-50 p-3 text-center">
              <div className="font-semibold">Total</div>
              <div className="text-sm">1024 MB</div>
              <div className="my-3 h-24 w-24 mx-auto rounded-full border-8 border-blue-600 flex items-center justify-center">20%</div>
              <div className="text-xs text-gray-500">0 MB used | 1024 MB remaining</div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-9">
            {/* Tabs */}
            <div className="flex mb-4">
              {["view", "edit", "delete"].map((t) => (
                <button
                  key={t}
                  onClick={() => setMode(t)}
                  className={`px-6 py-2 border ${mode === t ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Organization Details */}
            <div className="border mb-4">
              <div className="bg-gray-200 px-4 py-2 font-semibold">Organization Details</div>
              <div className="p-4 space-y-3">
                <Input label="Organization Name*" value="Octavium Music Academy" />
                <Select label="Institute Type*" value="Computer/Dance/Music Training Institute" />
                <Input label="Office Address*" value="No. 227, 3rd Floor, Leela Square" />
                <Input label="Whatsapp Mobile Number" value="9448088573" />
                <Input label="Office Landline Number" value="08041210720" />
                <Input label="Office Email Id" value="erp@octavium.in" />
              </div>
            </div>

            {/* Organization Settings */}
            <div className="border mb-4">
              <div className="bg-gray-200 px-4 py-2 font-semibold">Organization Setting</div>
              <div className="p-4 space-y-3">
                <Select label="Select Branding Type" value="Sub Domain" />
                <div>
                  <label className="block text-sm mb-1">Sub Domain</label>
                  <div className="flex">
                    <span className="px-3 py-2 bg-green-600 text-white">https://</span>
                    <input className="border flex-1 px-3 py-2" placeholder="your-company" />
                    <span className="px-3 py-2 bg-blue-600 text-white">.zenoxerp.com</span>
                  </div>
                </div>
                <Input label="Inactive Session Lock Timing (In Minutes)" value="60" />
                <Input label="Enable Reporting (Through WhatsApp)" value="9919919999" />
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded">Save Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input className="border w-full px-3 py-2" defaultValue={value} />
    </div>
  );
}

function Select({ label, value }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <select className="border w-full px-3 py-2">
        <option>{value}</option>
      </select>
    </div>
  );
}